const db = require("../config/db");

exports.criar = async (dados) => {
  const { empresa_id, codigo_qr, local_lido, status } = dados;

  console.log("DADOS RECEBIDOS NA LEITURA:", dados);

  const [resultado] = await db.query(
    `INSERT INTO leituras (empresa_id, codigo_qr, local_lido, status)
     VALUES (?, ?, ?, ?)`,
    [empresa_id, codigo_qr, local_lido || "DRONE", status || "lido"]
  );

  return {
    id: resultado.insertId,
    empresa_id,
    codigo_qr,
    local_lido: local_lido || "DRONE",
    status: status || "lido"
  };
};

exports.listar = async () => {
  const [leituras] = await db.query(`
    SELECT 
      leituras.id,
      leituras.codigo_qr,
      leituras.local_lido,
      leituras.status,
      leituras.criado_em,
      empresas.nome AS empresa
    FROM leituras
    LEFT JOIN empresas ON empresas.id = leituras.empresa_id
    ORDER BY leituras.id DESC
  `);

  return leituras;
};

exports.listarPorEmpresa = async (empresaId) => {
  const [leituras] = await db.query(
    `SELECT * FROM leituras WHERE empresa_id = ? ORDER BY id DESC`,
    [empresaId]
  );

  return leituras;
};