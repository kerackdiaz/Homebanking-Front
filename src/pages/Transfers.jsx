import React from 'react'
import { useSelector } from 'react-redux'
import QuickTransaction from '../components/QuickTransaction'

 const Transfers = () => {

  return (
    <>
    <div id="Trasnfers" className='bg-[#15151d] movil:w-full laptop:w-[85%] pb-20 flex content-start flex-wrap h-[100vh]'>
        <div className='flex w-full text-white py-4 laptop:h-20 movil:justify-center flex-wrap'>
          <h1 className='text-center text-3xl mb-8 movil:w-full laptop:w-4/5 '>Transfers</h1>
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-white text-2xl pt-20 pb-10 w-4/5 text-center'>Transfer funds between your accounts or to third party accounts quickly, easily and securely.</h2>
      </div>
      <div className='flex justify-center'>
          <QuickTransaction />
      </div>
    </div>
  </>
  )
}

export default Transfers