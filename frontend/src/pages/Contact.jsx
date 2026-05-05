import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
  Warehouse,
} from "lucide-react";

import Button from "../components/Button";
import ScannerEffect from "../components/ScannerEffect";
import "../styles/Contact.css";

export default function Contact({ setPage }) {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <button className="contact-back" onClick={() => setPage("home")}>
          <ArrowLeft size={18} />
          Voltar
        </button>

        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="tag">Contato</span>

          <h1>
            Fale com a equipe sobre o sistema de{" "}
            <strong>inventário com drone</strong>.
          </h1>

          <p>
            Esta área simula um canal de contato para empresas interessadas em
            conhecer a solução, solicitar demonstração ou integrar operações
            logísticas ao sistema.
          </p>

          <div className="contact-actions">
            <Button onClick={() => setPage("login")}>Acessar sistema</Button>
            <Button variant="secondary" onClick={() => setPage("technology")}>
              Ver tecnologia
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="contact-visual"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <ScannerEffect />
        </motion.div>
      </section>

      <section className="contact-section">
        <div className="contact-title">
          <span className="tag">Solicitar demonstração</span>
          <h2>Envie uma mensagem</h2>
          <p>
            Preencha as informações abaixo para simular o contato comercial da
            solução. Por enquanto, o formulário é visual e não envia dados.
          </p>
        </div>

        <div className="contact-layout">
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <label>
              Nome
              <div className="contact-input">
                <User size={20} />
                <input type="text" placeholder="Seu nome" />
              </div>
            </label>

            <label>
              Empresa
              <div className="contact-input">
                <Building2 size={20} />
                <input type="text" placeholder="Nome da empresa" />
              </div>
            </label>

            <label>
              E-mail
              <div className="contact-input">
                <Mail size={20} />
                <input type="email" placeholder="contato@empresa.com.br" />
              </div>
            </label>

            <label>
              Telefone
              <div className="contact-input">
                <Phone size={20} />
                <input type="text" placeholder="(00) 00000-0000" />
              </div>
            </label>

            <label>
              Mensagem
              <textarea placeholder="Descreva a necessidade da empresa..." />
            </label>

            <button type="button" className="contact-submit">
              <Send size={18} />
              Enviar mensagem
            </button>
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Canais de atendimento</h3>
            <p>
              Use esta área para apresentar os canais de contato do projeto,
              simulando uma página institucional profissional.
            </p>

            <div className="contact-info-list">
              <div>
                <MessageCircle />
                <span>WhatsApp comercial</span>
                <strong>(19) 99838-3127</strong>
              </div>

              <div>
                <Mail />
                <span>E-mail</span>
                <strong>logistica@gestock.com.br</strong>
              </div>

              <div>
                <MapPin />
                <span>Região de atuação</span>
                <strong>Campinas e região</strong>
              </div>

              <div>
                <Warehouse />
                <span>Aplicação</span>
                <strong>Logística, estoque e inventário</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}