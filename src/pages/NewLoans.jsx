import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ClientContext from '../utils/ClientContext';
import loansAppli from '../assets/loansAppli.jpg';
import { loanApply } from '../utils/Db';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

const NewLoans = () => {

  const navigate=useNavigate();
  const token = useSelector((state) => state.authReducer.token.token);
  const [loan, setLoan] = useState([]);
  const [selectedLoanType, setSelectedLoanType] = useState(null);
  const [form, setForm] = useState({ name: '', accountDestination: '', amount: '', payments: '' });
  const client = useSelector((state) => state.authReducer.user )

  const encryptURL = encrypt(import.meta.env.VITE_API_URL)
  const baseURL = descrypData(encryptURL);


  useEffect(() => {
    document.title = 'New Loan - Ulver Bank';
    axios.get(`${baseURL}loan/types`)
      .then(response => {
        setLoan(response.data);
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Do you accept all terms and conditions?",
      text: "Al apply you accept all terms and conditions",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    });

    if (result.isConfirmed) {
    const request = await loanApply(form, token);
    if (request.success) {
      setForm({
        name: "",
        accountDestination: "",
        amount: "",
        payments: "",
      }); 
      Swal.fire('Loan application successful', '', 'success');
      setTimeout(() => navigate('/loans'), 3000);
    } else {
      Swal.fire(request.message, '', 'error');;
      }
    }
  };
  

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
      return <option key={index} value={payment}>{payment} months</option>

    });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setSelectedLoanType(Number(value));
      const selectedLoan = loan.find(loanType => loanType.id === Number(value));
      setForm({ ...form, name: selectedLoan.name, maxAmount: selectedLoan.maxAmount });
    } else if (name === 'accountDestination') {
      const selectedAccount = client.accounts.find(account => account.number === value);
      if (selectedAccount) {
        setForm({ ...form, accountDestination: selectedAccount.number });
      } else {
        console.error(`No account found with number: ${value}`);
      }
    } else if (name === 'loanPayments') {
      setForm({ ...form, payments: Number(value) });
    } else if (name === 'amount') {
      setForm({ ...form, amount: Number(value) });
    }
  };
   
      const getAccount = () => {

        if (!client.accounts || client.accounts.length === 0) {
          return <option>No accounts</option>;
        }
        return client.accounts.map((account, index) => {
          const { id, number } = account;
          return <option key={id} value={number}>{number}</option>
        });
      }

      return (
        <div id="NewLoan" className='bg-[#15151d]  movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap movil:h-[120vh] laptop:h-[100vh]'>
        <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
          <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>Apply for a loan</h1>
          </div>
          <div className='movil:w-full laptop:w-1/2 flex flex-col justify-center '>
            <ol className='text-white list-decimal px-20 flex flex-col gap-5 mb-10' >
              <li>Choose the type of loan that fits your financial needs. Each type of loan has different terms and benefits.</li>
              <li>Select the number of months you want to repay the loan. This is the period of time over which you will make payments.</li>
              <li>Select the account from which you are going to debit the monthly fees</li>
              <li>Indicate the maximum amount you would like to borrow. Make sure it is an amount you can comfortably handle.</li>
            </ol>
            <form className='flex flex-col px-10 gap-5' onSubmit={handleSubmit}>
              <select name="name" defaultValue="defaul" onChange={handleInputChange} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
                <option value="defaul" disabled>Select a loan type...</option>
                {getLoansType()}
              </select>
              <select name="loanPayments" defaultValue="defaul" onChange={handleInputChange} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
              <option value="defaul" disabled>Select a loan type first...</option>;
                {getPayments()}
              </select>
              <select name="accountDestination" defaultValue="defaul" onChange={handleInputChange} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
              <option value="defaul" disabled>Select a account...</option>
                {getAccount()}
              </select>
              <input type="number" name="amount" placeholder={Number(form.maxAmount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} min='10000' max={form.maxAmount}  onChange={handleInputChange} className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder:text-white' />
              <button type="submit" className='border-2 px-4 py-2 rounded-xl bg-[#1d2027] text-white hover:scale-90 ease-linear transition-all duration-150'>Apply</button>
            </form>
          </div>
          <div className='movil:hidden laptop:block w-1/2'>
            <img src={loansAppli} alt="" /></div>
        </div>
      );
    }

    export default NewLoans;