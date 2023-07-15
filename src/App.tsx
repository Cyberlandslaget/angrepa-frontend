import { Box, Paper } from '@mui/material';
import { useState } from 'react';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Box
        height={50}
        width="100%"
        padding={1}
        borderRadius={1}
        className="tertiaryColor"
      >
        Navigation
      </Box>
      <Box
        height={50}
        width="100%"
        padding={1}
        borderRadius={1}
        className="tertiaryColor"
      >
        test
      </Box>
      <Box flex={1} flexDirection={'column'}>
        <Card
          height={50}
          width="50%"
          padding={1}
          borderRadius={1}
          className="tertiaryColor"
        >
          test
        </Card>
        <Card
          height={50}
          width="50%"
          padding={1}
          borderRadius={1}
          className="tertiaryColor"
        >
          test
        </Card>
      </Box>
    </>
  );
}

export default App;
