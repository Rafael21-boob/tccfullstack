import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompanyPanel from "./pages/CompanyPanel";
import ReadingPanel from "./pages/ReadingPanel";
import About from "./pages/About";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCompany, setSelectedCompany] = useState(null);

  const goToCompany = (company) => {
    setSelectedCompany(company);
    setPage("company");
  };

  return (
    <>
      {page === "home" && <Home setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "dashboard" && (
        <Dashboard setPage={setPage} goToCompany={goToCompany} />
      )}
      {page === "company" && (
        <CompanyPanel
          setPage={setPage}
          company={selectedCompany}
        />
      )}
      {page === "reading" && (
        <ReadingPanel setPage={setPage} company={selectedCompany} />
      )}
      {page === "about" && <About setPage={setPage} />}
      {page === "technology" && <Technology setPage={setPage} />}
      {page === "contact" && <Contact setPage={setPage} />}
    </>
  );
}