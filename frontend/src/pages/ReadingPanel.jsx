import { useEffect, useState } from "react";
import { ArrowLeft, PauseCircle, PlayCircle, RadioTower } from "lucide-react";
import { iniciarLeitura, listarLeituras, pararLeitura } from "../services/api";
import ScannerEffect from "../components/ScannerEffect";
import "../styles/ReadingPanel.css";

export default function ReadingPanel({ setPage, company }) {
  const [status, setStatus] = useState("Aguardando início");
  const [readings, setReadings] = useState([]);

  async function startReading() {
    setStatus("Iniciando leitura...");
    const data = await iniciarLeitura(company.id);
    setStatus(data.mensagem || "Leitura iniciada");
  }

  async function stopReading() {
    const data = await pararLeitura();
    setStatus(data.mensagem || "Leitura parada");
  }

  async function loadReadings() {
    if (!company?.id) return;
  
    const token = localStorage.getItem("token");
  
    const response = await fetch(
      `http://localhost:3000/api/leituras/empresa/${company.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  
    const data = await response.json();
  
    if (data.success) {
      setReadings(data.data);
    }
  }

  useEffect(() => {
    loadReadings();
  
    const interval = setInterval(() => {
      loadReadings();
    }, 2000);
  
    return () => clearInterval(interval);
  }, [company]);

  return (
    <main className="reading-page">
      <button className="back-action" onClick={() => setPage("company")}>
        <ArrowLeft size={18} />
        Voltar
      </button>

      <section className="reading-layout">
        <div className="reading-control">
          <span className="tag">Leitura em tempo real</span>
          <h1>Scanner do drone</h1>
          <p>
            Empresa: <strong>{company?.name || "Operação atual"}</strong>
          </p>

          <div className="status-box">
            <RadioTower />
            <span>{status}</span>
          </div>

          <div className="reading-actions">
            <button onClick={startReading}>
              <PlayCircle />
              Iniciar leitura
            </button>

            <button onClick={stopReading}>
              <PauseCircle />
              Parar leitura
            </button>
          </div>
        </div>

        <ScannerEffect />
      </section>

      <section className="dashboard-panel">
        <h2>Leituras capturadas</h2>

        <div className="readings-list">
          {readings.length === 0 ? (
            <p>Nenhuma leitura recebida ainda.</p>
          ) : (
            readings.map((reading) => (
              <div className="reading-card" key={reading.id}>
                <strong>{reading.codigo_qr}</strong>
                <p>{reading.local_lido}</p>
                <span>{reading.status}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}