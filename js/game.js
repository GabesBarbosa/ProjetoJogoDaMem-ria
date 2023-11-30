const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const scoreElement = document.querySelector('.score');

const characters = [
  'bubassauro',
  'charmander',
  'squirtle',
  'caterpie',
  'ponyta',
  'rattata',
  'pikachu',
  'cleifairy',
  'psyduck',
];

let firstCard = null;
let secondCard = null;
let score = 0;
let timerInterval;

const increaseScore = () => {
  score += 10;
  scoreElement.textContent = `Score: ${score}`;
};

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  console.log(disabledCards);
  if (disabledCards.length === 18) {
    clearInterval(timerInterval);
    const timer = document.getElementById('timer');
    if (timer) {
      alert(`Parabéns, Seu tempo foi de: ${timer.innerHTML} segundos. Sua pontuação foi de ${score} pontos.`);
      window.location = 'pages/index.html';
    } else {
      console.error("Element with id 'timer' not found");
    }
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    increaseScore();
    firstCard = null;
    secondCard = null;

    setTimeout(() => {
      checkEndGame();
    }, 1000);
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = null;
      secondCard = null;
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (!firstCard) {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (!secondCard) {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = document.createElement('div');
  card.className = 'card';

  const front = document.createElement('div');
  front.className = 'face front';

  const back = document.createElement('div');
  back.className = 'face back';

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });

  scoreElement.textContent = 'Score: 0';
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    const timer = document.getElementById('timer');
    if (timer) {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    } else {
      console.error("Element with id 'timer' not found");
    }
  }, 1000);
};

window.onload = () => {
  spanPlayer.textContent = localStorage.getItem('player') || 'Player';
  startTimer();
  loadGame();
};
