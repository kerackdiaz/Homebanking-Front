import React,{useState} from 'react'
import Cards from '../components/Cards'


 const NewCard = () => {
  const [card, setCard] = useState({
    number: '**** **** **** 0666',
    expiryDate: 'MM/YY',
    name: 'CARD HOLDER',
    color: 'gray',
    cvv: '***',
    type: 'DEBIT'
  });
  const [isColorSelected, setIsColorSelected] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'typeCard') {
      setCard(prevState => ({ ...prevState, type: value }));
    } else if (name === 'colorCard') {
      setCard(prevState => ({ ...prevState, color: value.toLowerCase() }));
      setIsColorSelected(true);
    }
  }
  return (
<div id="NewLoan" className='bg-[#15151d] w-[85%] pb-20 px-5 flex content-start flex-wrap'>
      <div className='f w-full text-white py-4 h-20'>
        <h1 className='text-center text-3xl mb-8'>Apply for a card</h1>
      </div>
   <div className='w-1/2 flex flex-col justify-center '>
      <ol className='text-white list-decimal px-20 flex flex-col gap-5 mb-10' >
        <li>Choose the type of card that fits your financial needs. Each type of card has different conditions and advantages.</li>
        <li>Select the type of card. each one will give you benefits for using it.</li>
      </ol>
      <form className='flex flex-col px-10 gap-5' onChange={handleInputChange}>
      <select name="typeCard" defaultValue="defaul"  className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
    <option value="defaul" disabled>Select a card type...</option>
    <option value="DEBIT">DEBIT</option>
    <option value="CREDIT">CREDIT</option>
  </select>
  <select name="colorCard" defaultValue="defaul" className='bg-[#8383b5]  border-none text-white rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 block   p-2.5 placeholder-[#8383b5]'>
    <option value="defaul" disabled>Select a card color...</option>
    <option value="gold">GOLD</option>
    <option value="silver">SILVER</option>
    <option value="titanium">TITANIUM</option>
  </select>
        
        <button type="submit" className='border-2 px-4 py-2 rounded-xl bg-[#1d2027] text-white hover:scale-90 ease-linear transition-all duration-150'>Apply</button>
      </form>

    </div>
    <div className='w-1/3'>
    {isColorSelected && <Cards number={card.number} expiryDate={card.expiryDate} name={card.name} color={card.color} cvv={card.cvv}/>}
    </div>
    </div>
  )
}
export default NewCard
