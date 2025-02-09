import { useState, useEffect } from 'react';

type Card = {
  id: number;
  character: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type GameState = 'login' | 'playing';

const characters = [
  {
    name: 'Naruto',
    image: 'images/Naruto.png'
  },
  {
    name: 'Sasuke',
    image: 'images/Sasuke.png'
  },
  {
    name: 'Sakura',
    image: 'images/Sakura.png'
  },
  {
    name: 'Kakashi',
    image: 'images/Kakashi.png'
  },
  {
    name: 'Hinata',
    image: 'images/Hinata.png'
  },
  {
    name: 'Rock Lee',
    image: 'images/RockLee.png'
  },
  {
    name: 'Gaara',
    image: 'images/Gaara.png'
  },
  {
    name: 'Itachi',
    image: 'images/Itachi.png'
  }
];

const NarutoMemoryGame = () => {
  const [gameState, setGameState] = useState<GameState>('login');
  const [playerName, setPlayerName] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (gameState === 'playing') {
      initializeGame();
    }
  }, [gameState]);

  const initializeGame = () => {
    const duplicatedCharacters = [...characters, ...characters];
    const shuffledCards = duplicatedCharacters
      .sort(() => Math.random() - 0.5)
      .map((character, index) => ({
        id: index,
        character: character.name,
        image: character.image,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setIsGameOver(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameState('playing');
    }
  };

  const handleCardClick = (id: number) => {
    if (
      flippedCards.length === 2 ||
      cards[id].isFlipped ||
      cards[id].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      checkMatch(newFlippedCards);
    }
  };

  const checkMatch = (currentFlippedCards: number[]) => {
    const [firstCard, secondCard] = currentFlippedCards;
    
    setTimeout(() => {
      if (cards[firstCard].character === cards[secondCard].character) {
        const newCards = [...cards];
        newCards[firstCard].isMatched = true;
        newCards[secondCard].isMatched = true;
        setCards(newCards);

        if (newCards.every(card => card.isMatched)) {
          setIsGameOver(true);
        }
      } else {
        const newCards = [...cards];
        newCards[firstCard].isFlipped = false;
        newCards[secondCard].isFlipped = false;
        setCards(newCards);
      }
      setFlippedCards([]);
    }, 1000);
  };

  const handleNewGame = () => {
    setGameState('login');
    setPlayerName('');
    initializeGame();
  };

  if (gameState === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-orange-500">
            Jogo da Memória do Naruto
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Digite seu nome para começar
              </label>
              <input
                type="text"
                id="name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Seu nome"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
            >
              Começar Jogo
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-4">Jogo da Memória do Naruto</h1>
        <div className="flex justify-center items-center gap-4 mb-4">
          <p className="text-lg">Jogador: {playerName}</p>
          <p className="text-lg">Movimentos: {moves}</p>
          <button
            onClick={handleNewGame}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Novo Jogo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="relative"
          >
            <div
              className={`aspect-square w-full cursor-pointer transition-transform duration-500 transform-gpu ${
                card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Frente da carta (Símbolo Ninja) */}
              <div
                className={`absolute w-full h-full bg-orange-400 rounded-lg flex items-center justify-center ${
                  card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="text-4xl text-orange-600">忍</span>
              </div>

              {/* Verso da carta (Imagem do personagem) */}
              <div
                className={`absolute w-full h-full bg-white rounded-lg flex flex-col items-center justify-center p-2 transform rotate-y-180 ${
                  card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={card.image}
                  alt={card.character}
                  className="w-full h-full object-contain"
                />
                <p className="mt-2 text-sm font-bold">{card.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Parabéns, {playerName}!</h2>
            <p className="mb-4">Você completou o jogo em {moves} movimentos!</p>
            <button
              onClick={handleNewGame}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Jogar Novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NarutoMemoryGame;