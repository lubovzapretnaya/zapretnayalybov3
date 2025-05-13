
const container = document.getElementById('puzzle-container');
const message = document.getElementById('message');
const dialogue = document.getElementById('dialogue');
const totalPieces = 9;
let pieces = [];
let dialogueLines = [
    "Георгий: Максим Сергеевич, вы мне так нравитесь!",
    "Максим Сергеевич: Ох, Аветисов, вы мне тоже!",
    "Георгий: Между нами искрит, как от сварочного аппарата.",
    "Максим Сергеевич: И растворяется всё, кроме чувств.",
    "Георгий: Я думал, что на заводе найду детали…",
    "Максим Сергеевич: …а нашли любовь. 💘",
    "Георгий: Хотите сходить в химическую лабораторию вместе?",
    "Максим Сергеевич: Только если потом — ко мне на чай.",
    "Оба: Мы как формула — идеально совместимы."
];
let dialogueIndex = 0;
let selectedIndex = null;

function createPuzzle() {
    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'piece';
        const x = i % 3;
        const y = Math.floor(i / 3);
        piece.style.backgroundImage = "url('final.png')";
        piece.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
        piece.dataset.index = i;
        piece.addEventListener('click', () => onPieceClick(i));
        pieces.push(piece);
        container.appendChild(piece);
    }
    shufflePieces();
}

function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    updatePuzzle();
}

function updatePuzzle() {
    container.innerHTML = '';
    pieces.forEach((piece, i) => {
        piece.classList.remove("selected");
        container.appendChild(piece);
    });
}

function onPieceClick(index) {
    if (selectedIndex === null) {
        selectedIndex = index;
        pieces[index].classList.add("selected");
    } else {
        pieces[selectedIndex].classList.remove("selected");
        [pieces[selectedIndex], pieces[index]] = [pieces[index], pieces[selectedIndex]];
        selectedIndex = null;
        updatePuzzle();
        updateDialogue();
        checkCompletion();
    }
}

function updateDialogue() {
    if (dialogueIndex < dialogueLines.length) {
        const p = document.createElement('p');
        p.textContent = dialogueLines[dialogueIndex];
        dialogue.appendChild(p);
        dialogueIndex++;
    }
}

function checkCompletion() {
    let isCorrect = true;
    for (let i = 0; i < pieces.length; i++) {
        if (parseInt(pieces[i].dataset.index) !== i) {
            isCorrect = false;
            break;
        }
    }
    if (isCorrect) {
        const congrats = document.createElement('p');
        congrats.textContent = "ПОЗДРАВЛЯЮ! ТЫ ГЕЙ!";
        congrats.style.fontSize = "32px";
        congrats.style.color = "#ff0066";
        congrats.style.fontWeight = "bold";
        dialogue.appendChild(congrats);
    }
}

createPuzzle();
