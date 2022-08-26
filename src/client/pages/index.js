import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      Hello world
      <div>{count}</div>
      <button onClick={() => setCount((count) => count+1)}>Increase</button>
    </div>
  );
}
