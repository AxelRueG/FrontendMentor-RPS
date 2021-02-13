const handType = [
  {
    id: 'paper',
    src: '../images/icon-paper.svg',
    className: 'container__arc-blue',
    positionClass: 'container__arc-blue-position',
    tags: 'paper Rock-paper-scissors',
  },
  {
    id: 'scissors',
    src: '../images/icon-scissors.svg',
    className: 'container__arc-yellow',
    positionClass: 'container__arc-yellow-position',
    tags: 'scissors Rock-paper-scissors',
  },
  {
    id: 'rock',
    src: '../images/icon-rock.svg',
    className: 'container__arc-red',
    positionClass: 'container__arc-red-position',
    tags: 'rock Rock-paper-scissors',
  },
];

// -- COMPONENTES --------------------------------------------------------------

const componentCircle = (element, status) => {
  return `
  <div class="${element.className} ${status ? element.positionClass : ''}">
    <div class="circle">
      <img
        src="${element.src}"
        alt="${element.tags}"
      />
    </div>
  </div>
  `;
};

const componentRulesWindow = () => {
  let component = document.createElement('div');
  component.className = 'window-rules-back';
  let str = `
      <div class='window-rules'>
        <h2>RULES</h2>
        <img 
          src="./images/image-rules.svg" 
          alt="rock-paper-scissors-rules 
          rules" 
        />
        <div class="close"></div>
      </div>
  `;
  component.innerHTML = str;
  return component;
};

// -- logica del juego ---------------------------------------------------------

const generatorPcClicked = () => {
  let numHandRand = Math.floor(3 * Math.random());
  return handType[numHandRand];
};

const getResult = (userClicked, pcClicked) => {
  if (userClicked == 'rock' && pcClicked == 'scissors') {
    return 'YOU WIN';
  } else if (userClicked == 'scissors' && pcClicked == 'paper') {
    return 'YOU WIN';
  } else if (userClicked == 'paper' && pcClicked == 'rock') {
    return 'YOU WIN';
  } else if (userClicked == pcClicked) {
    return 'YOU TIED';
  } else {
    return 'YOU LOSE';
  }
};

const loadTriangle = () => {
  const Container = document.querySelector('.game');
  Container.className = 'container';
  handTypeLoader();
};

function sumCount() {
  const score = document.getElementsByClassName('header__score__value')[0];
  let val = Number(score.textContent);
  val += 1;
  score.textContent = val;
}

const componentGame = (userClicked, pcClicked, gameResult) => {
  // console.log(userClicked);
  if (gameResult === 'YOU WIN') sumCount();

  return `
  <div class="clicked">
    <!-- circle user -->
    ${componentCircle(userClicked, 0)}
    <h3 class="clicked__player">YOUR PICKED</h3>
    </div>
    <div class="clicked">
    ${componentCircle(pcClicked, 0)}
    <!-- circle pc -->
    <h3 class="clicked__player">THE HOUSE PICKED</h3>
  </div>
  <h2 class="game_result">${gameResult}</h2>
  <button class="play-again">PLAY AGAIN</button>
  `;
};

// -- Actions ------------------------------------------------------------------

const clickedEvent = element => {
  let pcClicked = generatorPcClicked();
  let gameResult = getResult(element.id, pcClicked.id);

  const Container = document.querySelector('.container');
  Container.className = 'game';
  Container.innerHTML = componentGame(element, pcClicked, gameResult);

  let arcCircle = document.getElementsByClassName('clicked');
  if (gameResult == 'YOU WIN') {
    arcCircle[0].firstElementChild.classList.add('game__gradient');
  } else if (gameResult == 'YOU LOSE') {
    arcCircle[1].firstElementChild.classList.add('game__gradient');
  }
};

const addCircleEvent = () => {
  const hands = document.getElementsByClassName('circle');
  for (let i = 0; i < hands.length; i++) {
    let element = handType[i];

    hands.item(i).addEventListener('click', () => {
      clickedEvent(element);

      let playAgain = document.querySelector('.play-again');
      playAgain.addEventListener('click', loadTriangle);
    });
  }
};

function handTypeLoader() {
  const Container = document.querySelector('.container');

  let components = handType.reduce((comp, hand) => {
    return (comp += componentCircle(hand, 1));
  }, '');

  Container.innerHTML = components;
  addCircleEvent();
}

const seeRulesWindows = () => {
  document.body.appendChild(componentRulesWindow());

  const rulesWindows = document.querySelector('.window-rules-back');
  const closeRules = rulesWindows.querySelector('.close');
  closeRules.addEventListener('click', () => {
    rulesWindows.remove();
  });
};

// -- EVENTS -------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', handTypeLoader);

const rulesButton = document.getElementsByClassName('rules').item(0);
rulesButton.addEventListener('click', seeRulesWindows);
