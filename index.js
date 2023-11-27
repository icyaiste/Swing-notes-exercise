let BASE_URL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';
let noteList = [];

//Inputfält
let userNameInput = document.getElementById('userNameInput');
let userInput = document.getElementById('userinput');
let titleInput = document.getElementById('titleinput');
let noteTextInput = document.getElementById('textinput');
//let userId = document.getElementById('userNameInput');


//Buttons
let showbtn = document.getElementById('shownotes');
let addbtn = document.getElementById('add');
let deletebtn = document.getElementById('deletenote');


let allUserNotes = document.getElementById('allUserNotes');

let note = '';


async function createNote() {
    const URL = `${BASE_URL}/api/notes`;

    let username = userInput.value;
    let title = titleInput.value;
    let noteText = noteTextInput.value;

    let note = {
        username: username,
        title: title,
        note: noteText
    }// Skickas med som body alltså det vi vill spara i databasen


    let response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(note), // Gör om till ett JSON objekt
        headers: {
            'Content-Type': 'application/json' // Berätta för servern att det vi skickar med är ett JSON objekt
        },
    });

    const data = await response.json();

    console.log(data);
    noteList.push(note);
}



async function getNotes(username) {

    const URL = `${BASE_URL}/api/notes/${username}`;

    try {
        let response = await fetch(URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json' // Berätta för servern att det vi skickar med är ett JSON objekt
            },
        });
        const data = await response.json();

        //console.log(username);
        //console.log(data);

        let notes = data.notes;
        console.log(notes);

        displayNotes(notes);

    } catch (error) {
        console.log(error);
    }
}




function displayNotes(notes) {
    allUserNotes.innerHTML = "";
    
    notes.forEach(note => {
       let newNotes = document.createElement('article');
       newNotes.innerHTML = `<h2 class="name">${note.username}</h2>
            <h3 class="title">${note.title}</h3>
            <p class="text">${note.note}</p>
            <p class="id">${note.id}</p>`
      allUserNotes.appendChild(newNotes);      
    });
    
}



async function deleteNote(notes) {
    const URL = `${BASE_URL}/api/notes/${id}`;
    try {
        let response = await fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // Berätta för servern att det vi skickar med är ett JSON objekt
            },
        });

        const data = await response.json();

    } catch (error) {
        console.log(error);
    }
}



/*
async function updateNote(){

const URL = `${BASE_URL}/api/notes/${id}`;

let note = {
    note: 'updaterat innehåll'
  }
  
  let response = await fetch("URL", {
    method: "PUT",
    body: JSON.stringify(note), // Gör om till ett JSON objekt
    headers: {
      'Content-Type': 'application/json' // Berätta för servern att det vi skickar med är ett JSON objekt
    }
  });
}
*/


addbtn.addEventListener('click', function () {
    createNote();
});


showbtn.addEventListener('click', () => getNotes(userNameInput.value));

deletebtn.addEventListener('click', () => deleteNote(note));
