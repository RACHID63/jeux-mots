// Get the Arabic and French word inputs from the user
const arabicWords = prompt("Enter Arabic words, separated by commas").split(",");
const frenchWords = prompt("Enter French translations, separated by commas").split(",");

// Check if the number of words in both arrays is equal
if (arabicWords.length !== frenchWords.length) {
  alert("Error: Number of Arabic words and French translations must be equal.");
} else {
  // Shuffle the arrays
  for (let i = arabicWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arabicWords[i], arabicWords[j]] = [arabicWords[j], arabicWords[i]];
    [frenchWords[i], frenchWords[j]] = [frenchWords[j], frenchWords[i]];
  }

  // Display the words in the HTML div elements
  for (let i = 1; i <= arabicWords.length; i++) {
    document.getElementById(`arabic-${i}`).textContent = arabicWords[i - 1];
    document.getElementById(`french-${i}`).textContent = frenchWords[i - 1];
    document.getElementById(`arabic-${i}`).addEventListener("click", checkMatch);
  }
}

// Initialize game variables
let selectedWord = null;
let matches = 0;

// Check if the clicked Arabic word matches its corresponding French translation
function checkMatch() {
  const frenchWord = this.textContent;
  if (selectedWord === null) {
    selectedWord = this.textContent;
  } else {
    if (this.textContent === frenchWords[arabicWords.indexOf(selectedWord)]) {
      this.style.display = 'none';
      document.getElementById(`french-${arabicWords.indexOf(selectedWord)+1}`).style.display = 'none';
      selectedWord = null;
      matches++;
      if (matches === arabicWords.length) {
        alert('Congratulations! You matched all the words!');
      }
    } else {
      this.parentElement.classList.add('wrong');
      document.getElementById(`french-${arabicWords.indexOf(selectedWord)+1}`).parentElement.classList.add('wrong');
      setTimeout(() => {
        this.parentElement.classList.remove('wrong');
        document.getElementById(`french-${arabicWords.indexOf(selectedWord)+1}`).parentElement.classList.remove('wrong');
        selectedWord = null;
      }, 3000);
    }
  }
}
