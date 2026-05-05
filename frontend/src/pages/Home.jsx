import "../styles/Home.css";
import { motion } from "framer-motion";
import {
  Boxes,
  BrainCircuit,
  CheckCircle,
  QrCode,
  Radar,
  ShieldCheck
} from "lucide-react";

import Navbar from "../components/Navbar";
import DroneAnimation from "../components/DroneAnimation";
import ScannerEffect from "../components/ScannerEffect";
import BenefitCard from "../components/BenefitCard";
import Button from "../components/Button";
import { fadeUp, fadeLeft, scaleIn } from "../animations/motionVariants";
import warehouse from "../assets/warehouse.png";

export default function Home({ setPage }) {
  return (
    <main className="home">
      <Navbar setPage={setPage} />

      <section className="hero">
        <img src={warehouse} alt="Armazém logístico" className="hero-bg" />
        <div className="hero-overlay" />

        <div className="hero-content">
          <motion.div
            className="hero-text"
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
          >
            <span className="tag">Gestão logística inteligente</span>

            <h1>
              Inventário com <strong>Drone</strong>, QR Code e visão
              computacional.
            </h1>

            <p>
              Um sistema moderno para leitura automatizada de estoque,
              acompanhamento por empresa e integração com API em tempo real.
            </p>

            <div className="hero-actions">
              <Button onClick={() => setPage("login")}>
                Acessar Sistema
              </Button>

              <Button variant="secondary">
                Conhecer Tecnologia
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <DroneAnimation />
          </motion.div>
        </div>
      </section>

      <section className="section">
        <motion.div
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="tag">Por que usar drone?</span>
          <h2>Mais controle, velocidade e segurança no inventário</h2>
          <p>
            A solução combina logística, automação e visão computacional para
            reduzir falhas manuais e melhorar a conferência operacional.
          </p>
        </motion.div>

        <div className="benefits-grid">
          <BenefitCard
            icon={QrCode}
            title="Leitura por QR Code"
            text="Identificação rápida de produtos, posições e pallets."
          />
          <BenefitCard
            icon={Radar}
            title="Captura aérea"
            text="Leitura visual com drone em áreas logísticas."
          />
          <BenefitCard
            icon={Boxes}
            title="Gestão por empresa"
            text="Cada cliente possui seu próprio histórico de leituras."
          />
          <BenefitCard
            icon={ShieldCheck}
            title="Menos risco operacional"
            text="Redução da necessidade de acesso manual a locais elevados."
          />
        </div>
      </section>

      <section className="tech-section">
        <div>
          <span className="tag">Arquitetura do sistema</span>
          <h2>Do drone até o painel de gestão</h2>
          <p>
            O drone transmite o vídeo, o Python processa a imagem, o backend
            registra as leituras e o front-end apresenta os dados por empresa.
          </p>

          <div className="flow">
            <div>Drone</div>
            <div>Python + OpenCV</div>
            <div>API Node</div>
            <div>Dashboard</div>
          </div>
        </div>

        <ScannerEffect />
      </section>

      <section className="final-cta">
        <BrainCircuit size={42} />
        <h2>Transforme inventário em inteligência operacional</h2>
        <p>
          Controle leituras, empresas e operações em uma interface moderna e
          preparada para expansão.
        </p>
        <Button onClick={() => setPage("login")}>Entrar no sistema</Button>
      </section>
    </main>
  );
}