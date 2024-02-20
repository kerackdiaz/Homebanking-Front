import React, { useEffect, useState } from 'react';
import McLogo from '../assets/icons/mc_logo.svg'
import InputNumber from './InputNumber'
import { useDbClient } from '../utils/Db'
import SelectUser from '../components/SelectUser';
import AddUser from '../components/AddUser';


export const QuickTransaction = () => {
  const client = useDbClient(1);
  const [mybalance, setMyBalance] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  if (!client || !client.accounts || client.accounts.length === 0) {
    return <div>Loading...</div>;
  }
  const accountData = client.accounts.map((account, index) => {
    const { id, number } = account;
    return <option key={id} value={index}>{number}</option>
  });
  const handleSelectChange = (e) => {
    setSelectedAccountId(e.target.value);
    setMyBalance(parseInt(client.accounts[e.target.value].balance).toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
  }

  return (

  <article className='bg-[#8383b5] flex-wrap text-white bg-contain  border-gray-500 border-2 rounded-xl  flex items-center justify-evenly py-2 px-3 gap-6'> 
    <div className='flex justify-evenly items-center w-full'>
      <h2 className='w-1/3 flex items-center text-2xl text-white font-gemunu font-bold'> <img className='w-12' src={McLogo} alt="" /> Debit</h2>
      <h2 className='font-gemunu font-semibold'>${mybalance}</h2>
      <select onChange={handleSelectChange} defaultValue="no" className="bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]">
        <option value="no" disabled>Select account</option>
          {accountData.length > 0 ? accountData : <option>No accounts</option>}
         </select>
    </div>
      <div className='flex gap-2'>
      <SelectUser />
      <AddUser />
      </div>
      <InputNumber />
      <button className='border-2 px-4 py-2 rounded-xl bg-[#1d2027] text-white hover:scale-90 ease-linear transition-all duration-150' type="submit"> Send <span>&rarr;</span> </button>
  </article>
  )
}

export default QuickTransaction