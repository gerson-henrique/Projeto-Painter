const elementBody = document.getElementsByTagName('body')[0];
const colorPalletID = 'color-palette';
const colorCanvasID = 'pixel-board';
const boardSize = 'board-size';
// definições de atalhos;
const cor = [];
let controle = 5;
let runTime = true;

function generateColors() {
  let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  if (randomColor.length < 7) {
    randomColor += 0;
  }
  
  // Minha contribuição para a formula que vez por outra retornava numeros quebrados
  return randomColor;

  /* randomColor receve "#" concatenado com o arredondamento para baixo (Math.floor())
  de um numero aleatorio entre zero e um  (math.random())
  Multiplicado pelo numero possivel de cores (*16777215)
  Tudo isso convertido a uma string de base Hexadecimal (toString(16))
   Referencias para generateColors
  https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
  https://css-tricks.com/snippets/javascript/random-hex-color/
  https://stackoverflow.com/questions/1484506/random-color-generator
  https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toString */
}
// gera uma cor Hex aleatoria
function formBase(identf) {
  const e = document.createElement('section');
  elementBody.appendChild(e);
  e.id = identf;
}
// Cria a forma de quadro
function createColorInPallete() {
  const e = document.createElement('section');
  document.getElementById(colorPalletID).appendChild(e);
  e.className = 'color';
  return e;
}
// Cria um quadrado colorido;
function selecionar(box) {
  const removeSelected = document.getElementsByClassName('color');

  for (let i = 0; i < removeSelected.length; i += 1) {
    if (removeSelected[i].classList.contains('selected')) {
      removeSelected[i].classList.remove('selected');
    }
  }
  document.getElementById(box.target.id).classList.add('selected');
  const selectedColor = document.getElementById(box.target.id).style
    .backgroundColor;
  return selectedColor;
}
// Seleciona uma cor;
function createPallete(colorNumbers) {
  formBase(colorPalletID);
  document.getElementById(colorPalletID);
  for (let i = 0; i < colorNumbers; i += 1) {
    const sectionColors = createColorInPallete();
    if (i === 0) {
      sectionColors.style.backgroundColor = 'black';
      cor[i] = '#000';
      sectionColors.id = '#000';
      sectionColors.classList.add('selected');
    } else {
      cor[i] = generateColors();
      sectionColors.style.backgroundColor = cor[i];
      sectionColors.id = cor[i];
    }
    sectionColors.addEventListener('click', selecionar);
  }
}
// Cria a Paleta de cores;
function maxMinCheck(e) {
  if (e.value < 5) {
    if (runTime === false) {
      return 5;
    }
  } else if (e.value > 50) {
    e.value = 50;
    return 50;
  } else {
    return e.value;
  }
}
// Confere se os valores são maiores ou menores que so parametros;
function clearPathToRecreate() {
  if (runTime === false) {
    const size = document.getElementById(boardSize);
    const kills = document.getElementById(colorCanvasID);
    kills.innerHTML = '';
    controle = size.value;
  }
}
// Elimina os blocos anteriores para criar novos;
function paint(pen) {
  const pencil = document.getElementsByClassName('selected')[0].id;
  document.getElementById(pen.target.id).style.backgroundColor = pencil;
}
// pinta os pixeis;
function drawLines(e, o) {
  for (let i = 0; i < e; i += 1) {
    const canvasPixie = document.createElement('div');
    document.getElementById(colorCanvasID).appendChild(canvasPixie);
    canvasPixie.id = canvasPixie.id + i + o;
    canvasPixie.className = 'pixel';
    canvasPixie.addEventListener('click', paint);
    if (i === e - 1) {
      const breakLine = document.createElement('br');
      document.getElementById(colorCanvasID).appendChild(breakLine);
    }
  }
}
// desenha as linhas dos pixeis;
function createPixels() {
  const size = document.getElementById(boardSize);
  size.value = maxMinCheck(size);
  clearPathToRecreate();
  for (let o = 0; o < controle; o += 1) {
    drawLines(controle, o);
  }
  runTime = false;
}
// desenha os pixeis da tela;
function limparTudo() {
  const size = document.getElementById(boardSize);
  if (size.value < 5) {
    size.value = 5;
  }
  for (let o = 0; o < size.value; o += 1) {
    for (let i = 0; i < size.value; i += 1) {
      const eID = `${i}${o}`;
      const empty = document.getElementById(eID);
      empty.style.backgroundColor = 'white';
    }
  }
}

function createCanvas() {
  formBase(colorCanvasID);
  const size = document.getElementById(boardSize);

  if (runTime === false && size.value === '') {
    alert('Board inválido!');
  } else {
    createPixels();
  }
}

function createElement(eID, innerTxt, eEvent) {
  const clearAll = document.createElement('button');
  document.getElementsByTagName('body')[0].appendChild(clearAll);
  clearAll.id = eID;
  clearAll.innerText = innerTxt;
  clearAll.addEventListener('click', eEvent);
}
createPallete(4);

createElement('clear-board', 'Limpar', limparTudo);

const bonusInput = document.createElement('input');
elementBody.appendChild(bonusInput);
bonusInput.id = boardSize;
bonusInput.type = 'number';
bonusInput.min = 1;

createElement('generate-board', 'VQV', createCanvas);

createCanvas();
