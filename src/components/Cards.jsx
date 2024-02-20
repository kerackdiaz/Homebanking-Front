import React, { useState } from 'react'

let bg
let bgBack
let textColor
let textColorBack
export const Cards = ({ number, expiryDate, name, color, cvv }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  switch (color) {
    case 'titanium':
      bg = 'bg-card-titanium-f'
      bgBack = 'bg-card-titanium-b'
      textColor = 'text-white'
      textColorBack = 'text-black'
      break;
    case 'gold':
      bg = 'bg-card-gold-f'
      bgBack = 'bg-card-gold-b'
      textColor = 'text-black'
      break;
    case 'silver':
      bg = 'bg-card-silver-f'
      bgBack = 'bg-card-silver-b'
      textColor = 'text-black'
      textColorBack = 'text-black'
      break;
    default:
      bg = 'bg-black'
      textColor = 'text-black'
  } const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full px-5">
      <div
        className={`${isFlipped ? 'flipped ' : ''}flip-card `}
        onClick={handleFlip}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className={bg + ' bg-cover w-full h-72 bg-no-repeat bg-center border-gray-500 border-2 rounded-3xl shadow-[0_0_10px] shadow-white flex flex-col items-center justify-end pb-5 gap-1'}>
              <h2 className={'w-full pl-10 text-3xl text-left ' + textColor + ' font-gemunu font-bold'}>{number}</h2>
              <h3 className={'w-full text-end text-xl ' + textColor + ' pr-28 font-gemunu font-semibold'}>{expiryDate}</h3>
              <h4 className={'w-full pl-10 text-3xl text-left ' + textColor + ' font-gemunu font-bold'}>{name}</h4>
            </div>
          </div>
          <div className="flip-card-back">
            <div className={bgBack + ' bg-cover w-full h-72 bg-no-repeat bg-center border-gray-500 border-2 rounded-3xl shadow-[0_0_10px] shadow-white flex flex-col items-center justify-center'}>
               <h4 className={'w-full pl-10 text-3xl mt-3 text-right pr-[10%] ' + textColorBack + ' font-gemunu font-bold'}>{cvv}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards