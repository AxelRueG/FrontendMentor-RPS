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
const rulesButton = document.querySelector('.rules');

const componentCircle = element => {
  return `
  <div class="${element.className} ${element.positionClass}">
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
  return `
    <div class="window-rules">
      <h2>RULES</h2>
      <img 
        src="./images/image-rules.svg" 
        alt="rock-paper-scissors-rules 
        rules" 
      />
      <div class="close"></div>
    </div>
  `;
};

// -- Actions ------------------------------------------------------------------

const handTypeLoader = () => {
  const Container = document.querySelector('.container');

  let components = handType.reduce((comp, hand) => {
    return (comp += componentCircle(hand));
  }, '');

  Container.innerHTML = components;
};

const seeRulesWindows = () => {
  document.body.innerHTML += componentRulesWindow();

  // rulesButton.removeEventListener('click');

  // const rulesWindows = document.querySelector('.window-rules');
  // const closeRules = rulesWindows.querySelector('.close');
  // closeRules.addEventListener('click', () => {
  //   rulesWindows.remove();
  // });

  // rulesButton.addEventListener('click', seeRulesWindows);
};

// -- EVENTS -------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', handTypeLoader);

rulesButton.addEventListener('click', seeRulesWindows);
