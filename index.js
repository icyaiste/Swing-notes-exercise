let BASE_URL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';
let noteList = [];

//Inputfält
let userNameInput = document.getElementById('userNameInput');
let userInput = document.getElementById('userinput');
let titleInput = document.getElementById('titleinput');
let noteTextInput = document.getElementById('textinput');


//Buttons
let showbtn = document.getElementById('shownotes');
let addbtn = document.getElementById('add');

let AllUserNotes = document.getElementById('AllUserNotes');


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
    
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];


        noteList = noteList +
            `<article>    
            <h2 class="name">${notes[i].username}</h2>
            <h3 class="title">${notes[i].title}</h3>
            <p class="text">${notes[i].note}</p>
        </article> `
    }
    AllUserNotes.innerHTML = noteList;
}




addbtn.addEventListener('click', function () {
    createNote();
});


showbtn.addEventListener('click', () => getNotes(userNameInput.value));