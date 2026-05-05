import { motion } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  Cpu,
  Database,
  Drone,
  Eye,
  GitBranch,
  Network,
  QrCode,
  RadioTower,
  ScanLine,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow
} from "lucide-react";

import Button from "../components/Button";
import ScannerEffect from "../components/ScannerEffect";
import "../styles/Technology.css";

export default function Technology({ setPage }) {
  return (
    <main className="technology-page">
      <section className="technology-hero">
        <button className="technology-back" onClick={() => setPage("home")}>
          <ArrowLeft size={18} />
          Voltar
        </button>

        <motion.div
          className="technology-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="tag">Tecnologia</span>

          <h1>
            Uma arquitetura moderna para leitura com{" "}
            <strong>drone, QR Code e API</strong>.
          </h1>

          <p>
            O sistema combina visão computacional, backend em Node.js,
            integração com Python e uma interface preparada para controle
            operacional por empresa.
          </p>

          <div className="technology-actions">
            <Button onClick={() => setPage("login")}>Acessar sistema</Button>
            <Button variant="secondary" onClick={() => setPage("about")}>
              Sobre o sistema
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="technology-core"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <div className="core-orbit orbit-one" />
          <div className="core-orbit orbit-two" />
          <div className="core-center">
            <BrainCircuit size={82} />
          </div>
          <div className="core-node node-1"><Drone /></div>
          <div className="core-node node-2"><QrCode /></div>
          <div className="core-node node-3"><Server /></div>
          <div className="core-node node-4"><Database /></div>
        </motion.div>
      </section>

      <section className="technology-section light">
        <div className="technology-title">
          <span className="tag">Stack do projeto</span>
          <h2>Tecnologias usadas no sistema</h2>
          <p>
            Cada tecnologia tem uma função específica dentro da solução,
            mantendo o projeto separado, escalável e mais fácil de evoluir.
          </p>
        </div>

        <div className="technology-stack-grid">
          <TechCard
            icon={Drone}
            title="Drone + Celular"
            text="O drone transmite o vídeo para o celular, que é espelhado no computador."
          />
          <TechCard
            icon={Smartphone}
            title="Scrcpy"
            text="Espelha a tela do celular no PC para que o Python consiga capturar o vídeo."
          />
          <TechCard
            icon={Eye}
            title="Python + OpenCV"
            text="Responsável por capturar a tela, processar a imagem e identificar QR Codes."
          />
          <TechCard
            icon={Server}
            title="Node.js + Express"
            text="API principal que recebe, processa e disponibiliza as leituras para o front-end."
          />
          <TechCard
            icon={Database}
            title="Banco de Dados"
            text="Futuramente armazenará empresas, produtos, posições e histórico de leituras."
          />
          <TechCard
            icon={Cpu}
            title="React + Vite"
            text="Interface moderna, modular e preparada para dashboards operacionais."
          />
        </div>
      </section>

      <section className="technology-flow-section">
        <div className="technology-flow-text">
          <span className="tag">Fluxo técnico</span>
          <h2>Como a informação percorre o sistema</h2>
          <p>
            A leitura começa no vídeo do drone, passa pelo processamento visual,
            é enviada para a API e depois aparece no painel web.
          </p>
        </div>

        <div className="technology-flow">
          <FlowStep number="01" icon={Drone} title="Drone" text="Captura o ambiente logístico." />
          <FlowLine />
          <FlowStep number="02" icon={Smartphone} title="Celular" text="Recebe o vídeo ao vivo." />
          <FlowLine />
          <FlowStep number="03" icon={Eye} title="OpenCV" text="Detecta o QR Code na imagem." />
          <FlowLine />
          <FlowStep number="04" icon={Network} title="API" text="Recebe a leitura via HTTP." />
          <FlowLine />
          <FlowStep number="05" icon={Database} title="Dados" text="Armazena e organiza registros." />
        </div>
      </section>

      <section className="technology-architecture">
        <div className="architecture-left">
          <span className="tag">Arquitetura</span>
          <h2>Separação profissional por serviços</h2>
          <p>
            O projeto não mistura tudo em um único arquivo. Ele separa visão
            computacional, backend e front-end, deixando a solução mais próxima
            de um sistema real.
          </p>

          <div className="architecture-list">
            <ArchitectureItem icon={GitBranch} title="Frontend" text="React com telas, componentes e serviços de API." />
            <ArchitectureItem icon={Server} title="Backend" text="Node + Express com rotas, controllers e services." />
            <ArchitectureItem icon={Eye} title="Vision" text="Python responsável pela captura e leitura do QR Code." />
            <ArchitectureItem icon={ShieldCheck} title="Camadas" text="Separação entre apresentação, regra de negócio e processamento." />
          </div>
        </div>

        <div className="architecture-right">
          <ScannerEffect />
        </div>
      </section>

      <section className="technology-future light">
        <div className="technology-title">
          <span className="tag">Evolução futura</span>
          <h2>Próximos recursos tecnológicos</h2>
        </div>

        <div className="future-grid">
          <FutureCard icon={Database} title="Banco real" text="Persistência com MySQL, PostgreSQL ou Prisma." />
          <FutureCard icon={RadioTower} title="Tempo real" text="Atualização instantânea com WebSocket." />
          <FutureCard icon={ShieldCheck} title="Login real" text="Autenticação com permissões por empresa." />
          <FutureCard icon={ScanLine} title="Leitura otimizada" text="Recorte automático da área de leitura do drone." />
          <FutureCard icon={Workflow} title="Relatórios" text="Dashboards e exportação de inventário." />
          <FutureCard icon={BrainCircuit} title="IA operacional" text="Análise de divergências e padrões de estoque." />
        </div>
      </section>
    </main>
  );
}

function TechCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      className="tech-card"
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220 }}
    >
      <Icon />
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}

function FlowStep({ number, icon: Icon, title, text }) {
  return (
    <motion.div
      className="flow-step"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span>{number}</span>
      <Icon />
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}

function FlowLine() {
  return <div className="flow-line" />;
}

function ArchitectureItem({ icon: Icon, title, text }) {
  return (
    <div className="architecture-item">
      <Icon />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function FutureCard({ icon: Icon, title, text }) {
  return (
    <motion.div
      className="future-card"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 230 }}
    >
      <Icon />
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.div>
  );
}