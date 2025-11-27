import React from 'react'
import Navbar from '../components_lite/Navbar'
import amreshsir from './amreshsir.jpg'; // Import the local image
import ankit from './Ankit.jpg';
import ritik from './ritik.jpg';
import gaurav from './gaurav.jpg';
import Footer from '../components_lite/Footer';

const Creator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className='flex-1 w-full text-center max-w-7xl mx-auto my-10'>
      <h1 className='text-3xl font-serif'>This Page Is Under Maintenance</h1>
      </div>
      <Footer />
    </div>
  )
}

export default Creator
