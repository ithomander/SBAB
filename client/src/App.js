import React from 'react';
import Navbar from './modules/layout/components/Header/Header';
import BusList from './modules/dashboard/components/BusList/Buslist';

export default function App() {
  return (
    <div>
      <Navbar/>
      <BusList/>
    </div>
  )
}