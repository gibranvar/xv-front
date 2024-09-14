declare module 'react-calendar-link' {
  import { FC } from 'react';

  interface Event {
    title: string;
    start: string | Date;
    end: string | Date;
    description?: string;
    location?: string;
  }

  interface CalendarLinkProps {
    label: string;
    event: Event;
    style?: React.CSSProperties;
    children: (props: { onClick: () => void }) => JSX.Element; // Asegúrate de incluir esta línea
  }

  export const CalendarLink: FC<CalendarLinkProps>;
}
