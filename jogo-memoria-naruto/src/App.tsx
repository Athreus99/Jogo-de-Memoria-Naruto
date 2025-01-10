import React, { useState } from 'react';
import Game from './Game';
import './index.css'; // Certifique-se de importar o CSS

const App: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (playerName.trim() !== '') {
      setGameStarted(true);
    }
  };

  return (
    <div className={`flex items-center justify-center h-screen ${!gameStarted ? 'background' : 'game-background'}`}>
      {!gameStarted ? (
        <div className="bg-white p-8 rounded shadow-lg text-center">
          <img src="./assets/images/logo.png" alt="Logo" className="mb-4 mx-auto" style={{ width: '150px', height: 'auto' }} />
          <h1 className="text-2xl font-bold mb-4">Jogo da Memória Naruto</h1>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={startGame}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Iniciar Jogo
          </button>
        </div>
      ) : (
        <Game playerName={playerName} />
      )}
    </div>
  );
};

export default App;
