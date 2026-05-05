const { spawn } = require("child_process");
const path = require("path");

// 🔥 VARIÁVEIS GLOBAIS (OBRIGATÓRIO)
let processoPython = null;
let leituraAtiva = false;

exports.iniciarLeitura = (empresaId) => {
  if (leituraAtiva) {
    return {
      sucesso: false,
      mensagem: "Leitura já está em execução"
    };
  }

  if (!empresaId) {
    return {
      sucesso: false,
      mensagem: "empresa_id não informado"
    };
  }

  const caminhoPython = path.join(
    __dirname,
    "../../../vision-python/src/main.py"
  );

  console.log("Iniciando leitura para empresa:", empresaId);

  processoPython = spawn("py", [caminhoPython], {
    shell: true,
    env: {
      ...process.env,
      EMPRESA_ID: String(empresaId) // 🔥 garante string
    }
  });

  leituraAtiva = true;

  processoPython.stdout.on("data", (data) => {
    console.log(`PYTHON: ${data}`);
  });

  processoPython.stderr.on("data", (data) => {
    console.error(`ERRO PYTHON: ${data}`);
  });

  processoPython.on("close", (code) => {
    leituraAtiva = false;
    processoPython = null;
    console.log("Processo Python encerrado. Código:", code);
  });

  return {
    sucesso: true,
    mensagem: "Leitura iniciada com sucesso"
  };
};

exports.pararLeitura = () => {
  if (!processoPython) {
    return {
      sucesso: false,
      mensagem: "Nenhuma leitura em execução"
    };
  }

  processoPython.kill();

  leituraAtiva = false;
  processoPython = null;

  return {
    sucesso: true,
    mensagem: "Leitura encerrada com sucesso"
  };
};

exports.statusLeitura = () => {
  return {
    sucesso: true,
    ativa: leituraAtiva
  };
};