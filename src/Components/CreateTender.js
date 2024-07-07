// src/Components/CreateTender.js
import React, { useState } from 'react';

const CreateTender = ({ addTender }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bufferTime, setBufferTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTender({ name, description, startTime, endTime, bufferTime, bids: [] });
    setName('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setBufferTime('');
  };

  return (
    <div>
      <h2>Create Tender</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tender Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Tender Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Buffer Time (minutes)"
          value={bufferTime}
          onChange={(e) => setBufferTime(e.target.value)}
        />
        <button type="submit">Create Tender</button>
      </form>
    </div>
  );
};

export default CreateTender;
