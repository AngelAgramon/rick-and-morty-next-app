import { ModalProps } from '../types';
import { userController } from '../controllers';

const UserView: React.FC = () => {

    const { users } = userController;
    console.log("user 2 FE: ", users);

    return (
        <div style={{zIndex: 1000, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}} className='user-modal-overlay'>
            <div style={{ width: '800px', height: '600px', zIndex: 1001, backgroundColor: 'white', padding: '20px', borderRadius: '10px'}} className='user-modal'>
                <button className='close-button'>X</button>
                <h1>Users</h1>
                {users.map((user) => (
                    <div key={user.username}>
                        <h3 className='text-gradient green-blue'>{user.username}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { UserView };