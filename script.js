let selectedWord = null;
let correctPairs = 0;

let arabicWords = [];
let frenchWords = [];

function generateTables() {
  arabicWords = document.getElementById("arabic-input").value.split(",").map(word => word.trim());
  frenchWords = document.getElementById("french-input").value.split(",").map(word => word.trim());

  if (arabicWords.length !== frenchWords.length) {
    alert("Le nombre de mots arabes doit être égal au nombre de mots français.");
    return;
  }

  let wordPairs = [];

  for (let i = 0; i < arabicWords.length; i++) {
    let arabicWord = arabicWords[i];
    let frenchWord = frenchWords[i];
    let wordPair = { arabic: arabicWord, french: frenchWord, index: i };
    wordPairs.push(wordPair);
  }

  // Shuffle the French words based on their original index position
  let shuffledFrenchWords = wordPairs.map(wordPair => wordPair.french);
  for (let i = shuffledFrenchWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledFrenchWords[i], shuffledFrenchWords[j]] = [shuffledFrenchWords[j], shuffledFrenchWords[i]];
  }

  let arabicTable = document.getElementById("arabic-table");
  let frenchTable = document.getElementById("french-table");

  // Clear tables
  arabicTable.innerHTML = "";
  frenchTable.innerHTML = "";

  for (let i = 0; i < wordPairs.length; i++) {
    let arabicWord = wordPairs[i].arabic;
    let frenchWord = shuffledFrenchWords[wordPairs[i].index];

    let arabicRow = document.createElement("tr");
    let arabicCell = document.createElement("td");
    arabicCell.innerHTML = arabicWord;
    arabicCell.onclick = function() {
      selectWord(arabicCell);
    };
    arabicRow.appendChild(arabicCell);
    arabicTable.appendChild(arabicRow);

    let frenchRow = document.createElement("tr");
    let frenchCell = document.createElement("td");
    frenchCell.innerHTML = frenchWord;
    frenchCell.onclick = function() {
      selectWord(frenchCell);
    };
    frenchRow.appendChild(frenchCell);
    frenchTable.appendChild(frenchRow);
  }
}

function selectWord(cell) {
  if (selectedWord === null) {
    selectedWord = cell;
    cell.classList.add("selected");
  } else {
    let selectedArabicWord = selectedWord.innerHTML;
    let selectedFrenchWord = frenchWords[arabicWords.indexOf(selectedArabicWord)];
    let cellFrenchWord = cell.innerHTML;

    if (selectedFrenchWord === cellFrenchWord) {
      selectedWord.classList.add("correct");
      cell.classList.add("correct");
      selectedWord.onclick = null;
      cell.onclick = null;
      selectedWord.parentNode.style.display = "none"; // Masquer le mot de la liste 1
      cell.parentNode.style.display = "none"; // Masquer le mot de la liste 2
      selectedWord = null;
      correctPairs++;
      if (correctPairs === arabicWords.length) {
        alert("Félicitations ! Vous avez associé tous les mots !");
      }
    } else {
      selectedWord.classList.add("incorrect");
      cell.classList.add("incorrect");
      setTimeout(function() {
        selectedWord.classList.remove("selected", "incorrect");
        cell.classList.remove("selected", "incorrect");
        selectedWord = null;
      }, 1000);
    }
  }
}
