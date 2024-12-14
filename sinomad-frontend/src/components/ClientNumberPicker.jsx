import React, { useState, useRef } from 'react';
import { TextField, Popover, Button, Box } from '@mui/material';

function ClientNumberPicker({ selectedNumber, setSelectedNumber }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (number) => {
    setSelectedNumber(number);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'number-popover' : undefined;

  return (
    <div>
      <TextField
        label="Number of travelers"
        value={selectedNumber}
        onClick={handleClick}
        ref={inputRef}
        readOnly
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <Button
              key={number}
              onClick={() => handleSelect(number)}
              style={{ margin: '5px' }}
            >
              {number}
            </Button>
          ))}
        </Box>
      </Popover>
    </div>
  );
}

export default ClientNumberPicker;
