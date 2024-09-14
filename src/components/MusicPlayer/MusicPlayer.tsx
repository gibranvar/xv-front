import React, { useState, useRef, useEffect } from 'react';
import styled from "styled-components"
// Lista de canciones en la carpeta 'public/music'
const songs = [
  '/music/1.mp3',
];
const MusicPlayer: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<string>(songs[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    // Seleccionar una canción aleatoria
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    setCurrentSong(randomSong);

    // Intentar reproducir la canción automáticamente
    if (audioRef.current) {
      audioRef.current.src = currentSong;
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch((error) => {
        
      });
    }
  }, [currentSong]);

  const handleUserInteraction = () => {
    // Esta función se llama al interactuar con la página
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  useEffect(() => {
    // Esperar la interacción del usuario para comenzar a reproducir
    window.addEventListener('click', handleUserInteraction, { once: true });
    return () => window.removeEventListener('click', handleUserInteraction);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setPlaying(true);
        }).catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  return (
    <ButtonAudio>
      <Audio ref={audioRef} />
      <Button onClick={togglePlay}>
        {playing ? "🔇" : '🔊'}
      </Button>
    </ButtonAudio >
  );
};

export default MusicPlayer;

const ButtonAudio = styled.div`
  position: fixed;
width: 46px;
height: 46px;
bottom: 25px;
right: 25px;
background-color: rgba(0, 0, 0, 0.1);
color: #FFF;
border-radius: 50px;
border: transparent;
text-align: center;
/* align-items: center; */
justify-content: center;
vertical-align: middle;
font-size: 30px;
text-indent: 3px;
box-shadow: 2px 2px 3px #999;
z-index: 100;
`
const Audio = styled.audio`
`
const Button = styled.button`
`