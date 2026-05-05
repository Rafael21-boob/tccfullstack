const API_URL = "http://localhost:3000/api";

export async function iniciarLeitura(empresaId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/leitura/iniciar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      empresa_id: empresaId
    })
  });

  return response.json();
}

export async function pararLeitura() {
  const response = await fetch(`${API_URL}/leitura/parar`, {
    method: "POST"
  });

  return response.json();
}

export async function listarLeituras() {
  const response = await fetch(`${API_URL}/leituras`);
  return response.json();
}