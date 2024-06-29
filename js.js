console.log("Welcome to tic tac toe game");

let music = new Audio('music.mp3');
let audioTurn = new Audio('ting.mp3');
let gameover = new Audio('gameover.mp3');
let turn = "X";
let isgameover = false;

const changeTurn = () => turn === "X" ? "O" : "X";

const checkWin = () => {
    let boxtext = document.querySelectorAll('.boxText');
    let wins = [
        [0, 1, 2, 0, 5, 0],      // Horizontal top row
        [3, 4, 5, 0, 15, 0],      // Horizontal middle row
        [6, 7, 8, 0, 25, 0],      // Horizontal bottom row
        [0, 3, 6, -10, 16, 90],   // Vertical left column
        [1, 4, 7, 0, 16, 90],    // Vertical middle column
        [2, 5, 8, 10, 16, 90],    // Vertical right column
        [0, 4, 8, 3, 18, 45],    // Diagonal from top-left to bottom-right
        [2, 4, 6, -3, 18, 135]    // Diagonal from top-right to bottom-left
    ];
    
    
    for (let i = 0; i < wins.length; i++) {
        if (boxtext[wins[i][0]].innerText === boxtext[wins[i][1]].innerText &&
            boxtext[wins[i][1]].innerText === boxtext[wins[i][2]].innerText &&
            boxtext[wins[i][0]].innerText !== "") {
            document.querySelector('.info').innerText = boxtext[wins[i][0]].innerText + " Won";
            isgameover = true;
            gameover.play();
            // document.querySelector(".img-box").style.display = "block";
            document.getElementById("win-img").style.width = "200px";  
            document.querySelector(".line").style.width = "30vw";
            document.querySelector(".line").style.transform = "translate(" + wins[i][3] + "vw," + wins[i][4] + "vw) rotate(" + wins[i][5] + "deg)";         
            return;
        }
    }
}

// Game Logic

let boxes = document.getElementsByClassName('box');
boxes = Array.from(boxes);
boxes.forEach(element => {
    let boxtext = element.querySelector('.boxText');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    })
});

// Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxText');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.getElementById("win-img").style.width = "0px";
    document.querySelector(".line").style.width = "0vw";        
    document.querySelector(".info").innerText = "Turn for " + turn;
});
