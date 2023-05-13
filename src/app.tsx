import React from 'react';
import Header from 'Components/Header';
import HabitCard from 'Src/views/HabitCard';
import './app.less';

function App() {
  return (
    <div className='app'>
      <Header />
      <HabitCard />
    </div>
  );
}

export default App;
