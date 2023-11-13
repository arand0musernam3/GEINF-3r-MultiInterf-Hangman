//VECTOR OF AVAILABLE WORDS IN GAME
//const words = ["hello","bye","javascript"];
const words = ["development","camera","breath","attraction","government","narrow","harmony","pleasure","responsible","substance","question","spring","yellow","hollow","thought","weather","motion","journey","fiction","committee"];
var word = words[Math.floor(Math.random() * words.length)];
var guessed = "";
var misses = [];
var imageNum = 0;
var wins = 0;
var loses = 0;

// Enter to submit
window.onload = function() {
    document.getElementById("name_input")
    .addEventListener("keyup", function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
            startGame();
        }
    });
    document.getElementById("guessed_char")
    .addEventListener("keyup", function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
            validateCharacter();
        }
    })
}

//Function to change a concrete char on a string
//https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

//Updates '_' of the guessed word
function updateGuessed() {
    aux = document.getElementById("guessing_word");
    aux.innerHTML = "";
    for (let i = 0; i < guessed.length; i++) {
        aux.innerHTML += guessed.charAt(i) + " ";
    }
    console.log(aux.innerHTML);
}

//Updates the image frame
function updateImage() {
    imageNum++;
    aux = document.getElementById("hangman_img");
    aux.src = "img/hangman_" + imageNum + ".png";
}

//Initiallizes the game
function startGame() {
    player_name = document.getElementById("name_input").value;

    if (player_name === "") {
        alert("Player's name can't be empty");
        return false;
    }

    //Unhidding the game
    document.getElementById("player_name").style.display = 'none';
    document.getElementById("game").style.display = 'flex';

    //Setting player name
    document.getElementById("player_name_header").innerHTML = player_name;

    //Length of the _ _ _
    for (let i = 0; i < word.length; i++) {
        guessed += '_';
    }

    updateGuessed();
}

//Adds a character to the missed character list
function addMiss(char) {
    let doc = document.getElementById("wrong_chars");
    let para = document.createElement("p");
    para.innerHTML = char.toUpperCase();
    doc.appendChild(para);
}

function validateCharacter() {
    let doc = document.getElementById("guessed_char");
    let char = doc.value.toLowerCase()[0];

    // Checks if it's empty
    if (doc.value === "") {
        alert("Guessed character can't be empty");
        return false;
    }

    doc.value = "";
    let finish = false;
    let i = 0;
    while (i < word.length) { //For each character of the real word...
        console.log(char);
        console.log(word.charAt(i));
        if (word.charAt(i) == char) { // Checks if there's a hit
            finish = true;
            guessed = setCharAt(guessed, i, char);
        }
        i++;
    }
    if (finish == false && !misses.includes(char)) { // There's a miss
        misses.push(char);
        addMiss(char);
        if (misses.length < 9) { //You have a maximum of 8 tries
            updateImage();
        }
        else {
            setTimeout(function(){
                loses++;
                alert("You lost!\nPress OK! to start a new game.");
                restartMatch();
            }, 100);
        }
    } else { //There's a hit
        updateGuessed();
        if (!guessed.includes("_")) { //If complete...
            setTimeout(function(){
                wins++;
                alert("You won!\nPress OK! to start a new game.");
                restartMatch();
            }, 100);
        }
    }
}

function restartMatch() {
    //update win/lose counters
    aux = document.getElementById("wins_loses");
    aux.innerHTML = "Wins: " + wins + ", Loses: " + loses;

    //restart image
    imageNum = 0;
    aux = document.getElementById("hangman_img");
    aux.src = "img/hangman_" + imageNum + ".png";

    //remove used characters
    misses = [];
    let doc = document.getElementById("wrong_chars");
    doc.replaceChildren();

    //randomly pick new word
    word = words[Math.floor(Math.random() * words.length)];
    guessed = "";
    
    for (let i = 0; i < word.length; i++) {
        guessed += '_';
    }
    
    updateGuessed();
}