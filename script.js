// Puppy Bowl Main Title
const titleContainer = document.getElementById("main-title");
const mainTitle = document.createElement("h1");
mainTitle.textContent = "Puppy Bowl"
titleContainer.append(mainTitle);

//New Player Form
const newPlayerFormContainer = document.getElementById('new-player-form');

//All Players Container
const playerContainer = document.getElementById('all-players-container');
// playerContainer.addEventListener("delete", e () => {
   
// })

//Form
const form = document.getElementById('form');

//Add New Player Title
const newPlayerTitle1 = document.getElementById("new-player-title1")
const miniTitle = document.createElement("h4");
miniTitle.textContent = "Add New";
newPlayerTitle1.append(miniTitle);

const newPlayerTitle2 = document.getElementById("new-player-title2")
const bigTitle = document.createElement("h2");
bigTitle.textContent = "PLAYER";
newPlayerTitle2.append(bigTitle);


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-acc-pt-web-pt-e';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {

        //hit the server store the response in the variable responseAllPlayers
        const responseAllPlayers = await fetch(`${APIURL}`);
        //we need to use that data, so we need to turn it into json
        const resultAllPlayers = await responseAllPlayers.json();
        //return that variable.data.players, becuase that's where the [array of puppies] is, since we return it, we can call this fetchAll func in other places to use it, and still get the data
        console.log(resultAllPlayers);
        return resultAllPlayers.data.players

    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {

        const responseSinglePlayer = await fetch(`${APIURL}/${playerId}`)
        const resultSinglePlayer = await responseSinglePlayer.json();
        console.log(resultSinglePlayer);
        return resultSinglePlayer.data.players
       
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};
//we pass in the event 
async function addNewPlayer(event) {
    try {
        //we tell it to not do the default, which is refresh the page
        event.preventDefault();
        //we get the values from the input AFTER we hit submit, .value comes from the event.target.value
        // const dogName = document.getElementById('name').value
        // const dogBreed = document.getElementById('breed').value
        // const dogStatus = document.getElementById('status').value
        // const dogImageUrl = document.getElementById('imageUrl').value
        // console.log(dogName, dogBreed, dogStatus, dogImageUrl)
        //so we are going to hit the end point of that URL
        //when we do a POST request, we send data, the second argument is the object that tells it what we are sending
        const response = await fetch(`${APIURL}`,
            {
                //method telling the server this request is a POST request
                method: 'POST',
                //parse the data as JSON
                headers: {
                    'Content-Type': 'application/json',
                },
                //request is a POST, this request has a BODY, which is where the data is stored from the CLIENT (AKA the HTML)
                //They turn our object into JSON, we are passing in our object into the JSON.stringify()
                body: JSON.stringify({
                    // name: dogName, //these values are the values from the input
                    // breed: dogBreed,
                    // status: dogStatus,
                    // imageUrl: dogImageUrl,

                
                }),

            }
        );
        //this is done async returns us something, promise that turns the response from the POST request on line 58 into json
        //sometimes you get the whole OBJECT back, sometimes you get just a message saying success
        const resultAddDog = await response.json();
        console.log(resultAddDog);


    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};


const removePlayer = async (playerId) => {
    try {
        playerId.preventDefault()
        const response = await fetch(`${APIURL}/${playerId}`,
            {
                method: 'DELETE',
            }
        );
        const resultRemovePlayer = await response.json();
        console.log(resultRemovePlayer)
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
    form.addEventListener('delete', e => {
        e.preventDefault();
        const deleteBtn = createElement("button")
        deleteBtn.id = "delete"
        deleteBtn.textContent = "Remove"
        playerContainer.append(deleteBtn)

    })
};




/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `re movePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */


const renderAllPlayers = async (players) => {

    players.forEach(({ imageUrl, name, breed, status,}) => {
 
        const li = document.createElement("li");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        const p = document.createElement("p");

      
            title.innerText =  name,
            p.innerText =  breed,
            p.innerText = status,

            img.src = imageUrl,
            img.alt = "puppy photo",
            img.height = 400,
            img.width = 400,

            console.log(title)

            li.append(img)
            li.append(title)
            li.append(p)

           
        playerContainer.append(li)
   
    });
}
/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
// form.addEventListener("submit", (e) => addNewPlayer(e));
// form.addEventListener("remove from roster", (e) => removePlayer(e));

const renderNewPlayerForm = () => {
    try {

        const pupName = document.getElementById('name')
        const pupBreed = document.getElementById('breed')
        const pupStatus = document.getElementById('status')
        const imageUrl = document.getElementById('image')

        console.log(pupName, pupBreed, pupStatus, imageUrl)

        // //NAME
        // const nameLabel = document.createElement("label")
        // nameLabel.id = "name"
        // nameLabel.textContent = "name"
        // pupName.append(nameLabel)
        
        // const nameInput = document.createElement("input")
        // nameInput.id = "name"
        // nameInput.type = "text",
        // nameInput.placeholder = "pup name",
        // pupName.append(nameInput)

        // //BREED
        // const breedLabel = document.createElement("label")
        // breedLabel.id = "breed"
        // breedLabel.textContent = "breed"
        // pupBreed.append(breedLabel)
        
        // const breedInput = document.createElement("input")
        // breedInput.id = "breed"
        // breedInput.type = "text",
        // breedInput.placeholder = "type of breed",
        // pupBreed.append(breedInput)
        
        // //STATUS
        // const statusLabel = document.createElement("label")
        // statusLabel.id = "status"
        // statusLabel.textContent = "status"
        // pupStatus.append(statusLabel)
        
        // const statusInput = document.createElement("input")
        // statusInput.id = "status"
        // statusInput.type = "text"
        // statusInput.placeholder = "field or bench"
        // pupStatus.append(statusInput)

        // //IMAGE
        // const imageLabel = document.createElement("label")
        // imageLabel.id = "image"
        // imageLabel.textContent = "image"
        // imageUrl.append(imageLabel)
        
        // const imageInput = document.createElement("input")
        // imageInput.id = "image"
        // imageInput.type = "text",
        // imageInput.placeholder = "image",
        // imageUrl.append(imageInput)


        form.addEventListener('submit', e => {
            e.preventDefault();

            const newPlayer = {
            name: pupName.value, //these values are the values from the input
            breed: pupBreed.value,
            status: pupStatus.value,
            imageUrl: imageUrl.value
            }
      
        console.log(newPlayer)
        console.log("submitted")
            
        })
    }

    catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();