import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Functionallity from "./FontPage/Functionallity";
import NavbarRandom from "./Component/PublicApiIntergation/RandomUser/NavbarRandom";
import RandomUsers from "./Component/PublicApiIntergation/RandomUser/RandomUsers";
import Products from "./Component/PublicApiIntergation/Products/Products";
import Jokes from "./Component/PublicApiIntergation/Jokes/Jokes";
import Book from "./Component/PublicApiIntergation/Book/Book";
import Stock from "./Component/PublicApiIntergation/Stock/Stock";
import Quote from "./Component/PublicApiIntergation/Quote/Quote";
import Meal from "./Component/PublicApiIntergation/Meal/Meal";
import Dogs from "./Component/PublicApiIntergation/Dogs/Dogs";
import Cats from "./Component/PublicApiIntergation/Cats/Cats";
// import Youtube from "./Component/PublicApiIntergation/Youtube/Youtube";
import Header from "./Component/Todo/Header/Header";
import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import Navbar from "./Component/Auth/Navbar";
import ProtectRoute from "./Component/Auth/Protectroute";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Functionallity />} />
          <Route path="/randomUsers" element={<NavbarRandom />}>
            <Route index element={<RandomUsers />} />
            <Route path="products" element={<Products />} />
            <Route path="jokes" element={<Jokes />} />
            <Route path="book" element={<Book />} />
            <Route path="stock" element={<Stock />} />
            <Route path="quote" element={<Quote />} />
            <Route path="meal" element={<Meal />} />
            <Route path="dogs" element={<Dogs />} />
            <Route path="cats" element={<Cats />} />
            {/* <Route path="youtube" element={<Youtube />} /> */}
          </Route>

          {/* ------------ to DO LISt -----  */}

          <Route path="/todoHeader" element={<Header />} />

          {/* ------------ Auth -----  */}
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectRoute/>}>
          <Route path="/login/navbar" element={<Navbar />} />
      
          
          </Route>
          <Route path="login/register" element={<Register />} /> 
          
          
          
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
