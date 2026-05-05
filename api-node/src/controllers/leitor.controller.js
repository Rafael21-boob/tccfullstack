const leitorService = require("../services/leitor.service");

exports.iniciar = (req, res) => {
  const { empresa_id } = req.body;

  if (!empresa_id) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Empresa não informada"
    });
  }

  const resultado = leitorService.iniciarLeitura(empresa_id);
  return res.status(resultado.sucesso ? 200 : 400).json(resultado);
};

exports.parar = (req, res) => {
  const resultado = leitorService.pararLeitura();
  return res.status(resultado.sucesso ? 200 : 400).json(resultado);
};

exports.status = (req, res) => {
  const resultado = leitorService.statusLeitura();
  return res.status(200).json(resultado);
};