import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_70%_1fr] gap-3">
      <Navigation />

      <div className="tertiaryColor w-full h-full p-2 rounded-md">Simple</div>
      <div className="flex gap-3">
        <div className="tertiaryColor w-full h-full p-2 rounded-md">Logg</div>
        <div className="tertiaryColor w-full h-full p-2 rounded-md">Flagg</div>
      </div>
    </main>
  );
}

export default App;
