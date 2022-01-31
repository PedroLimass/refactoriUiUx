import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import "./listadeusuarios.css";
import axios from "axios";
import { cards } from "./cards";
import invert from "./utilFn";

//Pegando as informações da API pelo GET
const ListaDeUsuarios = () => {
  const [infos, setInfos] = useState([]);
  useEffect(() => {
    axios
      .get("https://www.mocky.io/v2/5d531c4f2e0000620081ddce", {
        method: "GET",
      })
      .then((resposta) => {
        setInfos(resposta.data);
      });
  }, []);

  // Mock com lista de cartões para teste
  // const cards = [
  //   // cartão válido
  //   {
  //     card_number: "1111111111111111",
  //     cvv: 789,
  //     expiry_date: "01/18",
  //   },
  //   // cartão inválido
  //   {
  //     card_number: "4111111111111234",
  //     cvv: 123,
  //     expiry_date: "01/20",
  //   },
  // ];

  // Função para pegar a escolha do cartão do input select
  const escolhaDoCartao = (event) => {
    setValorCartao(event.target.value);
  };

  // Ações dos modals
  const [abrirPagamento, setAbrirPagamento] = useState(false); // Para abrir modal de pagamento
  const [pegarUsuario, setPegarUsuario] = useState(""); // Para pegar o nome do usuário
  const [abrirPagou, setAbrirPagou] = useState("none"); // Para abrir modal com recibo de pagamento
  const [abrirNaoRecebeu, setAbrirNaoRecebeu] = useState(""); // Para msg de erro de pagamento
  const [valorCartao, setValorCartao] = useState("1"); // Para pegar o cartão escolhido para pagamento
  const [valorDinheiro, setValorDinheiro] = useState(""); // Para pegar o valor de pagamento digitado
  const [validarCampo, setValidarCampo] = useState("none"); // Para validar campo de valor digitado
  const [teste, setTeste] = useState(false); // Para validar campo de valor digitado

  // Função para abrir o modal de pagamento do usuário
  const abrirModalPagar = (name) => {
    setAbrirPagamento(invert(abrirPagamento));
    setPegarUsuario(name);
  };

  // Função que abre o modal de recibo de pagamento
  const abrirModalPagou = () => {
    if (valorDinheiro === "") {
      setValidarCampo("flex");
    } else {
      if (valorCartao === "1") {
        setAbrirNaoRecebeu("");
      } else {
        setAbrirNaoRecebeu("não");
      }
      setAbrirPagamento(invert(abrirPagamento));
      setAbrirPagou("flex");
      setValorDinheiro("");
      setValidarCampo("none");
    }
  };

  // Função para fechar o modal do recibo de pagamento
  const fecharModal = () => {
    setAbrirPagou("none");
  };

  // Função para validar campo de valor para pagamento do usuário
  const valorInput = (event) => {
    setValorDinheiro(event.target.value);
    setValidarCampo("none");
  };

  
  // Renderizando na tela as informações recebidas da API
  return (
    <>
      <div id="main-container">
        {infos.map((item) => (
          <div className="container" key={item.index}>
            <div className="content">
              <img className="thumbnail" src={item.img} alt="Foto do usuário" />
              <div className="infos">
                <p>
                  <strong>ID:</strong> {item.id}
                </p>
                <p>
                  <strong>Nome do Usuário:</strong> {item.name}
                </p>
                <p>Username: {item.username}</p>
              </div>
              <button
                className="botao-pagar"
                onClick={() => {
                  abrirModalPagar(item.name);
                }}
              >
                Pagar
              </button>
            </div>
          </div>
        ))}



        {/*--------------------------------Abrir Modal de pagamento----------------------------------*/}
        {abrirPagamento ? (
          <div className="abrirModal" style={{ display: abrirPagamento }}>
            <p className="texto-cabecalho-modal">
              Pagamento para <span>{pegarUsuario}</span>
            </p>
            <div className="valorInput">
              <NumberFormat
                thousandSeparator={true}
                value={valorDinheiro}
                onChange={valorInput}
                prefix={"R$ "}
                inputmode="numeric"
                placeholder="R$ 0,00"
              />
              <p style={{ display: validarCampo }}>Campo obrigatório</p>
            </div>
            <select value={valorCartao} onChange={escolhaDoCartao}>
              <option value="1">
                Cartão com final {cards[0].card_number.substr(-4)}
              </option>
              <option value="2">
                Cartão com final {cards[1].card_number.substr(-4)}
              </option>
            </select>
            <button
              onClick={() => {
                abrirModalPagou();
              }}
            >
              Pagar
            </button>
          </div>
        ) : null}

        {/*------------------------------Abrir Modal de recibo de pagamento--------------------------------*/}
        <div className="abrirModal" style={{ display: abrirPagou }}>
          <p className="texto-cabecalho-modal">Recibo de pagamento</p>
          <p>
            O Pagamento <b>{abrirNaoRecebeu}</b> foi concluído com{" "}
            <strong>sucesso</strong>!
          </p>
          <button
            onClick={() => {
              fecharModal();
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  );
};

export default ListaDeUsuarios;
