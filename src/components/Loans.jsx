import React from 'react'


export const Loans = ({ id, loanName, amount, payments }) => {
    return (
        <article key={id} className='w-full'>
            <div className='bg-[#8383b5] w-full gap-8 py-2 px-4 bg-no-repeat bg-center border-gray-500 border-2 rounded-xl flex flex-col items-center justify-end pb-1'>
                <table className='w-full text-white gap-1  pb-3'>
                    <thead>
                        <tr>
                            <th>Loan type</th>
                            <th>Approved amount</th>
                            <th>Installments</th>
                        </tr>
                    </thead>
                    <tbody key={id} className=''>
                        <tr className='text-center'>
                            <td>{loanName}</td>
                            <td>{parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                            <td>{payments} Months</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    )
}
export default Loans