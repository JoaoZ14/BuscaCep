import React from "react";
import styled from "styled-components";

const Navigation = styled.div`
  position: fixed;
  height: 70px;
  display: flex;
  justify-content: space-around;
  width: 100vw;
  align-items: center;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.2); /* Fundo translúcido aplicado diretamente */
  backdrop-filter: blur(10px); /* Efeito de desfoque para dar mais estilo */
`;

const Logo = styled.div`
  img {
    width: 150px;
    z-index: 1000; /* Certifique-se de que a logo está acima */


  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: black;
    font-size: 20px;
    z-index: 1000; /* Certifique-se de que os botões estão acima */
  }
`;

const NavBar = () => {
  return (
    <Navigation>
      <Logo>
        <img src="Lar (362 x 180 px).png" alt="Logo" />
      </Logo>
      <Buttons>
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </Buttons>
    </Navigation>
  );
};

export default NavBar;
