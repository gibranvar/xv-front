import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

interface Guest {
  name: string;
  tickets: number;
  telephone: string;
  attendance: boolean;
  confirmation_date: Date | null;
}

const GuestForm: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedName, setSelectedName] = useState<string>('');
  const [tickets, setTickets] = useState<number>(0);
  const [telephone, setTelephone] = useState<string>('');
  const [attendance, setAttendance] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [maxTickets, setMaxTickets] = useState<number>(0);
  const [telephoneError, setTelephoneError] = useState<string | null>(null);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://xv-alison-88bea15621b6.herokuapp.com/api/guests')
      .then(response => {
        setGuests(response.data);
        if (selectedName) {
          const guest = response.data.find((g: Guest) => g.name === selectedName);
          if (guest) {
            setTickets(guest.tickets);
            setTelephone(guest.telephone);
            setAttendance(guest.attendance);
            setIsSubmitted(guest.confirmation_date !== null);
            setMaxTickets(guest.tickets);
            setNotFoundMessage(null); // Clear not found message
          } else {
            setNotFoundMessage('Invitado no encontrado');
          }
        }
      })
      .catch(err => console.error(err));
  }, [selectedName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedName(value);

    if (value.length >= 3) {
      const filtered = guests.filter(g => g.name.toLowerCase().startsWith(value.toLowerCase()));
      setFilteredGuests(filtered);
      setNotFoundMessage(filtered.length === 0 ? 'Invitado no encontrado' : null);
    } else {
      setFilteredGuests([]);
      setNotFoundMessage(null);
    }
  };

  const handleNameSelect = (name: string) => {
    setSelectedName(name);
    const guest = guests.find(g => g.name === name);
    if (guest) {
      if (guest.confirmation_date !== null) {
        alert('Este invitado ya ha confirmado su asistencia. No se puede modificar.');
        setSelectedName('');
        setFilteredGuests([]);
        setError(null);
        setNotFoundMessage(null);
      } else {
        setTickets(guest.tickets);
        setTelephone(guest.telephone);
        setAttendance(guest.attendance);
        setIsSubmitted(false);
        setMaxTickets(guest.tickets);
        setFilteredGuests([]); // Limpiar opciones de nombres
        setNotFoundMessage(null);
      }
    } else {
      setNotFoundMessage('Invitado no encontrado');
    }
  };

  const handleTicketChange = (delta: number) => {
    setTickets(prevTickets => {
      const newTickets = prevTickets + delta;
      if (newTickets < 0) return 0;
      if (newTickets > maxTickets) return maxTickets;
      return newTickets;
    });
  };

  const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números
    if (/^\d*$/.test(value)) {
      setTelephone(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Validación de campos requeridos
    if (!telephone) {
      setTelephoneError('Teléfono requerido');
      hasError = true;
    } else {
      setTelephoneError(null);
    }

    if (attendance === null) {
      setAttendanceError('Asistencia requerida');
      hasError = true;
    } else {
      setAttendanceError(null);
    }

    if (hasError) return;

    if (isSubmitted) {
      setError('Este invitado ya ha confirmado su asistencia. No se puede modificar.');
      return;
    }

    axios.post('https://xv-alison-88bea15621b6.herokuapp.com/api/update-guest', {
      name: selectedName,
      tickets,
      telephone,
      attendance
    })
    .then(() => {
      alert('Formulario enviado correctamente');
      setIsSubmitted(true);
      // Clear inputs
      setSelectedName('');
      setTickets(0);
      setTelephone('');
      setAttendance(null);
      setError(null);
      setFilteredGuests([]); // Limpiar opciones después del envío
      setNotFoundMessage(null); // Limpiar mensaje de invitado no encontrado
    })
    .catch(err => {
      setError('Error al enviar el formulario: ' + (err.response?.data?.message || 'Error desconocido'));
    });
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <div className='name-container inputs-container'>
          <input
            type="text"
            value={selectedName}
            onChange={handleNameChange}
            placeholder="Nombre"
          />
          {filteredGuests.length > 0 && (
            <div className='guest-list-container'>
              <ul className='guests-list'>
                {filteredGuests.map((guest) => (
                  <li key={guest.name} onClick={() => handleNameSelect(guest.name)}>
                    {guest.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {notFoundMessage && <p className='error-message'>{notFoundMessage}</p>}
        </div>

        <div className='ticket-control inputs-container'>
          <button className='ticket-btn minus' type='button' onClick={() => handleTicketChange(-1)}>-</button>
          <span>{tickets}</span>
          <button className='ticket-btn plus' type='button' onClick={() => handleTicketChange(1)}>+</button>
        </div>
        <div className='tel-container inputs-container form-group'>
          <input
            type="tel"
            value={telephone}
            onChange={handleTelephoneChange}
            placeholder="Teléfono"
            className={telephoneError ? 'error' : ''}
          />
          {telephoneError && <p className='error-message'>{telephoneError}</p>}
        </div>
        <div className='attendance-container inputs-container'>
          <h5>Confirmación de Asistencia</h5>
          {attendanceError && <p className='error-message'>{attendanceError}</p>}
          <div className='attendace-label-container'>
            <label className='attendance-label'>
              <input
                className='attendance-option'
                type="radio"
                value="true"
                checked={attendance === true}
                onChange={() => setAttendance(true)}
              />
              Asistiré
            </label>
            <label className='attendance-label'>
              <input
                className='attendance-option'
                type="radio"
                value="false"
                checked={attendance === false}
                onChange={() => setAttendance(false)}
              />
              No asistiré
            </label>
          </div>
        </div>
        <div className='button-container inputs-container'>
          <button className='button-send' type="submit">ENVIAR</button>
          {error && <p className='error-message'>{error}</p>}
          <p className='ad-message'>CUALQUIER MODIFICACIÓN DEBE CONTACTAR AL ORGANIZADOR DEL EVENTO*</p>
        </div>
      </form>
    </div>
  );
};

export default GuestForm;
