import React from 'react';
import Navbar from './components/Navbar';
import SliderContainer from './components/SliderContainer';

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

    const slides = [
        {
            imageUrl: 'https://images.pexels.com/photos/2674052/pexels-photo-2674052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'Top Service Providers',
            description: 'Meet our top service providers who offer the best solutions.',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1526226060519-126d75eaa5e2?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Why Work With Us',
            description: 'We deliver quality and customer satisfaction at every step.',
        },
        {
            imageUrl: 'https://plus.unsplash.com/premium_photo-1726769007510-7a26e51e9f86?q=80&w=1764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Global Reach',
            description: 'Our services are trusted worldwide by thousands of customers.',
        },
    ];

    return (
        <>
            <Navbar 
                logoText="Asan Rozgar" 
                logoHref="/" 
                links={links} 
                buttons={buttons} 
            />
            <SliderContainer slides={slides} />
        </>
    );
};

export default App;
