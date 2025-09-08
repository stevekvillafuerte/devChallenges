// script.js

const words = ["example", "javascript", "coding", "challenge","flower"];
let currentWord = "";
let tries = 0;
let mistakes = 0;

function scrambleWord(word) {
  // Scramble and return the scrambled word
  let arr = word.split(""); 
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
  }
  return arr.join("")
}

function generateRandomWord() {
  // Generate and display scrambled word
  let word = words[Math.floor(Math.random() * words.length)]
  let scrambled = scrambleWord(word)
  currentWord = word
  let scrambleres = document.getElementById("scrambleWord")
  scrambleres.textContent = scrambled

  createInputFields(word.length)
  console.log(currentWord)

}

function createInputFields(length) {
  // Create number of input fields according to the number of letters
  document.querySelector(".ans").innerHTML = "";
  let input = document.querySelectorAll(".letterInput");
  for(let i = 0; i<length;i++){
    let input = document.createElement("input");
    input.classList.add("letterInput");
    input.setAttribute("data-index", i)
    //input.addEventListener("input", handleInput);;
    document.querySelector(".ans").appendChild(input)
  }
}

// function handleInput(event) {
//   // Handle input change event
//   const input = event.target;
//   const index = parseInt(input.getAttribute("data-index")); // get index
//   const value = input.value.toLowerCase(); // optional: lowercase user input

//   if (value === currentWord[index]) {
//     input.classList.add("right");
//   } else {
//     input.classList.remove("right");
//   }
// }

function resetGame() {
  document.querySelector("#mistakes").textContent =  `Mistakes:`
  tries = 0
  generateRandomWord();
}

function checkAnswer(){
  let inputs = document.querySelectorAll(".letterInput");
  let isCorrect = true;

  inputs.forEach((input, index) => {
    let value = input.value.toLowerCase();
    if (tries>4){
      resetGame();
    }

    if (value === currentWord[index]) {
      input.classList.add("right");
    } else {
      input.classList.remove("right");
      isCorrect = false;
      document.querySelector("#mistakes").textContent +=  `${value}, `
    }
  });

  tries+=1
  document.querySelector("#tries").textContent = `Tries(${tries}/5)`
  if (isCorrect) {
    alert("✅ Correct! You unscrambled the word!");
  } else {
    alert("❌ Try again!");
  }

}
document.getElementById("check").addEventListener('click',checkAnswer);
document.getElementById("random").addEventListener("click", generateRandomWord);
document.getElementById("reset").addEventListener("click", resetGame);


// Initial load
generateRandomWord();