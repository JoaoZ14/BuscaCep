import React from "react";
import styled from "styled-components";

const DivPrincipal = styled.div`
  width: 100%;
`;

const DivImage = styled.div`
  position: relative; /* Contêiner principal para posicionamento relativo */

  .overlay {
    position: absolute; /* Camada preta translúcida */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5); /* Cor preta com transparência */
    z-index: 1; /* Fica acima da imagem, mas abaixo do texto */
  }

  .textback {
    position: absolute; /* Permite sobrepor o texto */
    top: 50%; /* Centraliza verticalmente */
    left: 50%; /* Centraliza horizontalmente */
    transform: translate(-50%, -50%); /* Ajuste de alinhamento */
    color: #00162A; /* Cor do texto */
    font-size: 40px; /* Tamanho do texto */
    font-weight: bold; /* Texto em negrito */
    text-align: center; /* Centraliza o texto */
    z-index: 2; /* Certifica-se de que o texto fique acima da imagem e da overlay */
  }

  img {
    width: 100%;
    height: 100%;
    z-index: 0; /* A imagem fica no plano de fundo */
    filter: grayscale(0.5) blur(3px);
    opacity: calc(60%);
  }
`;

const LandingPage = () => {
  return (
    <DivPrincipal>
      <DivImage>
        <img src="Casa2.jpg" alt="Casa" />
        <div className="overlay"></div> {/* Camada preta translúcida */}
        <div className="textback">
          Bem-vindo ao Ponto Lar <br /> Encontre o lar dos seus sonhos
        </div>
      </DivImage>
    </DivPrincipal>
  );
};

export default LandingPage;
