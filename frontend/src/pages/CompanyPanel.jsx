import { useState } from "react";
import { ArrowLeft, Play, QrCode } from "lucide-react";
import ReadingCard from "../components/ReadingCard";
import "../styles/CompanyPanel.css";

const fakeReadings = [
  {
    id: 1,
    code: "ITEM001",
    location: "A1-02",
    status: "Lido"
  },
  {
    id: 2,
    code: "ITEM002",
    location: "B3-04",
    status: "Conferido"
  }
];

export default function CompanyPanel({ setPage, company }) {
  const [readings] = useState(fakeReadings);

  if (!company) {
    setPage("dashboard");
    return null;
  }

  return (
    <main className="company-page">
      <button className="back-action" onClick={() => setPage("dashboard")}>
        <ArrowLeft size={18} />
        Voltar
      </button>

      <section className="company-hero">
        <div>
          <span className="tag">Empresa selecionada</span>
          <h1>{company.name}</h1>
          <p>{company.segment}</p>
        </div>

        <button className="start-reading" onClick={() => setPage("reading")}>
          <Play size={20} />
          Adicionar nova leitura
        </button>
      </section>

      <section className="dashboard-panel">
        <div className="panel-header">
          <h2>Leituras recentes</h2>
          <QrCode />
        </div>

        <div className="readings-list">
          {readings.map((reading) => (
            <ReadingCard key={reading.id} reading={reading} />
          ))}
        </div>
      </section>
    </main>
  );
}