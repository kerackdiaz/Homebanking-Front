import React, { useState } from 'react';
import { postTransfer } from '../utils/Db';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ClientProvider } from '../utils/Db';

export const QuickTransaction = () => {
  const token = useSelector((state) => state.authReducer.token.token);
  ClientProvider()
  const client  = useSelector((state) => state.authReducer.user )
  const [mybalance, setMyBalance] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [amount, setAmount] = useState("");
  const [accountDestination, setAccountDestination] = useState("");
  if (!client || !client.accounts || client.accounts.length === 0) {
    return <div>Loading...</div>;
  }

  const accountData = client.accounts.map((account, index) => {
    const { id, number } = account;
    return <option key={id} value={index}>{number}</option>
  });


  const handleSelectChange = (e) => {
        e.preventDefault();
    setSelectedAccountId(e.target.value);
    setMyBalance(parseInt(client.accounts[e.target.value].balance).toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountOrigin = client.accounts[selectedAccountId].number;
    const description = `Transfer from ${accountOrigin}`; 
    const response = await postTransfer({ accountOrigin, accountDestination, amount, description }, token);
      if (response.success === true) {
        Swal.fire('Transfer successful', '', 'success');
      } else {
        Swal.fire(response.message, '', 'error');
      }

  }
  return (

<form onSubmit={handleSubmit} className='bg-[#8383b5] flex-wrap text-white bg-contain  border-gray-500 border-2 rounded-xl  flex items-center justify-evenly py-2 px-3 gap-6'> 
    <div className='flex justify-evenly items-center w-full'>
      <h2 className='w-1/3 flex items-center text-2xl text-white font-gemunu font-bold'> Debit to</h2>
      <h2 className='font-gemunu font-semibold'>{mybalance}</h2>
      <select onChange={handleSelectChange} defaultValue="no" className="bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]">
        <option value="no" disabled>Select account</option>
          {accountData.length > 0 ? accountData : <option>No accounts</option>}
         </select>
    </div>
      <div className='flex w-full justify-center items-center gap-2'>
        <h2 className='font-gemunu font-semibold'>To:</h2>
        <input name='accountDestination' value={accountDestination} onChange={e => setAccountDestination(e.target.value)} type="text" placeholder="Enter account number" className="bg-transparent border-b outline-none pl-1 placeholder:text-gray-600 w-full"/>
      </div>
      <div className='text-2xl w-2/3 pr-5 flex text-white'>
        <span>$</span>
        <input className='bg-transparent border-b outline-none pl-1 placeholder:text-gray-600 w-full' type="text" placeholder="amount to transfer" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <button className='border-2 px-4 py-2 rounded-xl bg-[#1d2027] text-white hover:scale-90 ease-linear transition-all duration-150' type="submit"> Send <span>&rarr;</span> </button>
    </form>
  )
}

export default QuickTransaction