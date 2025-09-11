import { observer } from 'mobx-react-lite';
import { useUIStore } from '../stores/StoreContext';

export const NotificationSystem = observer(() => {
  const uiStore = useUIStore();

  if (uiStore.notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {uiStore.notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification p-4 max-w-sm transition-all duration-300 transform ${
            notification.type === 'success' 
              ? 'border-neon-green shadow-neon-green-glow' 
              : notification.type === 'error' 
              ? 'border-neon-red shadow-neon-red-glow' 
              : 'border-neon-blue shadow-neon-blue-glow'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">
                {notification.type === 'success' ? '✅' : 
                 notification.type === 'error' ? '❌' : 'ℹ️'}
              </div>
              <p className="text-sm font-medium text-white">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => uiStore.removeNotification(notification.id)}
              className="text-gray-400 hover:text-white transition-colors ml-4 text-lg"
              title="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}); 