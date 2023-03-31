const inputs = document.querySelector(".word"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess span"),
    mistakes = document.querySelector(".wrong span"),
    resetBtn = document.querySelector(".reset"),
    hintBtn = document.querySelector(".showhint"),
    hintElement = document.querySelector(".hint"),
    typeInput = document.querySelector(".type-input");
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
let character, incorrectLetters = [], correctLetters = [], maxGuesses, image;

function startNewGame(){
   // alert("New Game Started! Guess the One Piece Character!");

    hintElement.style.display = "none";
    hintElement.style.opacity = "0";


    const randCharacter = characterList[Math.floor(Math.random() * characterList.length)];
    character = randCharacter.name;
    console.log(character);


    maxGuesses = character.length >= 7 ? 10 : 8;
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerText = randCharacter.hint;
    guessLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters;
    image = randCharacter.img;

    inputs.innerHTML = "";
    for(let i = 0 ; i < character.length; i ++){
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }
    for(let i = 0; i < character.length; i ++){
        if(character[i] == " "){
            inputs.querySelectorAll("input")[i].value +="_";
            correctLetters += "_";
        }

    }
}

function handleInputs(e){
    const key = e.target.value.toLowerCase();
    if(key.match(/^[a-z0-9]+$/i) && !incorrectLetters.includes(key) && !correctLetters.includes(key)){
            if(character.includes(key)){

                for(let i = 0; i < character.length; i ++){
                    if(character[i] == key){
                        inputs.querySelectorAll("input")[i].value +=key;
                        correctLetters += key;
                    }

                }

            }
            else{
                maxGuesses--;
                incorrectLetters.push(key);
                mistakes.innerText = incorrectLetters;

            }
    }

    guessLeft.innerText = maxGuesses;
    if(correctLetters.length === character.length){
        //alert(`Congrats! The Character is ${character.toUpperCase()}`);
        //startNewGame();
        const modal = document.querySelector(".modal");
        const title = document.querySelector(".title");
        const image2 = document.querySelector("img").src = image;
        title.innerHTML = "Congrats! The Character is " + character;
        openModal(modal);
    }else if(maxGuesses < 1){
       // alert("Game Over! Ran out of Guesses!")
        for(let i = 0; i < character.length; i ++){
            inputs.querySelectorAll("input")[i].value = character[i];
        }
        const modal = document.querySelector(".modal");
        const title = document.querySelector(".title");
        const image2 = document.querySelector("img").src = image;
        title.innerHTML = "Game Over! The Character is " + character;
        openModal(modal);
    }

    typeInput.value = "";

}

function showHintElement(){
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";

}

resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInputs);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());


overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal);
    })
  })
  
  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    })
  })
  
  function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active');
    overlay.classList.add('active');
  }
  
  function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active');
    overlay.classList.remove('active');
    startNewGame();
  }



startNewGame();