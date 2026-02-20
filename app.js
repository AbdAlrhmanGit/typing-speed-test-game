/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup *
  [02] Add Styling And Separate From Logic *
  [03] Create The App Logic
  ---- [01] Add Levels *
  ---- [02] Show Level And Seconds *
  ---- [03] Add Array Of Words *
  ---- [04] ِAdd Start Game Button *
  ---- [05] Generate Upcoming Words *
  ---- [06] Disable Copy Word And Paste Event + Focus On Input *
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
let selctedLevel = "Normal";
let Levelseconds = lvls[selctedLevel];
// game elements
let lvlSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let currentWord = document.querySelector(".the-word");
let input = document.querySelector("input");
let upcomingWords = document.querySelector(".upcoming-words");
let remainingTime = document.querySelector(".control .time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finish = document.querySelector(".finish");
// setting the level properties
lvlSpan.innerHTML = selctedLevel;
secondsSpan.innerHTML = Levelseconds;
remainingTime.innerHTML = Levelseconds;
scoreTotal.innerHTML = words.length;
// disable paste in input
input.onpaste = () =>{
  return false
}
// start the game
startBtn.onclick = () => {
  startBtn.remove();
  input.focus()
  input.value = ""
  generateUpComingWords();
};
function generateUpComingWords() {
  // Upcoming words
  for (i = 0; i < words.length; i++) {
    let span = document.createElement("span");
    span.className = "word";
    span.innerHTML = words[i];
    upcomingWords.appendChild(span);
  }
  // the current word
  let index = Math.floor(Math.random() * words.length)
  currentWord.innerHTML = words[index]
  startPlay(index)
}

function startPlay(index){
  interval = setInterval(()=>{
    remainingTime.innerHTML--
    if (remainingTime.innerHTML === "0"){
        clearInterval(interval)
        if(input.value.toLowerCase() === currentWord.innerHTML.toLowerCase()){
          input.value = ""
          scoreGot.innerHTML++
          words.splice(index, 1)
          remainingTime.innerHTML = `${Levelseconds}`
          upcomingWords.innerHTML = ``
          currentWord.innerHTML = ""
          if (scoreGot.innerHTML === scoreTotal.innerHTML){
            // winner message
            let span = document.createElement("span");
            span.className = "good";
            span.innerHTML = `Cogratulations!!`;
            finish.appendChild(span)
            finish.appendChild(highSocreSpan)
            return;
          }
          generateUpComingWords()
        }else{
          // Game Over Message
          let span = document.createElement("span");
          span.className = "bad";
          span.innerHTML = `GameOver`;
          finish.appendChild(span)
        }
      }
    },1000)
}