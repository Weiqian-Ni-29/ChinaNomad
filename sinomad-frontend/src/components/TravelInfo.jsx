import React, { useState } from 'react';
import ClientNumberPicker from './ClientNumberPicker';
import Calendar from './Calendar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function BookingForm() {
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // 日期和剩余人数检查通过后跳转到付款页面
  const handleJumpPaymentPage = (event) => {
    // event.stopPropagation();
    navigate('/Payment');
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert('Please choose a date before submission');
      return;
    }
    if (!selectedNumber) {
      alert('Please select the number of travelers before submission');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.format('YYYY-MM-DD'),
          numberOfTravelers: selectedNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        handleJumpPaymentPage();
        // alert(`Server response: ${data.message}`);

      } else {
        alert('Booking submission failed, please try again');
      }
    } catch (error) {
      console.error('Error while submitting the booking:', error);
      alert("Something's wrong, please try again.");
    }
  };

  return (
    <div>
      <ClientNumberPicker
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
      />
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Button
        variant="contained"
        style={{ backgroundColor: 'bisque', color: 'black', marginTop: '20px' }}
        onClick={handleSubmit}
      >
        Check Availability
      </Button>
    </div>
  );
}

export default BookingForm;
