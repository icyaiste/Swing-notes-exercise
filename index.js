import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, query, where, updateDoc, increment, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC9RiHvEQpOKdYhg7DCYXQnacdiRcaZGtw",
    authDomain: "to-do-app-944bb.firebaseapp.com",
    projectId: "to-do-app-944bb",
    storageBucket: "to-do-app-944bb.appspot.com",
    messagingSenderId: "117745084840",
    appId: "1:117745084840:web:a451f19b059ee63818159d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Inputfält
let userNameInput = document.getElementById('userNameInput');
let userInput = document.getElementById('userinput');
let titleInput = document.getElementById('titleinput');
let noteTextInput = document.getElementById('textinput');
//let userId = document.getElementById('userNameInput');


//Buttons
let showbtn = document.getElementById('shownotes');
let addbtn = document.getElementById('add');



let allUserNotes = document.getElementById('allUserNotes');


async function createNote() {

    let username = userInput.value;
    let title = titleInput.value;
    let noteText = noteTextInput.value;
    //let noteID = String(Math.floor(Math.random() * 101));

    // let note = {
    //     username: username,
    //     title: title,
    //     note: noteText
    // }// Skickas med som body alltså det vi vill spara i databasen

    await addDoc(collection(db, 'Notes'),
        {
            username: username,
            title: title,
            note: noteText,
            // id: note
        });
}
// let response = await fetch(URL, {
//     method: "POST",
//     body: JSON.stringify(note), // Gör om till ett JSON objekt
//     headers: {
//         'Content-Type': 'application/json' // Berätta för servern att det vi skickar med är ett JSON objekt
//     },
// });

// const data = await response.json();

//console.log(data);
//noteList.push(note);




async function getNotes(username) {
    const noteList = await getDocs(collection(db, 'Notes'));

    noteList.forEach(notes => {// Loopar igenom våran collection
        const note = notes.data();

        const noteId = notes.id;

        let allNotes = document.createElement('article');

        allNotes.innerHTML = `<h2 class="name">${note.username}</h2>
                    <h3 class="title">${note.title}</h3>
                    <p class="text">${note.note}</p>
                    <button class="deletebtn" id="deletebtn">Delete Note</button>
                    <button class="updatebtn" id="updatebtn">Update Note</button>`;

        allUserNotes.appendChild(allNotes);

        let deletebtn = allNotes.querySelector('.deletebtn');
    
        deletebtn.addEventListener('click', () => {
            //console.log('klik');
            deleteNote(notes.id);
        });

        updatebtn.addEventListener('click', () => {
            updateNote(noteId);
        });
    });
}

// allNotes.setAttribute('note-id', note.id);


// Find the closest 'article' element and get its 'note-id' attribute
//   const noteID = allNotes.getAttribute('note-id');



//     updateNote(id);
// });

async function deleteNote(noteId) {
            await deleteDoc(doc(db, 'Notes', noteId));
        }


async function updateNote(noteId) {
            const updateNoteContent = prompt("Enter a new note");
            await updateDoc(doc(db, 'Notes', noteId),
                {
                    note: updateNoteContent
                });
        }


addbtn.addEventListener('click', function () {
            createNote();
            console.log('Note is created!');
        });


showbtn.addEventListener('click', () => getNotes(userNameInput.value));