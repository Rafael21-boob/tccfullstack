import { motion } from "framer-motion";
import { Eye, Lock, User } from "lucide-react";
import { useState } from "react";

import "../styles/Login.css";

export default function Login({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const senha = e.target.senha.value;

    if (!email || !senha) {
      alert("Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // 🔐 salva token
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("usuario", JSON.stringify(data.data.usuario));

      setPage("dashboard");
    } catch (err) {
      alert("Erro ao conectar com servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-background" />

      <motion.form
        className="login-card"
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <span className="tag">Área restrita</span>
        <h1>Acesso ao sistema</h1>
        <p>Entre para gerenciar empresas, leituras e operações com drone.</p>

        {/* EMAIL */}
        <label>
          Usuário
          <div className="input-box">
            <User size={20} />
            <input
              name="email"                // 🔥 ESSENCIAL
              type="email"
              placeholder="admin@gestock.com"
            />
          </div>
        </label>

        {/* SENHA */}
        <label>
          Senha
          <div className="input-box">
            <Lock size={20} />
            <input
              name="senha"               // 🔥 ESSENCIAL
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye size={20} />
            </button>
          </div>
        </label>

        {/* BOTÃO LOGIN */}
        <button className="login-button" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* VOLTAR */}
        <button
          type="button"
          className="back-button"
          onClick={() => setPage("home")}
        >
          Voltar para início
        </button>
      </motion.form>
    </main>
  );
}