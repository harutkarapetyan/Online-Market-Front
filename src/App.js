import { Route, Routes } from 'react-router-dom';
import './App.css';
import Wrapper from './Components/Wrapper/Wrapper';
import Login from './UI/Login/Login';
import CreateAccount from './UI/CreateAccount/CreateAccount';
import ForgotPassword from './UI/ForgotPassword/ForgotPassword';
import Home from './UI/Home/Home';
import Explore from './UI/Explore/Explore';
import Favourites from './UI/Favourites/Favourites';
import Orders from './UI/Orders/Orders';
import Messages from './UI/Messages/Messages';
import Settings from './UI/Settings/Settings';

function App() {
    return (
        <Wrapper>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/forgotPassword' element={<ForgotPassword/>} />
                <Route path='/CreateAccount' element={<CreateAccount/>} />
                <Route path='/Home' element={<Home/>}/>
                <Route path='/Explore' element={<Explore/>}/>
                <Route path='/Favourites' element={<Favourites/>}/>
                <Route path='/Orders' element={<Orders/>}/>
                <Route path='/Messages' element={<Messages/>}/>
                <Route path='/Settings' element={<Settings/>}/>
            </Routes>
        </Wrapper>
    );
}

export default App;
