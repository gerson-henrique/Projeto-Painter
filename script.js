let cor = [];
let controle = 5
let vezRodando = true
function createPallet(colorNumbers) {

  let paleta = document.createElement('div')

  document.getElementsByTagName('body')[0].appendChild(paleta)
  paleta.id = "color-palette"


  for (let i = 0; i < colorNumbers; i += 1) {

    let divColors = colorNumbers[i]
    divColors = document.createElement('div');
    
    divColors.className = "color";


    document.getElementById('color-palette').appendChild(divColors)

    if (i == 0) {
      divColors.style.backgroundColor = "black"
      cor[i] = "#000"
      divColors.id = "#000" ;
      divColors.classList.add('selected')
    } else {
      cor[i] = generateColors()
    divColors.style.backgroundColor = cor[i]
    divColors.id = cor[i] ;
}

   divColors.addEventListener('click', selecionar)
    
  }


  



}

function createCanvas(ctrl) {

  let quadro = document.createElement('div')
  document.getElementsByTagName('body')[0].appendChild(quadro)
  quadro.id = 'pixel-board'
  let tamanho = document.getElementById('board-size')

  kills=document.getElementById('pixel-board')

  if(vezRodando==false && tamanho.value == ''){
console.log
    alert('Board inválido!')

  }else {



    if (tamanho.value < 5){
        if (vezRodando == false){
        tamanho.value =5;
    }
    } else if (tamanho.value> 50){
        tamanho.value=50
    }




  if (vezRodando == false) { 

    
    kills.innerHTML = '';
  
   let tamanho = document.getElementById('board-size')
   ctrl = tamanho.value 

   }
    

 

    

  for (let o = 0; o < ctrl; o += 1) {
    for (let i = 0; i < ctrl; i += 1) {

      let canvasPixie = document.createElement('div');
      document.getElementById('pixel-board').appendChild(canvasPixie)
      canvasPixie.id = canvasPixie.id + i + o
      canvasPixie.className = 'pixel'
      canvasPixie.addEventListener('click', pintar)

      if (i == ctrl - 1) {
        let breakLine = document.createElement('br')
        document.getElementById('pixel-board').appendChild(breakLine)
      }
    
    }
  }
   vezRodando = false
}
}

function generateColors() {

  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

  if (randomColor.length < 7) {

    randomColor += 0
  }
  // Minha contribuição para a formula que vez por outra retornava numeros quebrados

  return randomColor;

  // - randomColor receve "#" concatenado com o arredondamento para baixo (Math.floor()) 
  //de um numero aleatorio entre zero e um  (math.random())
  //Multiplicado pelo numero possivel de cores (*16777215)
  //Tudo isso convertido a uma string de base Hexadecimal (toString(16))


  // Referencias para generateColors
  //https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
  //https://css-tricks.com/snippets/javascript/random-hex-color/
  //https://stackoverflow.com/questions/1484506/random-color-generator
  //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
}

function selecionar(box) {

    
    
    let removeSelected = document.getElementsByClassName('color')

    for(i=0; i<removeSelected.length;i+=1){
        if (removeSelected[i].classList.contains('selected')){
        removeSelected[i].classList.remove('selected')
    
        }
    }

    document.getElementById(box.target.id).classList.add('selected')
     let selectedColor =  document.getElementById(box.target.id).style.backgroundColor
     return selectedColor

}

function pintar(pen){
    console.log('test')

  let   pencil = document.getElementsByClassName('selected')[0].id
  console.log(pencil)
    document.getElementById(pen.target.id).style.backgroundColor = pencil

}


createPallet(4)

let clearAll = document.createElement("button")
document.getElementsByTagName('body')[0].appendChild(clearAll)
clearAll.id = "clear-board"
clearAll.innerText="Limpar"
clearAll.addEventListener('click',limparTudo)


let bonusInput = document.createElement('input')
bonusInput.id = 'board-size'
let bonusButon = document.createElement('button') 
bonusButon.id = 'generate-board'
document.getElementsByTagName('body')[0].appendChild(bonusInput)
bonusInput.type = 'number'
bonusInput.min = 1




document.getElementsByTagName('body')[0].appendChild(bonusButon)
bonusButon.innerText= 'VQV'



    bonusButon.addEventListener('click', createCanvas)



createCanvas(controle)



function limparTudo (controle){


    let tamanho = document.getElementById('board-size')
   
    if (tamanho.value >5 ){
        controle = tamanho.value 
}else{
    controle = 5
}

    for (let o = 0; o < controle; o += 1) {
        for (let i = 0; i < controle; i += 1) {
          


        let ctrl = "" + i + o
          
          let emp = document.getElementById(ctrl)
          emp.style.backgroundColor = "white"

          }
    
        }
      }


    
     

