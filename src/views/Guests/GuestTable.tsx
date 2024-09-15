import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './styles.css';

interface Guest {
  name: string;
  tickets: number;
  telephone: string;
  attendance: boolean;
  confirmation_date: Date | null;
}

const GuestTable: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filter, setFilter] = useState<'all' | 'attending' | 'notAttending'>('all');

  useEffect(() => {
    axios.get('https://xv-alison-88bea15621b6.herokuapp.com/api/guests')
      .then(response => {
        setGuests(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDownloadExcel = () => {
    const filteredGuests = guests
      .filter(guest => {
        if (filter === 'attending') return guest.attendance;
        if (filter === 'notAttending') return guest.attendance === false;
        return true;
      })
      .map(guest => ({
        ...guest,
        confirmation_date: guest.confirmation_date ? new Date(guest.confirmation_date).toLocaleDateString() : 'N/A',
      }));

    const worksheet = XLSX.utils.json_to_sheet(filteredGuests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Guests');
    XLSX.writeFile(workbook, 'guest_list.xlsx');
  };

  const filteredGuests = guests.filter(guest => {
    if (filter === 'attending') return guest.attendance;
    if (filter === 'notAttending') return guest.attendance === false;
    return true;
  });

  return (
    <div className='table-container'>
      <div className='filter-container'>
        <label>
          <input
            type='radio'
            value='all'
            checked={filter === 'all'}
            onChange={() => setFilter('all')}
          />
          Todos
        </label>
        <label>
          <input
            type='radio'
            value='attending'
            checked={filter === 'attending'}
            onChange={() => setFilter('attending')}
          />
          Asistirán
        </label>
        <label>
          <input
            type='radio'
            value='notAttending'
            checked={filter === 'notAttending'}
            onChange={() => setFilter('notAttending')}
          />
          No asistirán
        </label>
      </div>
      <table className='guest-table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Boletos</th>
            <th>Teléfono</th>
            <th>Asistencia</th>
            <th>Fecha de Confirmación</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map((guest, index) => (
            <tr key={index}>
              <td>{guest.name}</td>
              <td>{guest.tickets}</td>
              <td>{guest.telephone}</td>
              <td>{guest.attendance ? 'Asistirá' : 'No asistirá'}</td>
              <td>{guest.confirmation_date ? new Date(guest.confirmation_date).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='download-btn' onClick={handleDownloadExcel}>Descargar Excel</button>
    </div>
  );
};

export default GuestTable;
