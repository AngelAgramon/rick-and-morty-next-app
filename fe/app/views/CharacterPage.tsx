import { observer } from 'mobx-react-lite';
import Layout from '../components/Layout';

const CharacterPage: React.FC = observer(() => {

    return (
        <Layout>
            <h1 className='page-heading text-gradient teal-cyan rickFont'>Character Page</h1>
        </Layout>
    );
});

export default CharacterPage;
