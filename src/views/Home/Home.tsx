import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import Card from '../../components/Card/Card';
import CalendarSection from '../../components/CalendarSection/CalendarSection';
import HeroSection from '../../components/HeroSection/HeroSection';
import GallerySection from '../../components/Carousel/Carousel';
import Itenerary from '../../components/Itinerary/Itinerary';
import Navbar from '../../components/Navbar/Navbar';
import { CalendarDaysIcon, GiftIcon, ClockIcon, CakeIcon } from '@heroicons/react/24/outline';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Footer from '../../components/Footer/Footer';
import RsvpSection from '../../components/RsvpSection/RsvpSection';
const breakpoints = {
  xxs: '400.98px',
  xs: '575.98px',
  sm: '767.98px',
  md: '991.98px',
  lg: '1199.98px',
  xl: '1600px',
};

const Intro = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 725px;
  padding-bottom: 1.130em;
  text-align: center;
  margin: 55px 0;
  @media (min-width: ${breakpoints.md}) {
    padding-left: 20vw;
    padding-right: 20vw;
    padding-top: 790px;
    padding-bottom: 0px;
  }
`;

const IntroDescription = styled.p`
  font-weight: 300;
text-align: center;
line-height: 23px;
white-space: pre-wrap;
`;

const DresscodeContainer = styled.div`
  margin: 10px 20px;
  
  .dresscode-title {
   
}
  
  .dresscode-subtitle {
    text-align: center;
    font-weight: 250;
    font-size: 25px;
    margin: 15px 0;
    @media (max-width: ${breakpoints.xs}) {
    font-size: 5vw;
    margin: 0;
  }
  @media (min-width: ${breakpoints.md}) {
    font-size: 2.5vw;
  }
  }
  
  .dresscode-img-container {
    margin: 20px 15px 0 15px;
    justify-content: center;
    align-self:center;

  }
  .dresscode-img{
    @media (min-width: ${breakpoints.xs}) {
    width: 70%;
    margin: 0 auto;
  }
    @media (min-width: ${breakpoints.md}) {
    width: 30%;
    margin: 0 auto;
  }
  }
  .dresscode-description {
    font-weight: 200;
    font-size: 12px;
    margin: 0 15px;
    @media (min-width: ${breakpoints.md}) {
    text-align:center;
    font-size: 13px;
  }
  }
`;

const FAQ = styled.div`
  margin: 15px 18px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (min-width: ${breakpoints.md}) {
    margin: 15px 18vw 50px 18vw;
    gap: 40px;
  }
`
type ActiveSection =
  | ''
  | 'calendar'
  | 'itinerary'
  | 'dresscode'
  | 'where'
  | 'gifts'
  | 'rsvp'
  | 'gallery';

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('');
  // Referencias a las secciones para Intersection Observer
  const sectionsRef = useRef<{
    calendar: HTMLDivElement | null;
    itinerary: HTMLDivElement | null;
    dresscode: HTMLDivElement | null;
    where: HTMLDivElement | null;
    gifts: HTMLDivElement | null;
    rsvp: HTMLDivElement | null;
    gallery: HTMLDivElement | null;
  }>({
    calendar: null,
    itinerary: null,
    dresscode: null,
    where: null,
    gifts: null,
    rsvp: null,
    gallery: null,
  });

  // Configuración del Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as ActiveSection);
          }
        });
      },
      { threshold: 0.5 } // Cambia el umbral según sea necesario
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const openMap = () => {
    window.open('https://maps.app.goo.gl/zW9fh5bwMd1ZMwCU8', '_blank', 'noopener,noreferrer');
  };

  const openMap1 = () => {
    window.open('https://maps.app.goo.gl/SeGRKZKf6hcBjU7B9', '_blank', 'noopener,noreferrer');
};

  return (
      <div>
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <Intro data-aos="zoom-in-up"
     data-aos-offset="800">
        <IntroDescription >
          Hay eventos en la vida que son muy especiales por sí solos, pero poder compartirlos con quienes más queremos, los convierte en momentos únicos e inolvidables.
        </IntroDescription>
        <br />
        <IntroDescription>¡Te espero en mis XV años!</IntroDescription>
      </Intro>
      <div id='calendar' ref={(el) => (sectionsRef.current.calendar = el)}>
        <CalendarSection
          title="Nuestro día"
          buttonText="AGREGAR AL CALENDARIO"
          textColor="#1c1914"
          backgroundColor="#F2EDE7"
          hoverBgColor="transparent"
          hoverOutlineColor="#F2EDE7"
          hoverTextColor="#F2EDE7"
        />
      </div>
      <div id='itinerary' ref={(el) => (sectionsRef.current.itinerary = el)}>
        <Itenerary />
      </div>
      <FAQ id="gifts"  ref={(el) => (sectionsRef.current.gifts = el)}>
        <div  id='church'>
          <Card
            title="¿Cuándo y Dónde?"
            date={`18:00 pm`}
            subtitleDescription="A continuación encontrarás el horario y ubicación de mis XV's, así como un botón directo a Google Maps para que te sea más fácil llegar al lugar."
            subtitle={`Parroquia de Nuestra\nSeñora de Guadalupe`}
            description="Tacubaya 74, Metropolitana 3ra Secc, 57750 CD. Nezahualcóyotl, EDOMEX."
            buttonText="VER UBICACIÓN"
            hoverBgColor="transparent"
            textColor="#F2EDE7"
            backgroundColor="#1c1914"
            hoverTextColor="#1c1914"
            hoverOutlineColor="#1c1914"
            IconComponent={ClockIcon}
            onButtonClick={openMap}
          />
          </div>
          <div  id='party' ref={(el) => (sectionsRef.current.gifts = el)}>
            <Card
              showTitleContainer={false}
              date={`19:00 pm`}
              subtitleDescription="A continuación encontrarás el horario y ubicación de mis XV's, así como un botón directo a Google Maps para que te sea más fácil llegar al lugar."
              subtitle={`Salon De Fiestas\n"Las Rosas"`}
              description="Laureano Estudillo 185, Santa Martha Acatitla, 09140, Iztapalapa, CDMX"
              buttonText="VER UBICACIÓN"
              hoverBgColor="transparent"
              textColor="#F2EDE7"
              backgroundColor="#1c1914"
              hoverTextColor="#1c1914"
              hoverOutlineColor="#1c1914"
              IconComponent={CakeIcon}
              onButtonClick={openMap1}
            />
          </div>
        </FAQ> 

      <div id="rsvp" ref={(el) => (sectionsRef.current.rsvp = el)}>
        <RsvpSection 
        title='RSVP'
        />
      </div> 
      <div id='gallery' ref={(el) => (sectionsRef.current.gallery = el)}>
        <GallerySection
          buttonText="VER MÁS"
          hoverBgColor="transparent"
          textColor="#F2EDE7"
          backgroundColor="#1c1914"
          hoverTextColor="#1c1914"
          hoverOutlineColor="#1c1914"
        />
      </div>
      <MusicPlayer />
      <Footer />
      </div>
      )}

export default Home;
