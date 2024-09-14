import React from "react";
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import "./styles.css"
interface Event {
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
}

interface iCalendarButtonProps {
  event: Event;
  buttonText: string;
}
const iCalendarButton: React.FC<iCalendarButtonProps> = () => {
  return (
    <div className="customButtonContainer"><AddToCalendarButton
    name="Mis XV's: Alison Chelsy"
  description="UNETE EN LA CELEBRACIÓN DE MIS XV AÑOS"
  startDate="2024-10-12"
  startTime="19:00"
  endDate="2024-10-13"
  endTime="02:00"
  timeZone="America/Mexico_City"
  location="Salon De Fiestas Y Eventos Sociales Las Rosas https://maps.app.goo.gl/tWTqwYatocB8fVyy9"
  options="'Apple','Google'"
  buttonStyle="3d"
  hideBackground
  hideCheckmark
  size="3"
  lightMode="light"
  language="es"
  label="AGREGAR AL CALENDARIO" 
  hideBranding="true"
  ></AddToCalendarButton></div>
    
  );
};

export default iCalendarButton;
