//VECTOR OF AVAILABLE WORDS IN GAME
const words = ["figma", "balls", "house", "car"];
const word = words[Math.floor(Math.random() * words.length)];
var guessed = "";
var misses = [];
var imageNum = 0;


function updateGuessed() {
    aux = document.getElementById("guessing_word");
    aux.innerHTML = "";
    for (let i = 0; i < guessed.length; i++) {
        aux.innerHTML += guessed.charAt(i) + " ";
        console.log(aux.innerHTML);
    }
}

function updateImage() {
    imageNum++;
    aux = document.getElementById("hangman_img");
    aux.src = "img/hangman_" + imageNum + ".png";
}

function startGame() {
    document.getElementById("player_name").style.display = 'none';
    document.getElementById("game").style.display = 'flex';

    //ajustar caracters
    player_name = document.getElementById("name_input").value;
    document.getElementById("player_name_header").innerHTML = player_name;

    //llargada dels _ _ _
    for (let i = 0; i < word.length; i++) {
        guessed += '_';
    }

    updateGuessed();
}

function validateCharacter() {
    //TODO: COMPROVAR QUE NO HAGUEM FET SERVIR AQUESTA LLETRA ABANS
    let char = document.getElementById("guessed_char").value[0];
    let finish = false;
    let i = 0;
    while (i < word.length) {
        console.log(char);
        console.log(word.charAt(i));
        if (word.charAt(i) == char) {
            console.log("hello");
            finish = true;
            guessed[i] = char; //TODO: fix
        }
        i++;
    }
    if (finish == false) {
        misses.push(char);
        updateImage();
    } else {
        updateGuessed();
    }
}