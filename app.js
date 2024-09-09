
let userSequence = [];
let gameSequence = [];

let started = false;
let level = 0;

let p = document.querySelector("p");
let colors = ['red', "green", "blue", "orange"];


function btnFlash(color,daley) {
    let btn=document.querySelector(`.${color}`);
    btn.classList.add("flash");

     setTimeout(() => {
        btn.classList.remove("flash");
    },daley);

}

function randomBtnPress() {
    // level++;
    if(level==0){
    p.innerText = "Game started!.Best of Luck"
    }

    let randNum = Math.floor(Math.random() * 3);
    let btnColor = colors[randNum];

    btnFlash(btnColor,250);
    gameSequence.push(btnColor);

}

document.addEventListener('keypress', () => {
    if (started == false) {
        console.log("game stated");
        started = true;
        randomBtnPress();
    }
});


function resetUserTrack() {
    while (userSequence.length != 0) {
        userSequence.pop();
    }
}
function reseGameTrack() {
    while (gameSequence.length != 0) {
        gameSequence.pop()
    }
}

function bodyBackGroundColor(){
    let body=document.querySelector(".game-container");
    body.style.backgroundColor='red';
    setTimeout(()=>{
        body.style.backgroundColor='#c4ffff';
    },1500)
}

//reset button
let button = document.querySelector("button");
button.addEventListener("click", () => {
    reseGameTrack();
    resetUserTrack();
    randomBtnPress();
    level = 0;
    p.innerText = `Try again!.Best of Luck`;
})

// game statedt
let i=0;
let boxBtns = document.querySelectorAll(".box");
for (let boxBtn of boxBtns) {
    boxBtn.addEventListener('click', function (e) {
        let btnColor = e.target.classList[1];
        console.log(" user click btn", btnColor);

        btnFlash(btnColor,250);
        userSequence.push(btnColor);

        // check  the user gameSequence and userSequence
        if(gameSequence[i]==userSequence[i]){
              i++;

          } else{
            i=0;
            p.innerHTML=`Game Over!.Your Score is: <b style={'color:blue; size:50px;'}>${level}</b><br/><p style="text-align:center;">Try Again!</p>`
            bodyBackGroundColor();
            resetUserTrack();

            let flasColor=0
            
            const intervalId=setInterval(()=>{
    
                btnFlash(gameSequence[flasColor],250)
                flasColor++;
            },1000)
            return ()=>clearInterval(intervalId);

          
        }
         
        // if userSequence and gameSequence both are same path clictk then update the value and level 
         if(gameSequence.length==userSequence.length){
            i=0;
            level++;
            console.log("level update",level)
            p.innerText = `Level:${level}`
            resetUserTrack();
            console.log("userLength",userSequence.length)

              setTimeout(() => {
                
                  randomBtnPress();
              }, 1000);       
         }
        
    })
}







