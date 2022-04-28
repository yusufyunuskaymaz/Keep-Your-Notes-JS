const noteForm = document.querySelector("#note-form")
const noteTextArea = document.querySelector(".noteTextArea")
const noteArea = document.querySelector(".noteArea")
const denemeNot = document.querySelector(".denemeNot")
const noteRow = document.querySelector(".noteRow")
const noteTitle = document.querySelector(".noteTitle")

document.addEventListener("DOMContentLoaded", LoadAllNotesToUI)

function LoadAllNotesToUI(){
    const values = getNoteValueFromStorage()
    
    values.forEach(value => {
        denemeNotUI(value)
    });

}

document.addEventListener("DOMContentLoaded", LoadAllNotesToUI2)

function LoadAllNotesToUI2(){
    const titles = getNotesFromStorage()
    
    titles.forEach(title => {
        denemeNotUI(title)
    });
   

}

noteForm.addEventListener("submit", noteData)
function noteData(e) {


    const titleValue = noteTitle.value
    const noteValue = noteTextArea.value

    if (titleValue == "") {
        console.log("Lütfen bir şeyler yazın...")
    } else {
        denemeNotUI(noteValue, titleValue)
        addNoteToStorage(noteValue, titleValue)
    }

    e.preventDefault()
}

function getNotesFromStorage() {
    // Get Title From Storage
    let noteTitles;

    if (localStorage.getItem("noteTitles") === null) {
        noteTitles = [];
    } else {
        noteTitles = JSON.parse(localStorage.getItem("noteTitles"))
    }
    return noteTitles;

}

function getNoteValueFromStorage(){
        // Get Note From Storage
        let noteValue;

        if (localStorage.getItem("noteValue") === null) {
            noteValue = [];
        } else {
            noteValue = JSON.parse(localStorage.getItem("noteValue"))
        }
        return noteValue;
}

function addNoteToStorage(noteValue1,titleValue) {
    // Add Title to Storage
    let noteTitles = getNotesFromStorage();

    noteTitles.push(titleValue);
    localStorage.setItem("noteTitles", JSON.stringify(noteTitles))
    // Add Title to Storage
    let noteValue = getNoteValueFromStorage();

    noteValue.push(noteValue1);
    localStorage.setItem("noteValue", JSON.stringify(noteValue))

}

function denemeNotUI(noteValue, titleValue) {
    noteRow.innerHTML += `
    <div class="col-md-4 mt-3">
    <div class="card">
        <div class="card-header"> ${titleValue}
        </div>
        <div class="card-body">
            <form id="note-form" class="overflow" style="height: 80px;" >
                <div class="form-row">
                    <div class="form-group col">
                       <p class="deneme">${noteValue}</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
    `;

}



