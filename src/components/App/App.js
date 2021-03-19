import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';
import './App.scss';

const MOCK_DATA = [
    {
        gameSeries: 'Super Mario',
        image:
            'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png',
        name: 'Mario',
    },
    {
        gameSeries: 'Super Mario',
        image:
            'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00340102.png',
        name: 'Mario',
    },
    {
        gameSeries: 'Super Mario',
        image:
            'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-003c0102.png',
        name: 'Mario - Gold Edition',
    },
    {
        gameSeries: 'Super Mario',
        image:
            'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-003d0102.png',
        name: 'Mario - Silver Edition',
    },
    {
        character: 'Mario',
        gameSeries: 'Super Mario',
        image:
            'https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000300-03a60102.png',
        name: 'Mario - Cat',
    },
];

function App() {
    return (
        <Card>
            <Carousel />
        </Card>
    );
}

export default App;
