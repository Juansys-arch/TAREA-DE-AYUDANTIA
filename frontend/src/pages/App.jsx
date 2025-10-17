import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';

function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="profile" element={<Profile/>} />
        </Routes>
        </BrowserRouter>

    )
}
export default App;

