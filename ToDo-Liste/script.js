const board = document.getElementById("board");
const modal = document.getElementById("modal");
const logList = document.getElementById("log");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalDueDate = document.getElementById("modalDueDate");
const modalPriority = document.getElementById("modalPriority");

let currentNote = null;

// Log hinzufügen
function addLog(message) {
    const li = document.createElement("li");
    li.textContent = message;
    logList.prepend(li);
}

// Sticky hinzufügen
document.getElementById("addNoteBtn").addEventListener("click", () => {
    const note = document.createElement("div");
    note.classList.add("note");

    note.dataset.title = "";
    note.dataset.description = "";
    note.dataset.dueDate = "";
    note.dataset.priority = "low";

    renderNote(note);
    note.addEventListener("click", () => openModal(note));
    board.appendChild(note);

    addLog("Neuer Sticky Note hinzugefügt");
});

// Sticky rendern
function renderNote(note) {
    note.innerHTML = `
        <div class="priority-dot ${note.dataset.priority}"></div>
        <h3>${note.dataset.title || "Ohne Titel"}</h3>
        <div class="due-date">
            ${note.dataset.dueDate ? "Fällig: " + note.dataset.dueDate : ""}
        </div>
    `;
}

// Modal öffnen
function openModal(note) {
    currentNote = note;

    modalTitle.value = note.dataset.title;
    modalDescription.value = note.dataset.description;
    modalDueDate.value = note.dataset.dueDate;
    modalPriority.value = note.dataset.priority;

    modal.classList.remove("hidden");
}

// Speichern
document.getElementById("saveBtn").addEventListener("click", () => {
    if (!currentNote) return;

    const oldTitle = currentNote.dataset.title || "Ohne Titel";

    currentNote.dataset.title = modalTitle.value;
    currentNote.dataset.description = modalDescription.value;
    currentNote.dataset.dueDate = modalDueDate.value;
    currentNote.dataset.priority = modalPriority.value;

    renderNote(currentNote);

    addLog(`Sticky Note "${oldTitle}" wurde überarbeitet`);
    closeModal();
});

// Löschen
document.getElementById("deleteBtn").addEventListener("click", () => {
    if (!currentNote) return;

    const title = currentNote.dataset.title || "Ohne Titel";
    currentNote.remove();

    addLog(`Sticky Note "${title}" wurde gelöscht`);
    closeModal();
});

// Abbrechen
document.getElementById("cancelBtn").addEventListener("click", closeModal);

function closeModal() {
    modal.classList.add("hidden");
    currentNote = null;
}
