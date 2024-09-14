import { FC, ButtonHTMLAttributes } from "react";
import styled from "styled-components";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  $color?: string;
  $outlineColor?: string;
  $hoverTextColor?: string;
  $hoverBgColor?: string;
  $backgroundColor?: string;
  $hoverOutlineColor?: string;
  onButtonClick?: () => void;
}

const breakpoints = {
  xxs: '400.98px',
  xs: '575.98px',
  sm: '767.98px',
  md: '991.98px',
  lg: '1199.98px',
  xl: '1600px',
};

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: auto;
  font-family: "DM Sans";
  font-weight: 500;
  font-size: 0.8rem;
  text-align: center;
  color: ${(props) => props.$color || '#1c1914'};
  background-color: ${(props) => props.$backgroundColor || 'transparent'};
  border: 1px solid ${(props) => props.$outlineColor || '#F2EDE7'};
  padding: 20px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 1.2s ease, color 1.2s ease;

  @media (max-width: ${breakpoints.xxs}) {
    padding: 15px 20px;
    font-size: 0.7rem;
  }

  &:hover {
    background-color: ${(props) => props.$hoverBgColor || props.$backgroundColor || 'initial'};
    color: ${(props) => props.$hoverTextColor || props.$color || 'initial'};
    border: 1px solid ${(props) => props.$hoverOutlineColor};
  }
`;

const Button: FC<ButtonProps> = ({
  label,
  type = 'button',
  $color,
  $outlineColor,
  $hoverTextColor,
  $backgroundColor,
  $hoverBgColor,
  $hoverOutlineColor,
  onButtonClick,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      $color={$color}
      $outlineColor={$outlineColor}
      $hoverTextColor={$hoverTextColor}
      $backgroundColor={$backgroundColor}
      $hoverBgColor={$hoverBgColor}
      $hoverOutlineColor={$hoverOutlineColor}
      onClick={onButtonClick}
      {...rest}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
