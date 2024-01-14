let gameSeq = [];
let userSeq = [];


// Sound files
var greenBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var redBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueBoop = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var scream = new Audio("http://soundbible.com/mp3/Female_Scream_Horror-NeoPhyTe-138499973.mp3");
var cheer = new Audio("http://soundbible.com/mp3/Kids%20Cheering-SoundBible.com-681813822.mp3");




let started = false;
let level = 0;
let count  = 0;

let boxes = document.querySelectorAll(".box");

document.addEventListener("keydown", (e) => {
  if (started == false) {
    count = 0;
    upLevel();
    started = true;
  }
});

document.getElementById('start').addEventListener('click', function () {
  if (started == false) {
    count = 0;
    upLevel();
    started = true;
  }
})


function upLevel() {
  level++;
  document.querySelector("h2").innerText = `Level ${level}`;
  for(let i = 0; i < level; i++){
    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * boxes.length);
      flashBox(randomNum); 
    }, 1000 * i);
  }
}

function flashBox(randnum) {

  boxes[randnum].classList.add("active");

  if(boxes[randnum].id == 'red'){
    redBoop.play();
  }
  else if(boxes[randnum].id == 'green'){
    greenBoop.play();
  }
  else if(boxes[randnum].id == 'blue'){
    blueBoop.play()
  }
  else if(boxes[randnum].id == 'yellow'){
    yellowBoop.play();
  }
  setTimeout(() => {
    boxes[randnum].classList.remove("active");
  }, 600);

  gameSeq.push(boxes[randnum].id);

  boxes.forEach((elm) => {
    elm.addEventListener("click", userSelect);
  });
}

function userSelect() {
  this.classList.add('active');
  let checkAns;
  count++;
  userSeq.push(this.id);

  if(this.id == 'red'){
    redBoop.play();
  }
  else if(this.id == 'green'){
    greenBoop.play();
  }
  else if(this.id == 'blue'){
    blueBoop.play()
  }
  else if(this.id == 'yellow'){
    yellowBoop.play();
  }

  setTimeout(() => {
  this.classList.remove('active');
  }, 300);
  setTimeout(() => {
    if(count == level){
      checkAns = check();
      if (checkAns) {
        upLevel();
      } else {
        document.querySelector(
          "h2"
        ).innerHTML = `GAME OVER! Your score was <span class='result'>${level}</span><br> Press Any key to restart`;
        scream.play();
        gameSeq = [];
        userSeq = [];
        level = 0;
        count = 0;
        started = false;
      }
    }
  }, 600);

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
