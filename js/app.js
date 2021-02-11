const mainActivity = document.getElementsByClassName('main-activity').item(0);
const winRules = document.getElementsByClassName('window-rules').item(0);
const closeButton = document.getElementsByClassName('close').item(0);
const handType = document.getElementsByClassName('circle');

let scoreRecord = 0;

const imgs = ['red-arc','blue-arc','yellow-arc'];
/*
    los display de los elementos del window game son:
    .game -> flex
    .h2 -> block
    .play-again -> block
    el display de container en el main window es:
    .container -> block
    el display de rules es:
    .window-rules -> flex
*/

const transparente = mainActivity.getElementsByClassName('transparencia').item(0);
const shot_alert = () =>{
    // mainActivity.style.display = 'none';
    transparente.style.display = 'block'
    winRules.style.display = 'flex';
}

const close = () =>{
    // mainActivity.style.display = 'flex';
    transparente.style.display = 'none'
    winRules.style.display = 'none';
}

const conteiner = mainActivity.getElementsByClassName('container').item(0);
const game = mainActivity.getElementsByClassName('game').item(0);

const home = () =>{ 
    conteiner.style.display = 'block'
    game.getElementsByTagName('h2').item(0).style.display = 'none';
    game.getElementsByClassName('play-again').item(0).style.display = 'none';

    const images = game.getElementsByTagName('img');
    let long = images.length;
    for(let i=0; i<long; i++){
        images.item(i).style.display = 'none';
    }
    const ol = game.getElementsByClassName('outline');
    ol.item(0).setAttribute('class','outline');
    ol.item(1).setAttribute('class','outline');

    game.style.display = 'none';
}

const changeWindow = () =>{
    /* vistas */
    conteiner.style.display = 'none'
    game.style.display = 'flex';
}

/*
    rock = 0
    paper = 1
    scissors = 2
*/
const select = (type) =>{
    const outline = mainActivity.getElementsByClassName('outline');
    const player = game.getElementsByTagName('img');
    const htwo = game.getElementsByTagName('h2').item(0);
    
    player.item(type).style.display = 'block';
    outline.item(0).setAttribute('class','outline '+imgs[type]);
    
    let numHandRand = Math.floor(3*Math.random());

    if(numHandRand === (type+1)%3){
        console.log('your lose');
        htwo.textContent = 'YOUR LOSE';
    }else if(numHandRand === type){
        console.log('tie');
        htwo.textContent = 'TIE';
    }else{
        console.log('your win');
        htwo.textContent = 'YOUR WIN';
        scoreRecord++;
    }

    changeWindow();

    setTimeout(() => {
        player.item(numHandRand+3).style.display = 'block';
        outline.item(1).setAttribute('class','outline '+imgs[numHandRand]);

        document.getElementById('Score').textContent = scoreRecord;

        game.getElementsByTagName('h2').item(0).style.display = 'block';
        game.getElementsByClassName('play-again').item(0).style.display = 'block';    
    }, 500);
}
const rock = () =>{
    select(0);
}
const paper = () =>{
    select(1);
}
const scissors = () =>{
    select(2);
}

// EVENTS------------------------------------------------
closeButton.addEventListener('click', close);
handType.item(0).addEventListener('click',paper);
handType.item(1).addEventListener('click',scissors);
handType.item(2).addEventListener('click',rock);