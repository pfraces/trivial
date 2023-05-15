import { useState } from 'react';
import Game from './Game/Game';
import './App.css';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <h1>Trivial Puessi</h1>
        </div>
        <div className="score">Score: {score}</div>
      </div>
      <Game
        onRight={() => {
          setScore((prev) => prev + 1);
        }}
      />
    </div>
  );
}

export default App;
