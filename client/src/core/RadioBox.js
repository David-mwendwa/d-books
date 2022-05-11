import React, { useState, Fragment } from 'react';

const RadioBox = ({ prices }) => {
  const [value, setValue] = useState(0);

  const handleChange = () => {
    
  }

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        type='checkbox'
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
