
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { imageUrls } from '../../helpers/images';

interface ModalGalleryProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalGallery: React.FC<ModalGalleryProps> = ({
  isOpen,
  onRequestClose,
}) => {
    const imgFiltered = imageUrls.slice(0, 14)
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnailsContainer = thumbnailsRef.current;
      const selectedThumbnail = thumbnailsContainer.children[currentIndex] as HTMLImageElement;

      // Calcular el ancho visible y el ancho de la miniatura seleccionada
      const containerWidth = thumbnailsContainer.clientWidth;
      const thumbnailWidth = selectedThumbnail.offsetWidth;
      
      // Calcular la posición para centrar la miniatura seleccionada
      const scrollToX = selectedThumbnail.offsetLeft - (containerWidth - thumbnailWidth) / 2;
      
      // Aplicar el desplazamiento suavemente
      thumbnailsContainer.scrollTo({
        left: scrollToX,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgFiltered.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imgFiltered.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onRequestClose}>×</CloseButton>
        <ImageWrapper>
          <ArrowButton left onClick={handlePrevClick}>
            &lt;
          </ArrowButton>
          <ModalImage src={imgFiltered[currentIndex]} alt="Gallery Image" />
          <ArrowButton right onClick={handleNextClick}>
            &gt;
          </ArrowButton>
        </ImageWrapper>
        <ThumbnailsWrapper ref={thumbnailsRef}>
          {imgFiltered.map((src, index) => (
            <Thumbnail
              key={index}
              src={src}
              isSelected={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </ThumbnailsWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -25px;
  right: 5px;
  background: none;
  border: none;
  font-size: 52px;
  cursor: pointer;
  z-index: 1;
  color: #D7C8EF;
  font-weight: 300;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
`;

const ArrowButton = styled.button<{ left?: boolean; right?: boolean }>`
    color: #D7C8EF;
  background: none;
  border: none;
  font-size: 50px;
  font-weight: 300;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ left }) => (left ? 'left: -25px;' : 'right: -25px;')}
`;

const ThumbnailsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  overflow-x: auto;
`;

const Thumbnail = styled.img<{ isSelected: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin: 0 5px;
  cursor: pointer;
  border: ${({ isSelected }) =>
    isSelected ? '2px solid #000' : '2px solid transparent'};
`;

export default ModalGallery;
