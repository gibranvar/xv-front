import React, { useState } from 'react';
import Button, { ButtonProps } from "../Button/Button";
import EmblaCarousel from "../EmblaCarousel/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import styled from 'styled-components'; 
import "./embla.css";
import { imageUrls } from "../../helpers/images";
import ModalGallery from "../ModalGallery/ModalGallery";
import galleryImg from '../../assets/img/gallery.svg'

const breakpoints = {
  xxs: '400.98px',
  xs: '575.98px',
  sm: '767.98px',
  md: '991.98px',
  lg: '1199.98px',
  xl: '1600px',
};
interface GalleryProps {
  title?: string;
  onButtonClick?: () => void;
  buttonText?: string;
  buttonProps?: ButtonProps;
  textColor?: string;
  hoverTextColor?: string;
  hoverBgColor?: string;
  backgroundColor?: string;
  outlineColor?: string;
  hoverOutlineColor?: string;
}

const OPTIONS: EmblaOptionsType = { loop: true };

const GallerySection: React.FC<GalleryProps> = ({
  buttonText,
  buttonProps,
  textColor,
  hoverTextColor,
  hoverBgColor,
  backgroundColor,
  outlineColor,
  hoverOutlineColor,
  onButtonClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carousel, setCarousel] = useState<any>(null); // Referencia al carrusel
  
  const imgFiltered = imageUrls.slice(2, 6)
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    setIsModalOpen(true);
    if (carousel) {
      carousel.stop(); // Detener el carrusel
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (carousel) {
      carousel.start(); // Reanudar el carrusel
    }
  };

  return (
    <GalleryWrapper>
      <GalleryTitleContainer>
        <GalleryTitle className="title-gallery">Galería</GalleryTitle>
        </GalleryTitleContainer>
      <ImageWrapper>
        <EmblaCarousel 
          images={imgFiltered} 
          options={OPTIONS} 
          setCarousel={setCarousel} // Pasar el setter de referencia del carrusel
        />
      </ImageWrapper>
      <ButtonContainer>
        <Button
          {...buttonProps}
          label={buttonText}
          $hoverBgColor={hoverBgColor}
          $color={textColor}
          $hoverTextColor={hoverTextColor}
          $backgroundColor={backgroundColor}
          $outlineColor={outlineColor}
          $hoverOutlineColor={hoverOutlineColor}
          onClick={handleButtonClick}
        />
      </ButtonContainer>
      <ModalGallery
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}

      />
    </GalleryWrapper>
  );
};

const GalleryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 25px 0;
  background-color: transparent;
`;

const GalleryTitleContainer = styled.div`
  z-index: 1;
  margin-top: 50px;
`;

const GalleryTitle = styled.h1`
  font-size: 9vw;
  font-weight: lighter;
  @media (max-width: ${breakpoints.xs}) {
    font-size: 12vw;
  }
  @media (min-width: ${breakpoints.md}) {
    font-size: 6vw;
  }
  position: absolute;
  line-height: 60px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 0;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  max-width: 250px;
  min-width: 150px;
  margin: 20px 0;
  @media (min-width: ${breakpoints.md}) {
    min-width: 120px;
    margin: 5px 0;
  }
`;

export default GallerySection;
