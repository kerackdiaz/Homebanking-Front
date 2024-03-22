import React, { useEffect, useState } from 'react'

import { changeAvatar, ClientProvider, changePassword } from '../utils/Db';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { uploadFile } from '../utils/Credenciales';
import  { useNavigate } from 'react-router-dom';



const Profile = () => {
  ClientProvider()
  const client = useSelector((state) => state.authReducer.user)
  const token = useSelector((state) => state.authReducer.token.token);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [buttonView, setButtonView] = useState("invisible");
  const navigate = useNavigate();
  const show = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{ fill: '#ffffff', width: '20px' }}><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
  const hide = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ fill: '#ffffff', width: '20px' }}><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" /></svg>


 

  if (!client || client.length === 0) {
    <div>Loading...</div>
  }

  useEffect(() => {
    setName(client.firstName);
    setLastName(client.lastName);
    setEmail(client.email);
  }, []);

  let credit = 0;
  let debit = 0;

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    console.log(password)
    if(password.length > 8){
    const response = await changePassword( password , token);
    if (response.success) {
      Swal.fire('Password updated', '', 'success');
    }else{
      Swal.fire(response.message, '', 'error');
    }}
  };

  const handleImageUpload = async (e) => {
    e.preventDefault
    const file = e.target.files[0];
    try{
      const newId = client.id + "_" +client.firstName
      const url = await uploadFile(file,newId)
      const res = await changeAvatar(url, token);
      console.log(res.success)
      if (res.success) {
        Swal.fire('Profile picture updated', '', 'success');
        navigate('/profile')
      }
      Swal.fire('Error uploading profile picture', '', 'error');
      navigate('/profile')
  }catch{
    }
  };


  return (
    <>
      <div id="Profile" className='bg-[#15151d] movil:w-full tablet:w-[85%] pb-20 flex content-start flex-wrap min-h-full order-2'>
        <div className='flex w-full text-white py-4 tablet:h-20 movil:justify-center flex-wrap'>
          <h1 className='text-center text-3xl mb-8 movil:w-full tablet:w-4/5 '>My Profile</h1>
          <div className='flex flex-wrap'>
            <div className='movil:w-full tablet:w-1/2 flex flex-col gap-10'>
              <div className='w-full'>
                <fieldset>
                  <legend className='w-full'>
                    <h2 className='text-white text-center font-bold pb-7 text-2xl'>Personal Information</h2>
                    <div className='flex flex-wrap gap-5 items-center px-10'>
                      <div className='flex flex-col movil:w-full tablet:w-[48%] py-5 items-left'>
                        <label className='font-space-grotesk font-bold text-left' htmlFor='name'>Name</label>
                        <input className='bg-transparent border-b border-r text-center w-full' type='text' id='name' name='name' value={name} disabled />
                      </div>
                      <div className='flex flex-col movil:w-full tablet:w-[48%] py-5 items-left'>
                        <label className='font-space-grotesk font-bold' htmlFor='lastname'>Last Name</label>
                        <input className='bg-transparent border-b border-r text-center w-full' type='text' id='lastname' name='lastname' value={lastName} disabled />
                      </div>
                      <div className='flex flex-col movil:w-full tablet:w-[48%] py-5 items-left'>
                        <label className='font-space-grotesk font-bold' htmlFor='email'>Email</label>
                        <input className='bg-transparent border-b border-r text-center w-full' type='email' id='email' name='email' value={email} disabled />
                      </div>
                      <form className='flex flex-col movil:w-full tablet:w-[48%] pt-5 items-left'>
                        <label className='font-space-grotesk font-bold' htmlFor='email'>Set a new Password</label>
                        <input className='bg-transparent border-b border-r text-center w-full' type={showPassword ? "text" : "password"} id='password' name='password' value={password} onChange={(e) => {setPassword(e.target.value), password.length > 6 ? setButtonView("block") : setButtonView("hidden")}} />
                        <button className='relative left-[90%] bottom-6 w-5' onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
                          {showPassword ? hide : show}
                        </button>
                        <button className={buttonView + ' border-2 px-4 py-2 rounded-xl bg-[#8383b5] text-white hover:scale-105 absolute movil:top-[65vh] laptop:top-[30vh] movil:right-[10vw] laptop:right-[40vw]'} type='submit' onClick={handlePasswordChange}> change</button>
                        <p className='text-red-500 absolute translate-y-[6vh]'>{message}</p>
                      </form>
                    </div>
                  </legend>
                </fieldset>
              </div>
              <div>
                <section>
                  <h2 className='text-white text-center font-bold pb-7 text-2xl'>Details account</h2>
                  <div className='flex flex-wrap gap-5 items-center px-10'>
                    <div className='flex flex-col movil:w-full tablet:w-[48%] py-5 items-left'>
                      <h3 className='font-space-grotesk font-bold'>Acounts</h3>
                      <p className='bg-transparent border-b border-r text-center w-full'>
                        {
                          client.accounts?.length} / 3
                      </p>
                    </div>
                    <div className='flex flex-col movil:w-full tablet:w-[48%] py-5 items-left'>
                      <h3 className='font-space-grotesk font-bold'>Loans</h3>
                      <p className='bg-transparent border-b border-r text-center w-full'>
                        {
                          client.loans?.length}
                      </p>
                    </div>
                    <div className='flex flex-col w-full py-5 items-left'>
                      <h3 className='font-space-grotesk font-bold'>Cards</h3>
                      <span className='bg-transparent border-b border-r text-center w-full flex justify-around'>
                      {client.card?.map((card, index) => {
                        let cardInfo = '';
                        if (card.type === 'CREDIT') {
                          credit++;
                          cardInfo = `Credit: ${credit}/1 type: ${card.color.toUpperCase()}`;
                        } else if (card.type === 'DEBIT') {
                          debit++;
                          cardInfo = `Debit: ${debit}/1 ${card.color.toUpperCase()}`;
                        }
                        return (
                          <p className='' key={index}>
                            {cardInfo}
                          </p>
                        );
                      })}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className='movil:w-full tablet:w-1/2'>
              <div className='w-full'>
                <h2 className='text-white text-center font-bold pb-7 text-2xl'>Profile Pic</h2>
                <div className='flex flex-col gap-5 justify-center items-center'>
                  <img className='w-[300px] h-[300px] object-cover object-center border-8 rounded-lg border-indigo-400 ' src={client.profilePictureUrl} alt='profile' />
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile