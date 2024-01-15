let gameSeq = [];
let userSeq = [];

let hgScore = 0;

let started = false;
let level = 0;
let count = 0;

var scream = new Audio(
  "http://soundbible.com/mp3/Female_Scream_Horror-NeoPhyTe-138499973.mp3"
);

let boxes = document.querySelectorAll(".box");

document.addEventListener("keydown", (e) => {
  if (started == false) {
    count = 0;
    userSeq = [];
    upLevel();
    started = true;
  }
});

document.getElementById("start").addEventListener("click", function (e) {
  if (started == false) {
    e.target.innerText = "Reset";
    count = 0;
    gameSeq = [];
    upLevel();
    started = true;
  } else if (this.innerText == "Reset") {
    reset();
  document.querySelector("h2").innerText = `Level ${level}`;
  }
});

function upLevel() {
  level++;
  document.querySelector("h2").innerText = `Level ${level}`;

  for (let i = 0; i < level; i++) {
    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * boxes.length);
      flashBox(randomNum);
    }, 900 * i);
  }
}

function flashBox(randnum) {
  boxes[randnum].classList.add("active");
  checkTone(boxes[randnum].id);

  setTimeout(() => {
    boxes[randnum].classList.remove("active");
  }, 600);

  gameSeq.push(boxes[randnum].id);
  userSeq = [];

  boxes.forEach((elm) => {
    elm.addEventListener("click", userSelect);
  });
}

function userSelect() {
  this.classList.add("active");
  let checkAns;
  count++;
  userSeq.push(this.id);
  checkTone(this.id);

  setTimeout(() => {
    this.classList.remove("active");
  }, 300);
  if (count == level) {
    setTimeout(() => {
      checkAns = check();
      if (checkAns) {
        upLevel();
      } else {
        document.querySelector(
          "h2"
        ).innerHTML = `GAME OVER! Your score was <span class='result'>${level}</span><br> Press Any key to restart`;
        scream.play();
        highScore(level);
        reset();
      }
    }, 600);
  }
}

function checkTone(id) {
  // Sound files
  var greenBoop = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  );
  var redBoop = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  );
  var yellowBoop = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  );
  var blueBoop = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  );

  if (id == "red") {
    redBoop.play();
  } else if (id == "green") {
    greenBoop.play();
  } else if (id == "blue") {
    blueBoop.play();
  } else if (id == "yellow") {
    yellowBoop.play();
  }
}

function highScore(num){
  if(num > hgScore){
    document.getElementById('highScore').innerHTML = `Your Last High Score is <span class='result'>${num}</span>`;
  }
  else{
    document.getElementById('highScore').innerHTML = `Your Last High Score is <span class='result'>${num}</span>`;
  }
}


function reset(){
  gameSeq = [];
  userSeq = [];
  level = 0;
  count = 0;
  document.getElementById("start").innerText = "Start";
  started = false;
}
function check() {
  for (let i = 0; i < gameSeq.length; i++) {
    if (gameSeq[i] != userSeq[i]) {
      return false;
    }
  }

  gameSeq = [];
  userSeq = [];
  count = 0;
  return true;
}
