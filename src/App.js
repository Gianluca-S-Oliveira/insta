import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Paginas/Home/Home"; // Importe o componente da outra página
// Importe o componente da outra página
import Login from "./Paginas/Login/Login";
import Cadastro from "./Paginas/Cadastro/cadastro";
import Posts from './Paginas/Posts/PostsList/Posts';
import Justificativa from './Paginas/Justificativa';
import Premium from './Paginas/Premium';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/justificativa" element={<Justificativa />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
