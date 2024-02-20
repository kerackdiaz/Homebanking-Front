import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDbClient } from '../utils/Db';
import loansAppli from '../assets/loansAppli.jpg';


const NewLoans = () => {
  const [loan, setLoan] = useState([]);
  const [selectedLoanType, setSelectedLoanType] = useState(null);
  const [form, setForm] = useState({loanName: '', loanPayments: '', maxAmount: ''});

  useEffect(() => {
    document.title = 'New Loan - Ulver Bank';
    axios.get(`http://localhost:8080/api/loan/types`)
      .then(response => {
        setLoan(response.data);
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      });
  }, []); 

  const getLoansType = () => {
    if (!loan || loan.length === 0) {
      return <option>Loading...</option>;
    }
    return loan.map((loanType, index) => {
      return <option key={index} value={loanType.id}>{loanType.name}</option>
    });
  }

  const getPayments = () => {
    if (!loan || loan.length === 0 || !selectedLoanType) {
      return <option>Select a loan type first...</option>;
    }
    const loanType = loan.find(loanType => loanType.id === selectedLoanType);
    return loanType.payments.map((payment, index) => {
      return  <option key={index} value={payment}>{payment} months</option>

    });
  }

  const handleInputChange = (event) => {
    let value = event.target.value;
    if (event.target.name === 'loanName') {
      value = Number(value);
      setSelectedLoanType(value);
      const selectedLoan = loan.find(loanType => loanType.id === value);
      setForm({...form, maxAmount: selectedLoan.maxAmount});
    } else {
      setForm({...form, [event.target.name]: value});
    }
  }

  const getAccount = () => {
    const client = useDbClient(1);
    if (!client.accounts || client.accounts.length === 0) {
      return <option>No accounts</option>;
    }
    return client.accounts.map((account, index) => {
      const { id, number } = account;
      return <option key={id} value={index}>{number}</option>
    });
  }

  return (
    <div id="NewLoan" className='bg-[#15151d] w-[85%] pb-20 px-5 flex content-start flex-wrap'>
      <div className='f w-full text-white py-4 h-20'>
        <h1 className='text-center text-3xl mb-8'>Apply for a loan</h1>
      </div>
   <div className='w-1/2 flex flex-col justify-center '>
      <ol className='text-white list-decimal px-20 flex flex-col gap-5 mb-10' >
        <li>Choose the type of loan that fits your financial needs. Each type of loan has different terms and benefits.</li>
        <li>Select the number of months you want to repay the loan. This is the period of time over which you will make payments.</li>
        <li>Select the account from which you are going to debit the monthly fees</li>
        <li>Indicate the maximum amount you would like to borrow. Make sure it is an amount you can comfortably handle.</li>
      </ol>
      <form className='flex flex-col px-10 gap-5 '>
        <select name="loanName" defaultValue="defaul" onChange={handleInputChange} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
          <option value="defaul" disabled>Select a loan type...</option>
          {getLoansType()}
        </select>
        <select name="loanPayments" defaultValue="defaul" onChange={handleInputChange} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
          {getPayments()}
        </select>
        <select name="loanPayments" defaultValue="defaul" onChange={handleInputChange} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
          {getAccount()}
        </select>
        <input type="number" name="maxAmount" placeholder={Number(form.maxAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} min='10000' max={form.maxAmount} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder:text-white' />
        <button type="submit" className='border-2 px-4 py-2 rounded-xl bg-[#1d2027] text-white hover:scale-90 ease-linear transition-all duration-150'>Apply</button>
      </form>
    {console.log(form.maxAmount)}
    </div>
    <div className='w-1/2'>
      <img src={loansAppli} alt="" /></div>   
    </div>
  );
}

export default NewLoans;