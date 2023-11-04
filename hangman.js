//VECTOR OF AVAILABLE WORDS IN GAME
const words = ["hello","bye","javascript"];
var word = words[Math.floor(Math.random() * words.length)];
var guessed = "";
var misses = [];
var imageNum = 0;

//https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}


function updateGuessed() {
    aux = document.getElementById("guessing_word");
    aux.innerHTML = "";
    for (let i = 0; i < guessed.length; i++) {
        aux.innerHTML += guessed.charAt(i) + " ";
    }
    console.log(aux.innerHTML);
}

function updateImage() {
    imageNum++;
    aux = document.getElementById("hangman_img");
    aux.src = "img/hangman_" + imageNum + ".png";
}

function startGame() {
    player_name = document.getElementById("name_input").value;

    if (player_name === "") {
        alert("El nom del jugador no pot ser buit.");
        return false;
    }

    document.getElementById("player_name").style.display = 'none';
    document.getElementById("game").style.display = 'flex';

    //ajustar caracters
    document.getElementById("player_name_header").innerHTML = player_name;

    //llargada dels _ _ _
    for (let i = 0; i < word.length; i++) {
        guessed += '_';
    }

    updateGuessed();
}

function addMiss(char) {
    let doc = document.getElementById("wrong_chars");
    let para = document.createElement("p");
    para.innerHTML = char.toUpperCase();
    doc.appendChild(para);
}

function validateCharacter() {
    let doc = document.getElementById("guessed_char");
    let char = doc.value.toLowerCase()[0];

    if (doc.value === "") {
        alert("El caràcter no pot ser buit.");
        return false;
    }

    doc.value = "";
    let finish = false;
    let i = 0;
    while (i < word.length) {
        console.log(char);
        console.log(word.charAt(i));
        if (word.charAt(i) == char) {
            console.log("hello");
            finish = true;
            guessed = setCharAt(guessed, i, char);
        }
        i++;
    }
    if (finish == false && !misses.includes(char)) {
        misses.push(char);
        addMiss(char);
        if (misses.length < 9) { //you have a maximum of 8 tries
            updateImage();
        }
        else {
            setTimeout(function(){
                if (confirm("Has perdut!\nPrem d'acord per a començar una nova partida.")) {
                    restartMatch();
                }
            }, 100);
        }
    } else {
        updateGuessed();
        if (!guessed.includes("_")) {
            setTimeout(function(){
                if (confirm("Has guanyat!\nPrem d'acord per a començar una nova partida.")) {
                    restartMatch();
                }
            }, 100); //god forgive me for my sins
        }
    }
}

function restartMatch() {
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