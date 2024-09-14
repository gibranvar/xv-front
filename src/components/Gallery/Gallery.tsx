import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  images: string[];
  selectedIndices: number[]; // Nueva prop para especificar qué imágenes mostrar
}

const breakpoints = {
  xxs: '380.98px',
  xs: '575.98px',
  sm: '767.98px',
  md: '991.98px',
  lg: '1199.98px',
  xl: '1600px',
};

const Container = styled.div`
  height: auto; /* Altura para permitir el scroll */
  position: relative;
  overflow-y: scroll; /* Permitir el scroll */
  margin: 35px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div<{ alignLeft: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.alignLeft ? 'flex-start' : 'flex-end')};
  width: 100%;
`;

const Image = styled.img`
  width: 70%; /* Ajusta el tamaño de las imágenes según sea necesario */
  height: 100%;
  object-fit: cover;
  margin: 5px 0;
  
  @media (max-width: ${breakpoints.xxs}) {
    width: 45%;
  }
`;

const DynamicComponent: React.FC<Props> = ({ title, images, selectedIndices }) => {
  // Filtra las imágenes basándote en los índices seleccionados
  const filteredImages = selectedIndices.map(index => images[index]);

  return (
    <Container>
      <Content>
        {filteredImages.map((src, index) => (
          <ImageContainer key={index} alignLeft={index % 2 === 0}>
            <Image src={src} alt={`image-${index}`} />
          </ImageContainer>
        ))}
      </Content>
    </Container>
  );
};

export default DynamicComponent;
