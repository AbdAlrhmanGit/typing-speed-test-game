// Array Of Words
let EasyWords = [
  "Hello",
  "Code",
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
  "Paradigm",
  "Styling",
  "Cascade",
  "Coding",
  "Funny",
  "Working",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
  // "Programming",    normal
  // "Javascript",     normal
  // "Dependencies",   hard 
  // "Destructuring",  hard
  // "Documentation",  hard
];
let NormalWords = EasyWords.concat(["Programming", "Javascript"])
let HardWords = EasyWords.concat(["Dependencies", "Documentation", "Destructuring"], ["Programming", "Javascript"])
// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
let selctedLevel = "Easy";
let Levelseconds = lvls[selctedLevel];
let words = EasyWords
let highScore = 0
// game elements
let levelSelect = document.querySelector(".message select")
let secondsSpan = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let currentWord = document.querySelector(".the-word");
let input = document.querySelector("input");
let upcomingWords = document.querySelector(".upcoming-words");
let remainingTime = document.querySelector(".control .time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finish = document.querySelector(".finish");
// instructions elements 
let instruDiv = document.querySelector(".game-instructions")
let instruSeconds = document.querySelector(".game-instructions ul .seconds")
let instruWordsLength = document.querySelector(".game-instructions ul .length")
let instruSecondsOnstart = document.querySelector(".game-instructions ul .firstSeconds")
// setting the level properties
setLvlProps()
function setLvlProps(){
  secondsSpan.innerHTML = Levelseconds;
  remainingTime.innerHTML = Levelseconds;
  scoreTotal.innerHTML = words.length;
  instruSeconds.innerHTML = Levelseconds
  instruWordsLength.innerHTML = words.length
  instruSecondsOnstart.innerHTML = Levelseconds + 3
  // setting highScore properties
  getFormStorage()
}
function setWordsList(){
    words = []
  if (levelSelect.value === "Normal"){
    words = NormalWords
  }else if (levelSelect.value === "Hard"){
    words = HardWords
  }else{
  words = EasyWords
  }
}
// choose the level
levelSelect.onclick = () => {
  selctedLevel = levelSelect.value
  Levelseconds = lvls[selctedLevel];
  //  updating words list 
  setWordsList()
  // updating the level properties
  setLvlProps()
  // update high score div properties
  getFormStorage()
  // save the current level
  saveTheSession()
}
// disable paste and drop in input
input.onpaste = () => false;
input.ondrop = () =>false;
// start the game
startBtn.onclick = () => {
  startBtn.remove();
  instruDiv.remove()
  input.focus()
  input.value = ""
  generateUpComingWords();
  addSecondsForFirstWord()
  levelSelect.onclick = () => false;
};
// enter to start 
          window.onkeyup = (e)=>{
            if (e.key == "Enter"){
              startBtn.click()
            }
          }
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
function addSecondsForFirstWord() {
  remainingTime.innerHTML = `${Levelseconds + 3}`
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
            // Save the new high score
            addToStorage()
            return;
          }
          generateUpComingWords()
        }else{
          // Game Over Message
          let span = document.createElement("span");
          span.className = "bad";
          span.innerHTML = `GameOver`;
          finish.appendChild(span)
          // enter to reset 
          window.onkeyup = (e)=>{
          console.log(e.key)
          if (e.key == "Enter"){
            window.location.reload()
          }
          }
          // Save the new high score
            addToStorage()
        }
      }
    },1000)
}

// local storage fucntions
function getFormStorage(){
  if (window.localStorage.getItem(selctedLevel + "HighScore") === null){
    document.querySelector(".high-score").style.opacity = 0
  }else{
    document.querySelector(".high-score").style.opacity = 1
    document.querySelector(".h-score").innerHTML = window.localStorage.getItem(selctedLevel + "HighScore");
    document.querySelector(".h-date").innerHTML = window.localStorage.getItem(selctedLevel + "HighScoreDate").slice(4,15);
  }
}
function addToStorage(){
  if (+scoreGot.innerHTML > highScore){
    highScore = +scoreGot.innerHTML
    window.localStorage.setItem(selctedLevel + "HighScore", highScore)
    window.localStorage.setItem(selctedLevel + "HighScoreDate", new Date())
  }
}
// sesstion storage functions
function saveTheSession() {
  window.sessionStorage.setItem("currentLevel", levelSelect.value)
}
function reloadTheSession(){
  if (window.sessionStorage.getItem("currentLevel") != null) {
    levelSelect.value = window.sessionStorage.getItem("currentLevel");
    selctedLevel = levelSelect.value;
    Levelseconds = lvls[selctedLevel];
    setWordsList()
    setLvlProps()
  }else return;
}
reloadTheSession()