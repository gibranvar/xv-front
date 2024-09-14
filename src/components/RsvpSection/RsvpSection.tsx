
import styled from "styled-components";

const breakpoints = {
    xxs: '400.98px',
    xs: '575.98px',
    sm: '767.98px',
    md: '991.98px',
    lg: '1199.98px',
    xl: '1600px',
};

import GuestForm from "../GuestForm/GuestForm";
interface RsvpSectionProps {
    title?: string;
    subtitle?: string;
}
const RsvpSectionContainer = styled.div`
    margin-top: 80px;
    background-image: url("https://live.staticflickr.com/65535/53993207773_5e9b3cb02a_k.jpg");
    color: white;
    background-size: cover;
    background-position-x: center ;
    background-position-y:  center ;
    background-repeat: no-repeat;
    padding: 50px 14vw;
    text-align: center;
    position: relative;
    @media (min-width: ${breakpoints.lg}) {
        background-position-x: center !important;
        background-position-y:  -560px !important;
    }
    
`
const RsvpSectionTitle = styled.h1`
    
`

const RsvpSectionSubtitle = styled.p`
    margin: 20px 0 25px 0;
    font-size:18px;
    font-weight: 300;
    z-index: 2;
    position: relative;
`
const RsvpSectionDescription= styled.p`
    margin-bottom: 35px;
    font-size: 15px;
    font-weight: 200;
    z-index: 2;
    position: relative;
    white-space: pre-wrap;
    text-align: justify;
    strong{
        font-weight: bold;
        text-decoration: underline;
    }
    em{
        font-weight: bold;
    }
    @media (min-width: ${breakpoints.sm}) {
        font-size: 14px;
        margin: 0 50px;
        width: 80%;
        margin: 0 auto;
        text-align: center;
    }
`
const FormContainer= styled.div`
    margin: 0;
    z-index: 2;
    position: relative;
    @media (min-width: ${breakpoints.sm}) {
        width: 65%;
        justify-content: center;
        align-items: center;
        margin:0 auto;

    }
    
`
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.38);
`;
const RsvpSection: React.FC<RsvpSectionProps> = ({
    title, 
}) =>{
    return(
        <RsvpSectionContainer>
             <Overlay/>
            <RsvpSectionTitle className="title-rsvp">{title}</RsvpSectionTitle>
            <RsvpSectionSubtitle>¡Queremos compartir este momento tan esperado contigo! <br />
            <span>Por favor ayúdanos confirmando tu asistencia antes del <strong>1 Marzo de 2025.</strong></span>  </RsvpSectionSubtitle>
            <RsvpSectionDescription><br />Escribe las <strong>primeras 3 letras</strong> de tu nombre y da clic en la sugerencia que aparecerá desplegada. Si  te asignaron boletos para acompañantes, el número se completará automáticamente. Puedes <em>mantener o reducir</em> la cantidad de invitados que asistirán contigo (ajusta esta cantidad a 0 si prefieres no llevar acompañantes). Antes de dar clic en "ENVIAR", verifica que todo este correcto, ya que una vez enviado no se podrá modificar. </RsvpSectionDescription>
            <FormContainer>
                <GuestForm/>
            </FormContainer>
        </RsvpSectionContainer>
    );
}
export default RsvpSection