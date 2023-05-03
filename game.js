// define the time limit
let TIME_LIMIT = 30;

// define quotes to be used
let quotes_array = [
  "Push yourself because no one else is going to do it for you Failure is the condiment that gives success its flavor",
  "Wake up with determination Go to bed with satisfaction It is going to be hard but hard does not mean impossible Learning never exhausts the mind ",
  "The only way to do great work is to love what you do carefulness and persistent effort or work is not listed as one of the seven heavenly virtues It is indicative of a work ethic the belief that work is good in itself",
  "There is a perennial nobleness and even sacredness in work Were he never so benighted forgetful of his high calling there is always hope in a man that actually and earnestly works: in idleness alone there is perpetual despair",
  "As I sit in my room late at night staring at the computer screen I decide it would be a good idea to create this text There isn t much meaning to it other than to get some simple practice A lot of the texts that have been created are rather short and don not give a good one",
  "I have never been given to envy save for the envy I feel toward those people who have the ability to make a marriage work and endure happily",
  "I do not run away from a challenge because I am afraid Instead I run toward it because the only way to escape fear is to trample it beneath your feet",
  "When you are young you look at television and think there is a conspiracy The networks have conspired to dumb us down But when you get a little older you realize that s not true The networks are in business to give people exactly what they want",
  "I choose my friends for their good looks my acquaintances for their good characters and my enemies for their intellects A man cannot be too careful in the choice of his enemies",
];

for (let i = 0; i <= quotes_array.length - 1; i++) {
  quotes_array[i] = quotes_array[i].toLowerCase();
}

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
const keySound = document.getElementById("keySound");
const sound = document.querySelector(".sound");
sound.addEventListener("click", sounding);
let is_muted = false;

function sounding() {
  input_area.focus();
  if (is_muted == false) {
    keySound.muted = true;
    sound.style.opacity = ".3";
  } else {
    keySound.muted = false;
    sound.style.opacity = "1";
  }
  is_muted = true;
}

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  let randomParagraph = Math.floor(
    Math.random(quotes_array) * quotes_array.length
  );

  current_quote = quotes_array[randomParagraph];
  // separate each character and make an element
  // out of each of them to individually style them
  current_quote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.classList.add("characters");
    charSpan.innerText = char;
    quote_text.appendChild(charSpan);
  });

  // roll over to the first quote
  if (quoteNo < quotes_array.length - 1) quoteNo++;
  else quoteNo = 0;
}

// toNext();

function processCurrentText() {
  // get current input text and split it
  let curr_input = input_area.value;
  let curr_input_array = curr_input.split("");
  // increment total characters typed
  characterTyped++;
  // toNext();

  errors = 0;

  let quoteSpanArray = quote_text.querySelectorAll("span");
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];
    keySound.currentTime = 0;
    keySound.play();
    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove("correct_char");
      char.classList.remove("incorrect_char");

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_char");
      char.classList.remove("incorrect_char");

      // incorrect characters
    } else {
      char.classList.add("incorrect_char");
      char.classList.remove("correct_char");
      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal) + "%";

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();
    // update total errors
    total_errors += errors;
    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;
    // increase the time elapsed
    timeElapsed++;
    // update the timer text
    timer_text.textContent = timeLeft + "s";
  } else {
    // finish the game
    finishGame();
  }
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.innerHTML = "Click here to type again";
  timer_text.textContent = timeLeft + "s";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
  document.querySelector(".timer").style.display = "block";
}

function startGame() {
  resetValues();
  error_text.textContent = 0;
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  accuracy_text.textContent = 100 + "%";
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // calculate cpm and wpm
  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;
  document.querySelector(".timer").style.display = "none";

  // display the cpm and wpm

  resetValues();
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
  quote_text.textContent = "Click here to type again";
}
