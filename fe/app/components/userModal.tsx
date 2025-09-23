import { ModalProps } from '../types';

const UserModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className='user-modal-overlay' onClick={onClose}>
            <div className='user-modal' onClick={(e) => e.stopPropagation()}>
                <button className='close-button' onClick={onClose}>X</button>
                <h1>Users</h1>
            </div>
        </div>
    );
};

export default UserModal;