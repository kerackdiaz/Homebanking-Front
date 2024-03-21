import React from 'react'
import accountApply from '../assets/banner-account.jpg';
import { getNewAccount } from '../utils/Db'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const NewAccount = () => {
  const token = useSelector((state) => state.authReducer.token.token);
  const handleRequest = async (e) => {
    e.preventDefault();
    const response = await getNewAccount(token);
    if (response.success === true) {
      Swal.fire('Account application successful', '', 'success');
    }else{
      console.log(response.message);
      Swal.fire(response.message, '', 'error');
    }
  }

  return (
    <div id="Client" className='bg-[#15151d] movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap min-h-[100vh]'>
    <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
      <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>New Account</h1>
      </div>
      <div className='w-full'>
        <img className='w-full' src={accountApply} alt="" /></div>
      <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-white text-2xl pt-20 pb-10 w-4/5 text-center'>Your journey to financial success starts here. Apply for a new account and take the first step towards achieving your dreams.</h2>
          <button type="submit" onClick={handleRequest} className='border-2 px-4 py-2 rounded-xl bg-[#1d2027] text-white hover:scale-90 ease-linear transition-all duration-150 w-1/3'>Apply</button>
      </div>
    </div>
  )
}
export default NewAccount