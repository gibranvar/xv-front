import React from 'react';
import styled from 'styled-components';
import 'aos/dist/aos.css'; // Asegúrate de importar el CSS de AOS
import itineraryImg from '../../assets/img/itinerary.svg'
// Inicializa AOS dentro del componente o en index.tsx

const breakpoints = {
  xxs: '400.98px',
  xs: '575.98px',
  sm: '767.98px',
  md: '991.98px',
  lg: '1199.98px',
  xl: '1600px',
};

const ItinerarySection = styled.div`
  padding: 25px 0px;
  background-color: transparent;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

const SectionHeading = styled.div`
  text-align: center;
  margin-bottom: 40px;

  p {
    padding: 0 5vw;
    font-weight: 300;
text-align: center;
line-height: 23px;
margin: 30px 0;
white-space: pre-wrap;
  }
`;

const Timeline = styled.ul`
  list-style: none;
  padding: 0;
  position: relative;
  color: black;
  &::before {
    content: '';
    position: absolute;
    width: 1px;
    background-color: #ADA0F1;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (min-width: ${breakpoints.sm}) {
    margin: 0 12vw;
  }
`;

const TimelineItem = styled.li`
  position: relative;
  margin-bottom: 50px;
`;

const TimelinePanel = styled.div`
  padding: 15px;
  position: relative;
  background: #F6F4EE;
  border: 10px solid #F6F4EE; /* Border color (brown) */
  box-shadow: 0 1px 3px rgba(0,0,0,0.4);
  position: relative;
  z-index: 1;

  /* Add an outline with a pseudo-element */
  &::after {
    content: '';
    position: absolute;
    top: -10px; /* Adjust offset from the border */
    left: -10px; /* Adjust offset from the border */
    right: -10px; /* Adjust offset from the border */
    bottom: -10px; /* Adjust offset from the border */
     /* Outline color (black) */
    z-index: -1; /* Place the outline behind the panel */
  }
`;

const TimelineHeading = styled.div`
  margin-bottom: 10px;

  .timeline-title {
    margin-top: 0;
    font-size: 30px;
    font-family: 'Cormorant Garamond', serif;
    line-height: 35px;
    @media (max-width: ${breakpoints.xs}) {
    font-size: 24px;
    color: #E0CEE3;
    font-weight: 600;
  }
  @media (min-width: ${breakpoints.md}) {
    font-size: 30px;
  }
  }

  .date {
    display: block;
    margin-left:5px;    
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;  
    font-weight: 100;
    white-space: break-spaces;
    @media (max-width: ${breakpoints.xs}) {
    font-size: 14px;
    }
    
  }
`;

const TimelineBody = styled.div`
  p {
    margin: 0;
    font-size: 18px;
    font-weight: 200;
  }
`;
const Title = styled.h1`
  font-size: 9vw;
  font-weight: lighter;
  @media (max-width: ${breakpoints.xs}) {
    font-size: 12vw;
  }
  @media (min-width: ${breakpoints.md}) {
    font-size: 7vw;
  }
`;

const items = [
  { title: 'Mis Papás', time: `Mario Armando Vázquez García\nBertha Díaz Alberto`, location: '' },
  { title: 'Mis Madrinas', time: `Graciela Vázquez García\nAide Martínez Vázquez`, location: '' },
];

const Itinerary: React.FC = () => {
  return (
    <ItinerarySection id="qbootstrap-story" data-section="story">
      <Container>
        <SectionHeading>
          <Title>¡Gracias!</Title>
          <p>¡Hace 15 años Dios me bendijo con la vida y una familia maravillosa. <br/>Acompáñanos a celebrar juntos mis XV años</p>
        </SectionHeading>
        <Timeline>
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              data-aos={index % 1 === 0 ? 'flip-left' : 'flip-right'}
              
              data-aos-duration="1000"
            >
              <TimelinePanel>
                <TimelineHeading>
                  <h3 className="timeline-title">{item.title}</h3>
                  <span className="date">{item.time}</span>
                </TimelineHeading>
                <TimelineBody>
                  <p>{item.location}</p>
                </TimelineBody>
              </TimelinePanel>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </ItinerarySection>
  );
};

export default Itinerary;
