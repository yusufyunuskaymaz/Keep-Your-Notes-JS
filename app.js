const noteForm = document.querySelector("#note-form")
const noteTextArea = document.querySelector(".noteTextArea")
const noteArea = document.querySelector(".noteArea")
const denemeNot = document.querySelector(".denemeNot")
const noteRow = document.querySelector(".noteRow")
const noteTitle = document.querySelector(".noteTitle")

document.addEventListener("DOMContentLoaded", LoadAllNotesToUI)

function LoadAllNotesToUI(){
    const values = getNoteValueFromStorage()
    const titles = getNotesFromStorage()

    for(i = 0; i < values.length; i++){
        denemeNotUI(values[i], titles[i])
    }

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
    <div class="card-header">
    <span>${titleValue}</span>
    <div>
     <a href class="button btn-edit">Edit</a>
     <a href class="button btn-delete" >Delete</a>
    </div> 
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

noteRow.addEventListener("click", deleteNotesFromUI)
function deleteNotesFromUI(e){
    if(e.target.className == "button btn-delete"){
        e.target.parentElement.parentElement.parentElement.remove();
        const firstChild = e.target.parentElement.parentElement.firstElementChild.textContent;
        const secondChild = e.target.parentElement.parentElement.parentElement.children[1].textContent.trim();
        console.log(secondChild)

        deleteNotesFromStorage(firstChild,secondChild)

    }

    
    e.preventDefault()
}

function deleteNotesFromStorage(firstChild, secondChild){

    const titles = getNotesFromStorage()
    const values = getNoteValueFromStorage()


    titles.forEach((title,index) => {
       if(title === firstChild){
        titles.splice(index,1)
        console.log(title,firstChild)
       }
    });
    localStorage.setItem("noteTitles", JSON.stringify(titles))

    values.forEach((value,index) => {
        if(value === secondChild){
            values.splice(index,1)
         console.log(value,secondChild)
        }
     });
     localStorage.setItem("noteValue", JSON.stringify(values))

}

