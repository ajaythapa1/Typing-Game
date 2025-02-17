let time_left = 30;

let quotes_array = [
    "Push yourself, because no one else is going to do it for you.",
    "Failure is the condiment that gives success its flavor.",
    "Wake up with determination. Go to bed with satisfaction.",
    "It's going to be hard, but hard does not mean impossible.",
    "Learning never exhausts the mind.",
    "The only way to do great work is to love what you do."
];

let timer_text = document.querySelector("#time-left");
let wpm_text = document.querySelector("#wpm-word");
let cpm_text = document.querySelector("#cpm-word");
let error_text = document.querySelector("#error-num");
let acc_text = document.querySelector("#acc-word");
let quotes_text = document.querySelector(".quote");
let input_text = document.querySelector(".input-text");
let reset_button = document.querySelector(".reset_button");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".error");
let accuracy_group = document.querySelector(".acc");


let timeleft = time_left;
let timeElapsed = 0;
let total_errors = 0;
let error = 0;
let accuracy = 0;
let character_typed = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;
let correctedChar = 0;
let difficulty_id;

document.addEventListener("DOMContentLoaded", function () {
    difficulty_id = "normal"
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("time-second")) {
        $(".time-second").css('background', '#de8808');
        $(e.target).css('background', '#ccda46');

        console.log(e.target.innerHTML);
        time_left = e.target.innerHTML;
        timer_text.innerHTML = time_left + "s";
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("difficulty")) {
        let difficulty_level = e.target.textContent;
        switch (difficulty_level) {
            case "normal":
                difficulty_id = "normal";
                break;

            case "master":
                difficulty_id = "master";
                break;
            default:
                difficulty_id = "expert";
                break;
        }

        $(".input-text").attr("id", difficulty_id);

        $(".difficulty").css('background', '#de8808');
        $(e.target).css('background', '#ccda46');
    }
});


function startGame() {
    reset();
    updatedQuotes();

    clearInterval(timer);
    timer = setInterval(updatedTimer, 1000);
}

function updatedTimer() {
    if (timeleft > 0) {
        timeleft--;

        timeElapsed++;

        timer_text.innerHTML = timeleft + "s";
    }
    else {
        fininshgame();
    }
}

function fininshgame() {

    clearInterval(timer);
    input_text.disabled = true;

    quotes_text.textContent = "Click the area below to start the game";

    $(".wpm").show();
    $(".cpm").show();
    $(".reset_button").show();

    console.log(correctedChar, timeElapsed);
    cpm = Math.round((correctedChar / timeElapsed) * time_left);

    wpm = Math.round(((correctedChar / 5) / timeElapsed) * time_left);

    wpm_text.innerHTML = wpm;
    cpm_text.innerHTML = cpm
}

function updatedQuotes() {
    quotes_text.textContent = "";
    current_quote = quotes_array[quoteNo];
    current_quote.split('').forEach(char => {
        const charspan = document.createElement('span')
        charspan.innerText = char;
        quotes_text.appendChild(charspan);
    })
    if (quoteNo < quotes_array.length - 1) {

        quoteNo++
    }
    else {
        fininshgame();
        // document.addEventListener('input', () =>{
        //     if(current_quote == inp)
        //     fininshgame();
        // })
       
    }

}

function processCurrentText() {
    curr_input = input_text.value;
    current_input_array = curr_input.split('');

    character_typed++;

    error = 0;

    if (difficulty_id == "normal") {
        quoteSpanArray = quotes_text.querySelectorAll('span');
        quoteSpanArray.forEach((char, index) => {
            let typedChar = current_input_array[index];
            if (typedChar == null) {
                char.classList.add('next-char');
                char.classList.remove('incorrect-char');
                char.classList.remove('correct-char');
            }
            else if (typedChar == char.innerText) {
                char.classList.remove('next-char');
                char.classList.add('correct-char');
            }
            else {
                char.classList.remove('correct-cha');
                char.classList.add('incorrect-char');

                error++
            }

        });
    }

    else if (difficulty_id == "master") {
        quoteSpanArray = quotes_text.querySelectorAll('span');
        quoteSpanArray.forEach((char, index) => {
            let typedChar = current_input_array[index];
            if (typedChar == null) {
                char.classList.add('next-char');
                char.classList.remove('incorrect-char');
                char.classList.remove('correct-char');
            }
            else if (typedChar == char.innerText) {
                char.classList.remove('next-char');
                char.classList.add('correct-char');
            }

            else if (typedChar == " ") {
                fininshgame();
            }
            else {
                char.classList.remove('correct-cha');
                char.classList.add('incorrect-char');
                error++
            }

        });
    }

    else {
        quoteSpanArray = quotes_text.querySelectorAll('span');
        quoteSpanArray.forEach((char, index) => {
            let typedChar = current_input_array[index];
            if (typedChar == null) {
                char.classList.add('next-char');
                char.classList.remove('incorrect-char');
                char.classList.remove('correct-char');
            }
            else if (typedChar == char.innerText) {
                char.classList.remove('next-char');
                char.classList.add('correct-char');
            }
            else {
                fininshgame();
                error++
            }

        });
    }

    error_text.innerHTML = total_errors + error;

    correctedChar = (character_typed - (total_errors + error))
    let correctaAcc = (correctedChar / character_typed) * 100;
    acc_text.innerHTML = Math.floor(correctaAcc);

    if (curr_input.length == current_quote.length) {
        updatedQuotes();

        total_errors += error;

        input_text.value = "";
    }
}

function reset() {
    timeleft = time_left;
    timeElapsed = 0;
    total_errors = 0;
    error = 0;
    accuracy = 0;
    character_typed = 0;
    quoteNo = 0;
    input_text.disabled = false;
    clearInterval(timer);

    quotes_text.textContent = "Click the area below to start the game";
    input_text.value = "";
    timer_text.textContent = timeleft + 's';
    error_text.textContent = 0;
    acc_text.textContent = 100;
    wpm_text.textContent = 0;
    cpm_text.textContent = 0;

    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}

