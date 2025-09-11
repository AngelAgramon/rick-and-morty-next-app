// controllers/AppController.ts
import { AuthController } from './AuthController';
import { CharacterStore } from '../stores/CharacterStore';
import { UIController } from './UIController';

export class AppController {
  public auth: AuthController;
  public character: CharacterStore;
  public ui: UIController;

  constructor() {
    this.auth = new AuthController();
    this.character = new CharacterStore();
    this.ui = new UIController();
  }

  // Métodos de conveniencia para operaciones comunes
  async initializeApp(): Promise<void> {
    // Verificar autenticación al inicializar
    await this.auth.checkAuthOnMount();
    
    // Cargar personajes si está autenticado
    if (this.auth.isAuthenticated) {
      await this.character.loadCharacters(1, 21);
    }
  }

  async handleLogin(credentials: { username: string; password: string }): Promise<boolean> {
    const success = await this.auth.login(credentials);
    
    if (success) {
      this.ui.addNotification('¡Inicio de sesión exitoso!', 'success');
      await this.character.loadCharacters(1, 21);
    } else {
      this.ui.addNotification(
        this.auth.error || 'Error en el inicio de sesión', 
        'error'
      );
    }
    
    return success;
  }

  async handleLogout(): Promise<void> {
    await this.auth.logout();
    this.ui.addNotification('Sesión cerrada correctamente', 'info');
    this.character.clearFilters();
    // Limpiar favoritos al cerrar sesión
    this.character.favorites = [];
  }

  handleCharacterSearch(searchTerm: string): void {
    this.character.setSearchTerm(searchTerm);
    
    if (searchTerm.trim()) {
      this.character.searchCharacters(searchTerm);
    } else {
      this.character.loadCharacters(1, 21);
    }
  }

  handleToggleFavorite(character: any): void {
    this.character.toggleFavorite(character);
    const isFavorite = this.character.isFavorite(character.id);
    
    this.ui.addNotification(
      isFavorite ? 'Agregado a favoritos' : 'Removido de favoritos',
      'info',
      2000
    );
  }
}
