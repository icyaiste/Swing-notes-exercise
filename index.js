let BASE_URL = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';
let noteList = '';

//Inputfält
let userInput = document.getElementById('userinput');
let titleInput = document.getElementById('titleinput');
let noteTextInput = document.getElementById('textinput');

//Buttons
let showbtn = document.getElementById('shownotes');
let addbtn = document.getElementById('add');

const AllUserNotes = document.getElementById('AllUserNotes');





async function createNote() {
    const URL = `${BASE_URL}/api/notes`;

    const note = {
        username: 'aiste',
        title: 'first note',
        note: 'blabla'
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
    //noteList.push(note);
}





async function getNotes() {
    let title = titleInput.value;
    let noteText = noteTextInput.value;
    let username = userInput.value;


    const URL = `${BASE_URL}/api/notes/:username`;

    let response = await fetch(URL, {
        method: "GET",
    });
    const data = await response.json();
    console.log(username);
    console.log(data);

    displayNotes(username,title,noteText);
}


function displayNotes(username,title,noteText) {

noteList = noteList + 
`<article>    
    <h2 class="name">${username}</h2>
    <h3 class="title">${title}</h3>
    <p class="text">${noteText}</p>
 </article> `

 AllUserNotes.innerHTML = noteList;
}





addbtn.addEventListener('click', function () {
    createNote();
});


showbtn.addEventListener('click', function () {
    getNotes();
});