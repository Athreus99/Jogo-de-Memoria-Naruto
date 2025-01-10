import React, { useEffect, useState } from 'react';
import images from './images';

interface GameProps {
  playerName: string;
}

const Game: React.FC<GameProps> = ({ playerName }) => {
  const [cards, setCards] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const narutoCharacters = [
      'Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Itachi', 'Gaara',
      'Hinata', 'Neji', 'Rock Lee', 'Shikamaru'
    ];
    const shuffledCards = [...narutoCharacters, ...narutoCharacters].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);

    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2) return;

    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      const firstIndex = flippedCards[0];
      const secondIndex = index;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div>
      <header className="header">
        <span>{playerName}</span>
        <span className="timer-font ml-4">Tempo: {timer}s</span>
      </header>
      <div className="card-container">
        <div className="grid grid-cols-4 gap-4 p-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {flippedCards.includes(index) || matchedCards.includes(index) ? (
                <img src={images[card]} alt={card} />
              ) : (
                <img src='./assets/images/card-back.png' alt='Card Back' />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
