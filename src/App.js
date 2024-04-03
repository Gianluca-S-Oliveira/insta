import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Importe o componente da outra página
// Importe o componente da outra página
import Login from "../src/components/Login";
import Cadastro from "../src/components/cadastro";
import Posts from './components/Posts';

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
