import React from 'react'

const MainLayout = (props) => {
    return (
        <div className='main-layout flex w-full'>
            {props.children} 
            <footer></footer>
        </div>
    )
}

export default MainLayout