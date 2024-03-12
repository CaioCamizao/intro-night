import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

function Main() {
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [cep, setCep] = useState('');
  const [nomeRua, setNomeRua] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState(null);
  const [horaAbertura, setHoraAbertura] = useState('');
  const [horaFechamento, setHoraFechamento] = useState('');
  const [estabelecimentos, setEstabelecimentos] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const novoEstabelecimento = {
      nomeEstabelecimento,
      cep,
      nomeRua,
      telefone,
      foto,
      horaAbertura,
      horaFechamento
    };

    // Adicionar a imagem como um ícone
    if (foto) {
      const fotoURL = URL.createObjectURL(foto);
      novoEstabelecimento.foto = fotoURL;
    }

    setEstabelecimentos([...estabelecimentos, novoEstabelecimento]);

    console.log("Estabelecimentos:", estabelecimentos);

    // Limpar os campos do formulário
    setNomeEstabelecimento('');
    setCep('');
    setNomeRua('');
    setTelefone('');
    setFoto(null);
    setHoraAbertura('');
    setHoraFechamento('');
  };

  const handleCEPBlur = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, localidade, uf } = response.data;
      setNomeRua(logradouro);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const formatarTelefone = (telefone) => {
    // Formatar o telefone no formato (XX) XXXX-XXXX
    return telefone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Adicionar Estabelecimento</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Estabelecimento:</label>
          <input
            type="text"
            value={nomeEstabelecimento}
            onChange={(e) => setNomeEstabelecimento(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={handleCEPBlur}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome da Rua:</label>
          <input
            type="text"
            value={nomeRua}
            onChange={(e) => setNomeRua(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="tel"
            value={formatarTelefone(telefone)}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Foto:</label>
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>Hora de Abertura:</label>
          <input
            type="time"
            value={horaAbertura}
            onChange={(e) => setHoraAbertura(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Hora de Fechamento:</label>
          <input
            type="time"
            value={horaFechamento}
            onChange={(e) => setHoraFechamento(e.target.value)}
            required
          />
        </div>
        <button className="btn-submit" type="submit">Adicionar Estabelecimento</button>
      </form>
      
      {/* Mostrar a lista de estabelecimentos */}
      <div className="estabelecimentos">
        <h2>Estabelecimentos Adicionados:</h2>
        <ul>
          {estabelecimentos.map((estabelecimento, index) => (
            <li key={index}>
              <strong>{estabelecimento.nomeEstabelecimento}</strong> - {estabelecimento.cep} <br />
              <img src={estabelecimento.foto} alt="Foto Estabelecimento" width="50" height="50" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;