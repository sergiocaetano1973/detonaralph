const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! o seu resultado foi: " + state.values.result);

    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.square.forEach((square)=>{
       square.classList.remove("enemy");
       
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSaquare = state.view.square[randomNumber];
       randomSaquare.classList.add("enemy");
       state.values.hitPosition = randomSaquare.id;
}



function addListnerHitBox() {
    state.view.square.forEach((square)=>{ 
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition) {
                state.values.result ++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}


function initialize() {  
    
    addListnerHitBox();
}

initialize();
