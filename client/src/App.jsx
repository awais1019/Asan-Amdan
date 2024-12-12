import React from 'react';
import Navbar from './Components/Navbar';
import SliderContainer from './Components/HomeComponents/SliderContainer';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';

const App = () => {
    const links = [
        { href: '/provide-service', text: 'Provide Service' },
        { href: '/order-service', text: 'Order Service' },
        { href: '/be-a-manager', text: 'Be a Manager' },
    ];

    const buttons = [
        { text: 'Sign In', className: 'btn-primary', onClick: () => console.log('Sign In clicked') },
        { text: 'Join', className: 'btn-success', onClick: () => console.log('Join clicked') },
    ];


    return (
        <>
            <Navbar 
                logoText="Asan Rozgar" 
                logoHref="/" 
                links={links} 
                buttons={buttons} 
            />

            <Routes>
                <Route path="/" element={<HomePage />} />

            </Routes>


        </>
    );
};

export default App;
