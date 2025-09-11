import { makeAutoObservable, runInAction } from 'mobx';
import { Character, CharacterFilters, PaginationInfo } from '../models';
import { CharacterService } from '../services/CharacterService';
import { FavoritesService } from '../services/FavoritesService';

export class CharacterStore {
  characters: Character[] = [];
  favorites: Character[] = [];
  loading = false;
  error: string | null = null;
  filters: CharacterFilters = {
    searchTerm: '',
    selectedStatus: '',
    selectedSpecies: '',
    showOnlyFavorites: false,
  };
  pagination: PaginationInfo = {
    currentPage: 1,
    pageSize: 21,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  private characterService: CharacterService;
  private favoritesService: FavoritesService;

  constructor() {
    makeAutoObservable(this);
    this.characterService = new CharacterService();
    this.favoritesService = new FavoritesService();
    
    // Solo cargar favoritos en el cliente
    if (typeof window !== 'undefined') {
      this.loadFavoritesFromStorage();
    }
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setSearchTerm(term: string) {
    this.filters.searchTerm = term;
  }

  setSelectedStatus(status: string) {
    this.filters.selectedStatus = status;
  }

  setSelectedSpecies(species: string) {
    this.filters.selectedSpecies = species;
  }

  setShowOnlyFavorites(show: boolean) {
    this.filters.showOnlyFavorites = show;
  }

  clearFilters() {
    this.filters = {
      searchTerm: '',
      selectedStatus: '',
      selectedSpecies: '',
      showOnlyFavorites: false,
    };
  }

  async loadCharacters(page: number = 1, pageSize: number = 21): Promise<void> {
    console.log('🔄 [CharacterStore] loadCharacters called with page:', page, 'pageSize:', pageSize);
    this.setLoading(true);
    this.setError(null);

    try {
      console.log('📡 [CharacterStore] Calling service with pagination...');
      const response = await this.characterService.getCharactersWithPagination(page, pageSize);
      console.log('📡 [CharacterStore] Service response:', response);
      
      runInAction(() => {
        if (Array.isArray(response.data)) {
          console.log('✅ [CharacterStore] Setting characters and pagination:', {
            charactersCount: response.data.length,
            pagination: response.pagination
          });
          this.characters = response.data;
          this.pagination = response.pagination;
          this.loading = false;
        } else {
          console.warn('❌ [CharacterStore] Characters service returned non-array:', response.data);
          this.characters = [];
          this.pagination = {
            currentPage: page,
            pageSize: pageSize,
            totalItems: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          };
          this.loading = false;
        }
      });
      
      // Cargar favoritos del backend después de cargar personajes
      await this.loadFavorites();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar personajes';
      console.error('❌ [CharacterStore] Error loading characters:', error);
      
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
        this.characters = [];
        this.pagination = {
          currentPage: page,
          pageSize: pageSize,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        };
      });
    }
  }

  async loadFavorites(): Promise<void> {
    try {
      const favorites = await this.favoritesService.getUserFavorites();
      runInAction(() => {
        this.favorites = favorites;
      });
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  }

  async searchCharacters(searchTerm: string): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      const characters = await this.characterService.searchCharacters(searchTerm);
      
      runInAction(() => {
        if (Array.isArray(characters)) {
          this.characters = characters;
          this.loading = false;
        } else {
          console.warn('Search service returned non-array:', characters);
          this.characters = [];
          this.loading = false;
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al buscar personajes';
      console.error('Error searching characters:', error);
      
      runInAction(() => {
        this.error = errorMessage;
        this.loading = false;
        this.characters = [];
      });
    }
  }

  // Método para cambiar de página
  async changePage(page: number): Promise<void> {
    console.log('🔄 [CharacterStore] changePage called with page:', page);
    console.log('🔄 [CharacterStore] Current pagination:', this.pagination);
    
    if (page < 1 || page > this.pagination.totalPages) {
      console.warn('❌ [CharacterStore] Invalid page number:', page);
      return;
    }
    
    console.log('✅ [CharacterStore] Loading page:', page, 'with pageSize:', this.pagination.pageSize);
    await this.loadCharacters(page, this.pagination.pageSize);
  }

  toggleFavorite(character: Character) {
    console.log('🔄 [CharacterStore] Toggle favorite:', character.name);
    const isFavorite = this.favorites.some(fav => fav.id === character.id);
    
    if (isFavorite) {
      runInAction(() => {
        this.favorites = this.favorites.filter(fav => fav.id !== character.id);
      });
    } else {
      runInAction(() => {
        this.favorites.push(character);
      });
    }
    
    this.saveFavoritesToStorage();
  }

  isFavorite(characterId: number): boolean {
    return this.favorites.some(fav => fav.id === characterId);
  }

  private loadFavoritesFromStorage() {
    try {
      const stored = localStorage.getItem('rickAndMortyFavorites');
      if (stored) {
        const favorites = JSON.parse(stored);
        runInAction(() => {
          this.favorites = favorites;
        });
      }
    } catch (error) {
      // Error silencioso al cargar favoritos
    }
  }

  private saveFavoritesToStorage() {
    try {
      localStorage.setItem('rickAndMortyFavorites', JSON.stringify(this.favorites));
    } catch (error) {
      // Error silencioso al guardar favoritos
    }
  }

  // Computed properties
  get filteredCharacters() {
    // Verificar que characters sea un array antes de hacer spread
    if (!Array.isArray(this.characters)) {
      console.warn('Characters is not an array:', this.characters);
      return [];
    }

    let filtered = [...this.characters];

    // Filtrar por término de búsqueda
    if (this.filters.searchTerm) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(this.filters.searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (this.filters.selectedStatus) {
      filtered = filtered.filter(character => character.status === this.filters.selectedStatus);
    }

    // Filtrar por especie
    if (this.filters.selectedSpecies) {
      filtered = filtered.filter(character => character.species === this.filters.selectedSpecies);
    }

    // Filtrar solo favoritos
    if (this.filters.showOnlyFavorites) {
      filtered = filtered.filter(character => 
        this.favorites.some(fav => fav.id === character.id)
      );
    }

    return filtered;
  }

  get uniqueStatuses() {
    return ['all', ...Array.from(new Set(this.characters.map(c => c.status)))];
  }

  get uniqueSpecies() {
    return ['all', ...Array.from(new Set(this.characters.map(c => c.species)))];
  }

  get favoritesCount() {
    return this.favorites.length;
  }

  get charactersCount() {
    if (this.filters.showOnlyFavorites) {
      return this.filteredCharacters.length;
    }
    return this.characters.length;
  }
} 