let random = document.querySelector("#random")

const url = "https://game-of-thrones-quotes.herokuapp.com/v1/random/5"

async function getData() {
    let response = await fetch(url)
    let data = await response.json()

    let randomWord = Math.floor(Math.random() * data.length)

    random.innerHTML = data[randomWord].sentence;
}  
getData();

//Skip
let skipEffect = new Audio("skip.mp3")
function skip() {
    score++
    displayScore.innerHTML = score;
    getData();
    skipText.style.display = "none";
    typedWord.value = ""

    let extraTime = [3, 5, 8, 10, 12, 15];
    let randomNumber = Math.floor(Math.random() * extraTime.length);
    let randomTime = extraTime[randomNumber];
    time += randomTime;
}

let typedWord = document.querySelector("#typedWord");
let displayScore = document.querySelector("#score");
let score = 0;
let correct = new Audio("correct.mp3")
typedWord.addEventListener("keyup", () => {
    if(typedWord.value === random.innerText){
        score++
        displayScore.innerHTML = score;
        getData();
        typedWord.value = ""
        let extraTime = [3, 5, 8, 10, 12, 15];
        let randomNumber = Math.floor(Math.random() * extraTime.length);
        let randomTime = extraTime[randomNumber];
        time += randomTime;
        correct.play();
    }
})

// Timming
let refresh = document.querySelector("#refresh")
let showScore = document.querySelector("#showScore")
let showtime = document.querySelector("#time")
let time = 00;
function displayTime() {
    time--;
    showtime.innerHTML = time;
    if(time == 0){
        clearInterval(time)
        gameOver();
        gameSound.pause();
        refresh.style.display = "block"
        showScore.style.display = "block"
    }
}


let clock = document.querySelector("#clock")
let skipText = document.getElementById("skip")
let box = document.querySelector(".box")

//game over
let wrong = new Audio("wrong.mp3")
function gameOver() {
    time.innerHTML = ""
    random.innerHTML = "Time up!";
    typedWord.style.display = "none";
    clock.style.display = "none"
    skipText.style.display = "none"
    box.style.display = "none"
    wrong.play()
}

// start and back
let bgSound = new Audio("bgSound.mp3")
let startGame = document.querySelector("#start")
let back = document.querySelector("#back")
function start() {
    startGame.style.display = "none"
    back.style.display = "block"
    random.style.display = "block"
    time = 31;
    let counter = setInterval(displayTime, 1000);
    gameSound.loop = true;
}
back.addEventListener("click", function() {
    window.location.reload();
})

//volme on/off
let on = document.querySelector("#on")
let off = document.querySelector("#off")
off.addEventListener("click", function() {
    bgSound.pause();
    off.style.display = "none"
    on.style.display = "inline-block"
})
on.addEventListener("click", function() {
    bgSound.play();
    on.style.display = "none"
    off.style.display = "inline-block"
})

// refresh
refresh.addEventListener("click", function() {
    window.location.reload();
})