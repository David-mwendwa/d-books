import React, { useState, Fragment } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        type='radio'
        name={p}
        value={`${p._id}`}
        className='mr-4 ml-4'
      />
      <label htmlFor='' className='form-check-label'>
        {p.name}
      </label>
    </div>
  ));
};

export default RadioBox;
