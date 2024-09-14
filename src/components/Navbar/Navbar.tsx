import "./styles.css";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

type ActiveSection =
  | ''
  | 'calendar'
  | 'itinerary'
  | 'dresscode'
  | 'where'
  | 'gifts'
  | 'rsvp'
  | 'gallery';

interface NavbarProps {
  activeSection: ActiveSection;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900.98);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900.98);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    if (isOpen) {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 0);
    } else {
      setScrolled(false);
    }
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItemClass = (section: ActiveSection) => 
    `pt-[2vh] ${activeSection === section ? 'active' : ''}`;

  return (
    <div className={`navbarContainer ${scrolled && !isOpen ? "scrolled" : ""}`}>
      {scrolled && (
        <div className="logoContainer z-30">
          <Link to="/" onClick={() => setIsOpen(false)} className="navbarText">
            ALISON<span className="font"></span>CHELSY
          </Link>
        </div>
      )}

      {isMobile ? (
        <>
          <div className="navbarToggle">
            <button
              className="z-30 transition-all duration-300"
              onClick={handleMenuToggle}
            >
              <div
                className={`relative h-5 w-7 transition-all duration-300 prueba ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-[white] transition-all duration-300 ${
                    isOpen ? "top-1/2 -translate-y-1/2 rotate-90 navbarToggleOpen" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-[2px] w-full bg-[white] -translate-y-1/2 transition-all duration-300 ${
                    isOpen ? "left-1/2 -translate-x-1/2 rotate-0 navbarToggleOpen" : "left-0"
                  }`}
                />
              </div>
            </button>
          </div>

          <CSSTransition
            in={isOpen}
            timeout={200}
            classNames="menu-transition"
            unmountOnExit
          >
            <div className="menu">
              <ul className="lista">
              
                <li className={navItemClass('calendar')}>
                  <button onClick={() => { scrollToSection('calendar'); setIsOpen(false); }}>
                    Calendario
                  </button>
                </li>
                <li className={navItemClass('gifts')}>
                  <button onClick={() => { scrollToSection('gifts'); setIsOpen(false); }}>
                    ¿Cuándo y Dónde?
                  </button>
                </li>
                <li className={navItemClass('rsvp')}>
                  <button onClick={() => { scrollToSection('rsvp'); setIsOpen(false); }}>
                    RSVP
                  </button>
                </li>
                <li className={navItemClass('gallery')}>
                  <button onClick={() => { scrollToSection('gallery'); setIsOpen(false); }}>
                    Galería
                  </button>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </>
      ) : ( 
        <div className="desktop-menu">
          <ul className="lista">
            <li className={navItemClass('calendar')}>
              <button onClick={() => scrollToSection('calendar')}>
                Calendario
              </button>
            </li>
            <li className={navItemClass('gifts')}>
              <button onClick={() => scrollToSection('gifts')}>
                ¿Cuándo y Dónde?
              </button>
            </li>
            <li className={navItemClass('rsvp')}>
              <button onClick={() => scrollToSection('rsvp')}>
                RSVP
              </button>
            </li>
            <li className={navItemClass('gallery')}>
              <button onClick={() => scrollToSection('gallery')}>
                Galería
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
