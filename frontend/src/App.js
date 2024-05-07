import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Functionallity from './FontPage/Functionallity';
import NavbarRandom from './Component/PublicApiIntergation/RandomUser/NavbarRandom';
import RandomUsers from './Component/PublicApiIntergation/RandomUser/RandomUsers';
import Products from './Component/PublicApiIntergation/Products/Products';
import Jokes from './Component/PublicApiIntergation/Jokes/Jokes';

function App() {

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Functionallity />} />
        {/* <Route path="/randomUsers" element={<RandomUsers />} /> */}
        <Route path="/randomUsers" element={<NavbarRandom />} />
        <Route path="/randomUsers" element={<RandomUsers />} />
        <Route path="/randomUsers/products" element={<Products />} />
        <Route path="/randomUsers/jokes" element={<Jokes />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>


   
    </>
  );
}

export default App;
