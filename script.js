const playerContainer = document.getElementById('all-players-container');
const h1 = document.createElement("h1");
h1.textContent = "PUPPY BOWL";
playerContainer.append(h1);

const newPlayerFormContainer = document.getElementById('new-player-form');
// const h1 = document.createElement("h1");
// h1.textContent = "Puppy Bowl";
// playerContainer.append(h1);

const h2 = document.createElement("h2");
h2.textContent = "Add New Player";
newPlayerFormContainer.append(h2);

//form
const form = document.getElementById('form');


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
        //hit the server store the response in the variable responseALL
            const responseAll =  await fetch(`${APIURL}`);
            //we need to use that data, so we need to turn it into json
            const resultAll = await responseAll.json();
            //return that variable.data.players, becuase that's where the [array of puppies] is, since we return it, we can call this fetchAll func in other places to use it, and still get the data
            console.log(resultAll);
            return resultAll.data.players
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
            const responseSingle = await fetch(`${APIURL}/${playerId}`)
            const resultSingle = await responseSingle.json();
            return resultSingle.data.player
            console.log(resultSingle);
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
        }
};
//we pass in the event 
async function addNewPlayer (event) {
    try {
        //we tell it to not do the default, which is refresh the page
    event.preventDefault();
    //we get the values from the input AFTER we hit submit, .value comes from the event.target.value
    const dogName = document.getElementById('name').value
    const dogBreed = document.getElementById('breed').value
    const dogStatus = document.getElementById('status').value
    console.log(dogName, dogBreed, dogStatus)
    //so we are going to hit the end point of that URL
    //when we do a POST request, we send data, the second argument is the object that tells it what we are sending
            const responseAddNew = await fetch(`${APIURL}`,
            {
                //method telling the server this request is a POST request
            method: 'POST',
            //parse the data as JSON
            headers: {
                'Content-Type' : 'application/json',
            },
            //request is a POST, this request has a BODY, which is where the data is stored from the CLIENT (AKA the HTML)
            //They turn our object into JSON, we are passing in our object into the JSON.stringify()
            body: JSON.stringify({
                name: dogName, //these values are the values from the input
                breed: dogBreed,
                status: dogStatus,
            }),
            }
        );
        //this is done async returns us something, promise that turns the response from the POST request on line 58 into json
        //sometimes you get the whole OBJECT back, sometimes you get just a message saying success
        const resultAddNew = await responseAddNew.json();
        console.log(resultAddNew);
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

form.addEventListener("submit", (e) => addNewPlayer(e));

const removePlayer = async (playerId) => {
    try {
            const responseRemove = await fetch(`${APIURL}`,
            {
            method:'DELETE',
            }
        );
        const resultRemove = await responseRemove.json();
        console.log(resultRemove)
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
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
const renderAllPlayers = async (playerList) => {
    try {
        
        // data.players.forEach((player) =>{
        //     playerContainer.innerHTML = "";
        //     const img = document.createElementById("imageUrl");
        //     const li = document.createElement("li");
        //     li.append(img)
           

            
              
        }
        // )
    // }
        
        
    catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm =  () => {
    try {
           
      
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
// const submitButton = document.getElementById("submit").addEventListener("click",(nameInput, breedInput)=>{

