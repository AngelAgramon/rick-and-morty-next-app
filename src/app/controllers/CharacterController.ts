// controllers/CharacterController.ts
import { Character, CharacterState, CharacterFilters, PaginationInfo } from '../models';
import { CharacterService } from '../services/CharacterService';
import { FavoritesService } from '../services/FavoritesService';

export class CharacterController {
  private characterService: CharacterService;
  private favoritesService: FavoritesService;
  private state: CharacterState;

  constructor() {
    this.characterService = new CharacterService();
    this.favoritesService = new FavoritesService();
    this.state = {
      characters: [],
      favorites: [],
      loading: false,
      error: null,
      filters: {
        searchTerm: '',
        selectedStatus: '',
        selectedSpecies: '',
        showOnlyFavorites: false,
      },
      pagination: {
        currentPage: 1,
        pageSize: 21,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  // Getters
  get characters(): Character[] {
    return this.state.characters;
  }

  get favorites(): Character[] {
    return this.state.favorites;
  }

  get loading(): boolean {
    return this.state.loading;
  }

  get error(): string | null {
    return this.state.error;
  }

  get filters(): CharacterFilters {
    return this.state.filters;
  }

  get pagination(): PaginationInfo {
    return this.state.pagination;
  }

  get filteredCharacters(): Character[] {
    // Verificar que characters sea un array antes de hacer spread
    if (!Array.isArray(this.state.characters)) {
      console.warn('Characters is not an array:', this.state.characters);
      return [];
    }

    let filtered = [...this.state.characters];

    // Filtrar por término de búsqueda
    if (this.state.filters.searchTerm) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(this.state.filters.searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (this.state.filters.selectedStatus) {
      filtered = filtered.filter(character => character.status === this.state.filters.selectedStatus);
    }

    // Filtrar por especie
    if (this.state.filters.selectedSpecies) {
      filtered = filtered.filter(character => character.species === this.state.filters.selectedSpecies);
    }

    // Filtrar solo favoritos
    if (this.state.filters.showOnlyFavorites) {
      filtered = filtered.filter(character => 
        this.state.favorites.some(fav => fav.id === character.id)
      );
    }

    return filtered;
  }

  // Actions
  async loadCharacters(page: number = 1, pageSize: number = 21): Promise<void> {
    console.log('🔄 [CharacterController] loadCharacters called with page:', page, 'pageSize:', pageSize);
    this.setState({ loading: true, error: null });

    try {
      console.log('📡 [CharacterController] Calling service with pagination...');
      const response = await this.characterService.getCharactersWithPagination(page, pageSize);
      console.log('📡 [CharacterController] Service response:', response);
      
      // Verificar que characters sea un array
      if (Array.isArray(response.data)) {
        console.log('✅ [CharacterController] Setting characters and pagination:', {
          charactersCount: response.data.length,
          pagination: response.pagination
        });
        this.setState({ 
          characters: response.data, 
          pagination: response.pagination,
          loading: false 
        });
      } else {
        console.warn('❌ [CharacterController] Characters service returned non-array:', response.data);
        this.setState({ 
          characters: [], 
          pagination: {
            currentPage: page,
            pageSize: pageSize,
            totalItems: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPreviousPage: false,
          },
          loading: false 
        });
      }
      
      // Cargar favoritos del backend después de cargar personajes
      await this.loadFavorites();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar personajes';
      console.error('❌ [CharacterController] Error loading characters:', error);
      this.setState({ 
        error: errorMessage, 
        loading: false, 
        characters: [], // Asegurar que characters sea un array vacío en caso de error
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      });
    }
  }

  async loadFavorites(): Promise<void> {
    try {
      console.log('🔄 [CharacterController] Loading favorites from backend...');
      const favorites = await this.favoritesService.getUserFavorites();
      console.log('✅ [CharacterController] Loaded favorites:', favorites.length);
      this.setState({ favorites });
    } catch (error) {
      console.error('❌ [CharacterController] Error al cargar favoritos:', error);
      // En caso de error, mantener favoritos vacíos
      this.setState({ favorites: [] });
    }
  }

  async searchCharacters(searchTerm: string): Promise<void> {
    this.setState({ loading: true, error: null });

    try {
      const characters = await this.characterService.searchCharacters(searchTerm);
      
      // Verificar que characters sea un array
      if (Array.isArray(characters)) {
        this.setState({ characters, loading: false });
      } else {
        console.warn('Search service returned non-array:', characters);
        this.setState({ characters: [], loading: false });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al buscar personajes';
      console.error('Error searching characters:', error);
      this.setState({ 
        error: errorMessage, 
        loading: false, 
        characters: [] // Asegurar que characters sea un array vacío en caso de error
      });
    }
  }

  addToFavorites(character: Character): void {
    if (!this.state.favorites.some(fav => fav.id === character.id)) {
      this.setState({
        favorites: [...this.state.favorites, character]
      });
    }
  }

  removeFromFavorites(characterId: number): void {
    this.setState({
      favorites: this.state.favorites.filter(fav => fav.id !== characterId)
    });
  }

  async toggleFavorite(character: Character): Promise<void> {
    console.log('🔄 [CharacterController] Toggle favorite:', character.name);
    console.log('🔄 [CharacterController] Current favorites:', this.state.favorites.length);
    console.log('🔄 [CharacterController] Character ID:', character.id);
    
    const isCurrentlyFavorite = this.state.favorites.some(fav => fav.id === character.id);
    console.log('🔄 [CharacterController] Is currently favorite:', isCurrentlyFavorite);
    
    try {
      if (isCurrentlyFavorite) {
        console.log('❌ [CharacterController] Removing from favorites');
        await this.favoritesService.removeFavorite(character.id);
        this.setState({
          favorites: this.state.favorites.filter(fav => fav.id !== character.id)
        });
      } else {
        console.log('✅ [CharacterController] Adding to favorites');
        await this.favoritesService.addFavorite(character);
        this.setState({
          favorites: [...this.state.favorites, character]
        });
      }
      
      console.log('✅ [CharacterController] Favorite toggled successfully');
      console.log('🔄 [CharacterController] New favorites count:', this.state.favorites.length);
    } catch (error) {
      console.error('❌ [CharacterController] Error toggling favorite:', error);
      // En caso de error, revertir el cambio local
      if (isCurrentlyFavorite) {
        this.setState({
          favorites: [...this.state.favorites, character]
        });
      } else {
        this.setState({
          favorites: this.state.favorites.filter(fav => fav.id !== character.id)
        });
      }
    }
  }

  isFavorite(characterId: number): boolean {
    return this.state.favorites.some(fav => fav.id === characterId);
  }

  setSearchTerm(searchTerm: string): void {
    this.setState({
      filters: { ...this.state.filters, searchTerm }
    });
  }

  setSelectedStatus(status: string): void {
    this.setState({
      filters: { ...this.state.filters, selectedStatus: status }
    });
  }

  setSelectedSpecies(species: string): void {
    this.setState({
      filters: { ...this.state.filters, selectedSpecies: species }
    });
  }

  setShowOnlyFavorites(showOnlyFavorites: boolean): void {
    this.setState({
      filters: { ...this.state.filters, showOnlyFavorites }
    });
  }

  clearFilters(): void {
    this.setState({
      filters: {
        searchTerm: '',
        selectedStatus: '',
        selectedSpecies: '',
        showOnlyFavorites: false,
      }
    });
  }

  handleCharacterSearch(searchTerm: string): void {
    this.setSearchTerm(searchTerm);
    
    if (searchTerm.trim()) {
      this.searchCharacters(searchTerm);
    } else {
      this.loadCharacters();
    }
  }

  async handleToggleFavorite(character: any): Promise<void> {
    await this.toggleFavorite(character);
  }

  // Método para cambiar de página
  async changePage(page: number): Promise<void> {
    console.log('🔄 [CharacterController] changePage called with page:', page);
    console.log('🔄 [CharacterController] Current pagination:', this.state.pagination);
    
    if (page < 1 || page > this.state.pagination.totalPages) {
      console.warn('❌ [CharacterController] Invalid page number:', page);
      return;
    }
    
    console.log('✅ [CharacterController] Loading page:', page, 'with pageSize:', this.state.pagination.pageSize);
    await this.loadCharacters(page, this.state.pagination.pageSize);
  }



  // Método público para setState (usado por AppController)
  setState(updates: Partial<CharacterState>): void {
    this.state = { ...this.state, ...updates };
  }
}
