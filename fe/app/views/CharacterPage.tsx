import { observer } from 'mobx-react-lite';
import Layout from '../components/Layout';
import { characterController } from '~/controllers';

const CharacterPage: React.FC = observer(() => {
     const { character } = characterController;

    return (
        <Layout>
            <h1 className='page-heading text-gradient teal-cyan rickFont'>Character Page</h1>
           <img src={character?.image} alt={character?.name} style={{borderRadius: '12px' }} />
				
            <p>Name: {character?.name}</p>
            <p>Id: {character?.id}</p>
            <p>status: {character?.status}</p>
            <p>species: {character?.species}</p>
            <p>gender: {character?.gender}</p>
        </Layout>
    );
});

export default CharacterPage;
