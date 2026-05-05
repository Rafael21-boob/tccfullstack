import { motion } from "framer-motion";
import Button from "./Button";
import logo from "../assets/logo-gestock.png";

export default function Navbar({ setPage }) {
  return (
    <motion.header
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="navbar-logo">
        <img src={logo} alt="Gestock" />
      </div>

      <nav>
        <button onClick={() => setPage("home")}>Início</button>
        <button onClick={() => setPage("about")}>Sobre o sistema</button>
        <button onClick={() => setPage("technology")}>Tecnologia</button>
        <button onClick={() => setPage("contact")}>Contato</button>
      </nav>

      <Button onClick={() => setPage("login")}>Acessar Sistema</Button>
    </motion.header>
  );
}