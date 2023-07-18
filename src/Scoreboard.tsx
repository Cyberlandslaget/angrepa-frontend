import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import Navigation from './components/Navigation';

function Scoreboard() {
  // const [count, setCount] = useState(0);

  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
      <Navigation />

      <div className="tertiaryColor w-full h-full p-2 rounded-md">
        Scoreboard
      </div>
    </main>
  );
}

export default Scoreboard;
