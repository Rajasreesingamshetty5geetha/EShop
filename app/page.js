'use client'
import React from 'react' 
import Navbar from './components/Navbar';
import HomePage from './components/Home/HomePage';
import Footer from './components/Footer/Footer';




export default function Home() {
  return (
    <>
      <Navbar/>
      <HomePage/>
      <Footer/>
    </>
  );
}
