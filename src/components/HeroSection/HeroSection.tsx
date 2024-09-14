import styled from 'styled-components';
import { images } from '../../helpers/images';
import Logo from '../../assets/img/Asset 1.png';

interface HeroSectionContainerProps {
  $bg?: string;
}

const breakpoints = {
  xxs: '400.98px',
  xs: '575.98px',
  sm: '767.98px',
  md: '991.98px',
  lg: '1199.98px',
  xl: '1600px',
};

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
`;

const HeroSectionContainer = styled.div<HeroSectionContainerProps>`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 700px;
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  top:0%;
  @media (min-width: ${breakpoints.md}) {
    background-position: top;
    height: 800px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 45%; /* Ajusta este valor para mover el contenedor más abajo */
  transform: translateY(-50%);
  margin: 0 auto;
  text-align: center;
  color: #f0f0f0;
  z-index: 2;
  @media (min-width: ${breakpoints.md}) {
    top: 52%;
  }
`;

const Date = styled.h2`
  color: #fff;
  font-family: 'Karla', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 100;
  letter-spacing: 3px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 2px solid #fff;
    margin: 0 10px;
    width: 70px;
    text-align:center;

  }
  @media (min-width: ${breakpoints.md}) {
    letter-spacing: 10px;
    &::before,
  &::after {
    content: '';
    width: 100px;
    margin: 0 20px 0 10px;
  }
  }
`;

const Subtitle = styled.h3`
  color: #fff;
  font-size: 45px;
  font-family: 'Cormorant Garamond', serif;
  margin: 5px 0;
  font-weight: 100 !important;
  @media (min-width: ${breakpoints.md}) {
    font-size: 60px;
    font-weight: 400 !important;
  }
`;

const Message = styled.p`
  color: #fff;
  font-weight: 200;
  font-size: 20px;
  letter-spacing: 1.5px;
`;

const StyledLogo = styled.img`
  width: 60px; /* Ajusta el tamaño del logo según tus necesidades */
  height: auto;
  margin: 20px auto;
  display: block;
`;

const HeroSection = () => {
  const mainImg = images[0];
  return (
    <HeroSectionContainer $bg={mainImg.src}>
      <Overlay></Overlay>
      <TextContainer data-aos="zoom-in">
        <StyledLogo src={Logo} />
        <Date>MIS XV'S</Date>
        <Subtitle>ALISON CHELSY</Subtitle>
        <Message>12.10.2025</Message>
      </TextContainer>
    </HeroSectionContainer>
  );
};

export default HeroSection;
