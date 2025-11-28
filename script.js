const sentences = [
  "Artificial intelligence is rapidly transforming industries, enhancing productivity and enabling data-driven decision-making across multiple domains.The continuous advancement in AI algorithms, particularly in machine learning and deep learning, has led to breakthroughs in fields like healthcare, finance, and autonomous driving.",
  "As AI continues to evolve, it has the potential to redefine the way we live and work. AI-powered systems can analyze vast amounts of data in real-time, uncovering insights that would be impossible for humans to detect.The future of AI holds promises for even greater automation, improved efficiency.",
  "The rise of blockchain technology has brought about revolutionary changes in digital security, transparency, and decentralized finance.Blockchain is a distributed ledger system that allows for secure, transparent, and immutable record-keeping of transactions.",
  "Initially popularized by cryptocurrencies like Bitcoin, blockchain is now being adopted across various industries, from supply chain management to healthcare.The decentralized nature of blockchain eliminates the need for intermediaries, reducing costs and increasing trust among participants."
];

let currentSentence = "";
let currentLineIndex = 0;
let startTime;
let timerInterval;

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

function getNextLine() {
  if (currentLineIndex < sentences.length) {
    return sentences[currentLineIndex++];
  }
  return null;
}

function startTest() {
  currentLineIndex = 0; 
  currentSentence = getNextLine();
  
  sentenceEl.textContent = currentSentence;  
  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  inputEl.classList.remove('correct', 'incorrect');

  startTime = Date.now();
  timerEl.textContent = "Timer: 0s";
  wpmEl.textContent = "WPM: 0";
  accuracyEl.textContent = "Accuracy: 100%";

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  timerEl.textContent = `Timer: ${elapsed}s`;

  if (elapsed >= 45) {
    clearInterval(timerInterval);
    calculateStats();
    inputEl.disabled = true;
  }
}

function calculateStats() {
  const typed = inputEl.value;
  const totalTyped = typed.length;
  const correctChars = typed.split("").filter((char, idx) => char === currentSentence[idx]).length;
  const accuracy = totalTyped === 0 ? 0 : (correctChars / totalTyped) * 100;

  const elapsedMinutes = (Date.now() - startTime) / 60000;
  const wordsTyped = typed.trim().split(/\s+/).filter(Boolean).length;
  const wpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;

  wpmEl.textContent = `WPM: ${wpm}`;
  accuracyEl.textContent = `Accuracy: ${Math.max(0, Math.min(100, accuracy.toFixed(0)))}%`;
}

function highlightText() {
  const typed = inputEl.value;
  const sentenceArray = currentSentence.split("");

  sentenceEl.innerHTML = sentenceArray.map((char, idx) => {
    if (typed[idx] === char) {
      return `<span class="correct">${char}</span>`;
    } else if (typed[idx] !== undefined) {
      return `<span class="incorrect">${char}</span>`;
    }
    return char;
  }).join("");

  // Only move to the next line once the entire current line is typed correctly
  /*if (typed === currentSentence) {
    const nextLine = getNextLine();
    if (nextLine) {
      currentSentence = nextLine;
      sentenceEl.textContent += '\n' + currentSentence; // Add next line to sentence
    }
  }*/
}

inputEl.addEventListener("input", () => {
  highlightText();
});

restartBtn.addEventListener("click", startTest);

window.addEventListener("load", startTest);
