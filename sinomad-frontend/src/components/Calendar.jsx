import React, { useState, useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';

function Calendar({ selectedDate, setSelectedDate }) {
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/available-dates');
        const dates = response.data.map((date) => dayjs(date));
        setAvailableDates(dates);
      } catch (error) {
        console.error('获取可选日期失败:', error);
      }
    };

    fetchAvailableDates();
  }, []);

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const isDateAvailable = (date) => {
    return availableDates.some((availableDate) => availableDate.isSame(date, 'day'));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <DatePicker
          label="Sinomad Trip"
          value={selectedDate}
          onChange={handleDateChange}
          shouldDisableDate={(date) => !isDateAvailable(date)}
        />
      </div>
    </LocalizationProvider>
  );
}

export default Calendar;
