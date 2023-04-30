let selectedWord = null;
let correctPairs = 0;

let arabicWords = [];
let frenchWords = [];

function generateTables() {
	arabicWords = document.getElementById("arabic-input").value.split(",");
	frenchWords = document.getElementById("french-input").value.split(",");

	if (arabicWords.length !== frenchWords.length) {
		alert("The number of Arabic words must be equal to the number of French words.");
		return;
	}

	let arabicTable = document.getElementById("arabic-table");
	let frenchTable = document.getElementById("french-table");

	// Clear tables
	arabicTable.innerHTML = "";
	frenchTable.innerHTML = "";

	for (let i = 0; i < arabicWords.length; i++) {
		let arabicWord = arabicWords[i].trim();
		let frenchWord = frenchWords[i].trim();

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
		if (selectedWord.innerHTML === cell.innerHTML) {
			selectedWord.classList.add("correct");
			cell.classList.add("correct");
			selectedWord.onclick = null;
			cell.onclick = null;
			selectedWord = null;
			correctPairs++;
			if (correctPairs === arabicWords.length) {
				alert("Congratulations! You matched all the words!");
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

function reset() {
	selectedWord = null;
	correctPairs = 0;

	let arabicCells = document.querySelectorAll("#arabic-table td");
	let frenchCells = document.querySelectorAll("#french-table td");

	arabicCells.forEach(function(cell) {
		cell.classList.remove("selected", "correct", "incorrect");
		cell.onclick = function() {
			selectWord(cell);
		};
	});

	frenchCells.forEach(function(cell) {
		cell.classList.remove("selected", "correct", "incorrect");
		cell.onclick = function() {
			selectWord(cell);
		};
	});
}
