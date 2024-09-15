import React from 'react';
import styled from 'styled-components';
import Button, { ButtonProps } from '../Button/Button';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

interface CardProps {
    title?: string;
    subtitleDescription?: string;
    onButtonClick?: () => void;
    subtitle?: string;
    description?: string;
    quote?: string;
    buttonText?: string;
    buttonProps?: ButtonProps;
    textColor?: string;
    hoverTextColor?: string;
    hoverBgColor?: string;
    backgroundColor?: string;
    outlineColor?: string;
    hoverOutlineColor?: string;
    $titleSize?: string;
    IconComponent?: IconType;
    date?: string;
    showButton?: boolean;
    showTitleContainer?: boolean; // Nueva propiedad para controlar la visibilidad del CardTitleContainer
}

const breakpoints = {
    xxs: '400.98px',
    xs: '575.98px',
    sm: '767.98px',
    md: '991.98px',
    lg: '1199.98px',
    xl: '1600px',
};

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CardTitleContainer = styled.div`
    margin-top: 70px;
`;

const CardTitle = styled.h1`
    font-size: 9vw;
  font-weight: lighter;
  text-align: center;
  line-height: 60px;
  @media (max-width: ${breakpoints.xs}) {
    font-size: 12vw;
  }
  @media (min-width: ${breakpoints.md}) {
    font-size: 6vw;
  }
`;

const CardSubtitleDescription = styled.p`
    font-weight: 300;
    text-align: center;
    line-height: 23px;
    margin: 30px 0;
    white-space: pre-wrap;
    @media (min-width: ${breakpoints.md}) {
        margin: 30px 70px;
    }
`;

const CardBottom = styled.div`
    padding: 45px;
    background: #F6F4EE;
    position: relative;
    z-index: 0;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    @media (max-width: ${breakpoints.xxs}) {
        padding: 25px;
    }
    &::after {
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: 10px;
        right: 10px;
        content: '';
        background: #f6f4ee;
        z-index: -1;
    }
`;

const CardSubtitle = styled.h2`
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 35px;
    color: #D7C8EF;
    font-family: 'Cormorant Garamond', serif;
    white-space:break-spaces;
    font-weight: 600;
    line-height: 40px;
    @media (max-width: ${breakpoints.xs}) {
        font-size: 6.5vw;
    }
    @media (min-width: ${breakpoints.md}) {
        font-size: 3.2vw;
    }
`;

const CardDescription = styled.p`
    font-weight: 250;
    text-align: center;
    font-size: 18px;
    color: #1c1914;
    white-space: pre-wrap;
`;

const CardTextContainer = styled.div`
    .align-card {
        align-items: center;
        display: flex;  
        flex-direction: column;
        color: black;
    }

    .card-description {
        margin-top: 5px;
        margin-bottom: 10px;
        text-transform: uppercase;
        font-weight: 100;
        line-height: 20px;
        font-size: 16px;
        letter-spacing: 2.5px;
        white-space: pre-wrap;
    }
`;

const CardQuote = styled.p`
    margin-bottom: 20px;
    font-weight: 600;
    text-transform: uppercase !important;
    font-size: 18px;
`;

const ButtonCard = styled.div`
    align-items: center;
    margin: 20px 12vw 0 12vw;
    @media (max-width: ${breakpoints.xxs}) {
        margin: 20px 8vw 0 8vw;
    }
    @media (min-width: ${breakpoints.md}) {
        margin: 20px 20vw 0 20vw;
    }
`;

const Card: React.FC<CardProps> = ({
    title,
    subtitleDescription,
    subtitle,
    description,
    quote,
    buttonProps,
    buttonText,
    textColor,
    hoverTextColor,
    hoverBgColor,
    backgroundColor,
    outlineColor,
    hoverOutlineColor,
    onButtonClick,
    IconComponent = CalendarDaysIcon,
    date,
    showButton = true,
    showTitleContainer = true, // Valor por defecto que muestra el contenedor del título
}) => {
    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }
    };

    return (
        <CardContainer>
            {/* Condicional para mostrar u ocultar el contenedor del título */}
            {showTitleContainer && (
                <CardTitleContainer>
                    <CardTitle data-aos="fade-up" className='title-card'>{title}</CardTitle>
                    <CardSubtitleDescription data-aos="fade-up">
                        {subtitleDescription}
                    </CardSubtitleDescription>
                </CardTitleContainer>
            )}

            <CardBottom data-aos="fade-up">
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardTextContainer>
                    <div className="align-card">
                        <IconComponent className="size-5 text-black" />
                        {date && <p className="card-description">{date}</p>}
                    </div>
                    <CardDescription>{description}</CardDescription>
                </CardTextContainer>

                {showButton && (
                    <ButtonCard>
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
                    </ButtonCard>
                )}

                {quote && <CardQuote>{quote}</CardQuote>}
            </CardBottom>
        </CardContainer>
    );
};

export default Card;
