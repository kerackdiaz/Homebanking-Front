import React, { useState } from 'react';

function CurrencyInput() {
    const [value, setValue] = useState('');

    const handleChange = event => {
      const result = event.target.value.replace(/[^0-9.]/g, '');
      setValue(result);
    };

    const handleBlur = () => {
      if (value !== '') {
        setValue(parseFloat(value).toFixed(2));
      }
    };

    return (
      <div className='text-2xl w-2/3 pr-5 flex text-white'>
        <span>$</span>
        <input className='bg-transparent border-b outline-none pl-1 placeholder:text-gray-600 w-full' type="text" placeholder="amount to transfer" value={value} onChange={handleChange} onBlur={handleBlur} />
      </div>
    );
};

export default CurrencyInput;