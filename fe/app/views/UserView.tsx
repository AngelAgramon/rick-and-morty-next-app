import { ModalProps } from '../types';
import { userController } from '../controllers';

const UserView: React.FC = () => {

    const { users } = userController;
    console.log("user: ", users);



    return (
        <div style={{zIndex: 1000, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}} className='user-modal-overlay'>
            <div style={{ width: '800px', height: '600px', zIndex: 1001, backgroundColor: 'white', padding: '20px', borderRadius: '10px'}} className='user-modal'>
                <button className='close-button'>X</button>
                <h1>Users</h1>



                <div style={{ color: 'black', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h2>Users</h2>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <h3>User 1</h3>
                        <p>User 1 description</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <h3>User 2</h3>
                        <p>User 2 description</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { UserView };