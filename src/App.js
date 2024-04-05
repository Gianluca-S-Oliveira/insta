import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Paginas/Home/Home"; // Importe o componente da outra página
// Importe o componente da outra página
import Login from "./Paginas/Login/Login";
import Cadastro from "./Paginas/Cadastro/cadastro";
import Posts from './Paginas/Posts/Posts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
