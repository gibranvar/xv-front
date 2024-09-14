import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  display: flex;
  .img {
    width: 150px;
  }
  h1{
    font-size: 55px;
  }
`;

const EnterButton = styled.button`
  padding: 15px 25px;
  font-size: 16px;
  cursor: pointer;
  background-color: #D7C8EF;
  color: white;
  border: none;
  border-radius: 5px;
  position: relative;
  z-index: 1;
  &:hover {
    background-color: black;
    color: white;
  }
  font-size: 20px;
  font-weight:700;
`;

const LoadingView: React.FC = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);


  const handleClick = () => {
    setTimeout(() => {
      navigate('/home'); // Cambia '/home' a la ruta a la que quieres redirigir
    }); // Asegúrate de que el tiempo coincida con la duración de la animación
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000); // Tiempo en milisegundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <Overlay>
      <LoadingContent>
        {!showButton ? (
          <img className='img' src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXJibjVoaG54cmR4dXFjam03bW00MjZyOXVsaXVrdGdkZnZybXpsNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/nuVOFZ2P6m7ou4JrLy/giphy.gif" alt="Loading" />
        ) : (
          <div>
            <EnterButton onClick={handleClick}>Entrar</EnterButton>
          </div>
        )}
      </LoadingContent>
    </Overlay>
  );
};

export default LoadingView;
