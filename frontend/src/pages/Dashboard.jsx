import { useState } from "react";
import { Building2, ClipboardList, QrCode, Radar } from "lucide-react";
import "../styles/Dashboard.css";
import MetricCard from "../components/MetricCard";
import CompanyCard from "../components/CompanyCard";

const initialCompanies = [
  {
    id: 1,
    name: "Gestock Logística",
    segment: "Operação logística",
    readings: 12
  },
  {
    id: 2,
    name: "Empresa Alpha",
    segment: "Centro de distribuição",
    readings: 7
  },
  {
    id: 3,
    name: "Cliente Demonstração",
    segment: "Estoque técnico",
    readings: 3
  }
];

export default function Dashboard({ setPage, goToCompany }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [companyName, setCompanyName] = useState("");

  function addCompany() {
    if (!companyName.trim()) return;

    const newCompany = {
      id: Date.now(),
      name: companyName,
      segment: "Nova operação",
      readings: 0
    };

    setCompanies([...companies, newCompany]);
    setCompanyName("");
  }

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <h2>Gestock Drone</h2>
        <button>Dashboard</button>
        <button>Empresas</button>
        <button>Leituras</button>
        <button onClick={() => setPage("home")}>Sair</button>
      </aside>

      <section className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <span className="tag">Painel operacional</span>
            <h1>Controle por empresa</h1>
            <p>
              Selecione uma empresa para acessar o painel de leituras com drone.
            </p>
          </div>
        </div>

        <div className="metrics-grid">
          <MetricCard title="Empresas" value={companies.length} icon={Building2} />
          <MetricCard title="Leituras" value="22" icon={QrCode} />
          <MetricCard title="Operações" value="03" icon={Radar} />
          <MetricCard title="Relatórios" value="08" icon={ClipboardList} />
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Empresas cadastradas</h2>

            <div className="add-company">
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nova empresa"
              />
              <button onClick={addCompany}>Adicionar</button>
            </div>
          </div>

          <div className="company-grid">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onClick={goToCompany}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}