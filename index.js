let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let count  = 0;

let boxes = document.querySelectorAll(".box");

document.addEventListener("keydown", (e) => {
  if (started == false) {
    upLevel();
    started = true;
  }
});

document.getElementById('start').addEventListener('click', function () {
  count = 0;
  if (started == false) {
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
    }, 600 * i);
  }
}

function flashBox(randnum) {
  boxes[randnum].classList.add("active");

  setTimeout(() => {
    boxes[randnum].classList.remove("active");
  }, 500);

  gameSeq.push(boxes[randnum].id);

  boxes.forEach((elm) => {
    elm.addEventListener("click", userSelect);
  });
}

function userSelect() {
  let checkAns;
  count++;
  userSeq.push(this.id);

  if(count == level){
    checkAns = check();
    if (checkAns) {

      upLevel();
    } else {
      document.querySelector(
        "h2"
      ).innerHTML = `GAME OVER! Your score was <span class='result'>${level}</span><br> Press Any key to restart`;
      gameSeq = [];
      userSeq = [];
      level = 0;
      count = 0;
      started = false;
    }
  }
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
