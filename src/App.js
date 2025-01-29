import React, { useState } from "react";
import "./App.css";

function App() {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState(null);
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [uf, setUf] = useState("");
  const [loading, setLoading] = useState(false);
  const [cepResultado, setCepResultado] = useState(null); // Novo state para o CEP encontrado


  const handleCepChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) {
      setCep(value.replace(/(\d{5})(\d)/, "$1-$2"));
    }
  };

  const buscarCep = async () => {
    if (cep.replace(/\D/g, "").length !== 8) {
      setErro("CEP deve ter 8 dígitos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setErro("CEP não encontrado");
        setEndereco(null);
      } else {
        setEndereco(data);
        setErro(null);
      }
    } catch (error) {
      setErro("Erro ao buscar CEP");
      setEndereco(null);
    } finally {
      setLoading(false);
    }
  };

  const buscarCepPorEndereco = async () => {
    if (!logradouro || !localidade || !uf) {
      setErro("Preencha pelo menos logradouro, cidade e estado");
      return;
    }

    setLoading(true);
    const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade}, ${uf}`;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          enderecoCompleto
        )}&key=AIzaSyAUjeYTNJ7oHa5uZ-bGtBASpILPUPBqJ_I`
      );
      const data = await response.json();

     
    if (data.status === 'OK') {
      const cepComponent = data.results[0].address_components.find(component =>
        component.types.includes('postal_code')
      );
      if (cepComponent) {
        setCepResultado(cepComponent.long_name); // Alterado para setar o novo state
        setErro(null);
      } else {
        setErro('CEP não encontrado para este endereço');
        setCepResultado(null);
      }
    } else {
      setErro('Endereço não encontrado');
      setCepResultado(null);
    }
    } catch (error) {
      setErro("Erro ao buscar CEP pelo endereço");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🔍 BuscaCEP</h1>
        <p>Encontre endereços e CEPs rapidamente</p>
      </header>
  
      <div className="main-container">
        <div className="forms-container">
          <div className="search-section compact">
            <h2>📍 Por Endereço</h2>
            <div className="form-grid compact">
              <div className="input-group">
                <input
                  type="text"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  placeholder="Logradouro"
                  className="compact-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro (opcional)"
                  className="compact-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={localidade}
                  onChange={(e) => setLocalidade(e.target.value)}
                  placeholder="Cidade"
                  className="compact-input"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  value={uf}
                  onChange={(e) => setUf(e.target.value.toUpperCase())}
                  placeholder="UF"
                  maxLength="2"
                  className="compact-input uf-input"
                />
              </div>
              <button
                onClick={buscarCepPorEndereco}
                disabled={loading || !logradouro || !localidade || !uf}
                className="compact-button"
              >
                {loading ? "⏳" : "Buscar CEP"}
              </button>
            </div>
          </div>
  
          <div className="divider vertical"></div>
  
          <div className="search-section compact">
            <h2>📮 Por CEP</h2>
            <div className="input-group">
              <input
                type="text"
                value={cep}
                onChange={handleCepChange}
                placeholder="00000-000"
                maxLength="9"
                className="compact-input cep-input"
              />
            </div>
            <button
              onClick={buscarCep}
              disabled={loading || cep.replace(/\D/g, "").length !== 8}
              className="compact-button"
            >
              {loading ? "⏳" : "Buscar Endereço"}
            </button>
          </div>
        </div>
  
        <div className="results-container">
          {erro && <div className="error-message">⚠️ {erro}</div>}
          
          {cepResultado && (
            <div className="result-card cep-result compact">
              <div className="cep-result-content">
                <p className="cep-number">{cepResultado}</p>
                <button 
                  onClick={() => {
                    setCep(cepResultado);
                    buscarCep();
                  }}
                  className="secondary-button small"
                >
                  Buscar Endereço
                </button>
              </div>
            </div>
          )}
  
          {endereco && (
            <div className="result-card compact">
              <div className="result-grid compact">
                <div>
                  <p className="result-value">{endereco.cep}</p>
                  <small>CEP</small>
                </div>
                <div>
                  <p className="result-value">{endereco.logradouro || '-'}</p>
                  <small>Logradouro</small>
                </div>
                <div>
                  <p className="result-value">{endereco.bairro || '-'}</p>
                  <small>Bairro</small>
                </div>
                <div>
                  <p className="result-value">{endereco.localidade}</p>
                  <small>Cidade</small>
                </div>
                <div>
                  <p className="result-value">{endereco.uf}</p>
                  <small>UF</small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
