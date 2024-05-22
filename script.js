/************  Part 2 Start: Random User data *********************/
let currentPlayers = [];

/**
 * Clear the container of all its children
 */
function clearContainer(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

/**
 * Create a card for a user
 * @param {Object} player - the user object
 * @returns {HTMLDivElement} - the card element
 */
function makePlayerCard(player){
    let playerCard = document.createElement('div');
    playerCard.classList.add('card');

    //creating the user details div
    let playerDetails = document.createElement('div');
    playerDetails.classList.add('card-body');


    //making the name element
    let playerName = document.createElement('h5');
    playerName.textContent = `${player.first} ${player.last}`;
    playerName.classList.add('card-title');
    playerDetails.appendChild(playerName);

    //add the player UTR 
    let playerutr = document.createElement('p');
    playerutr.textContent = `UTR: ${player.UTR}`
    playerutr.classList.add('card-text');
    playerDetails.appendChild(playerutr);

    //add the player home place 
    let playerLocation = document.createElement('p');
    playerLocation.textContent = player.hometown + ', ' + player.homestate + ', ' + player.homecountry;
    playerLocation.classList.add('card-text');
    playerDetails.appendChild(playerLocation);

    //add the user phone
    let playerGrade = document.createElement('p');
    playerGrade.textContent = `Grade: ${player.grade}`;
    playerGrade.classList.add('card-text');
    playerDetails.appendChild(playerGrade);
    //adding the 'userDetails' div to the 'userCard' div
    playerCard.appendChild(playerDetails);
    return playerCard;
}

/**
 *  Add the users to the page
 * @param {Array} players - an array of user objects to display 
 */
function displayPlayers(players){

    //choose the container where to display the users
    let playersContainer = document.querySelector('#playerCardsContainer');
    clearContainer(playersContainer);

    //create a card for each user
    for(let player of players){
        let newPlayerCard = makePlayerCard(player);
        playersContainer.appendChild(newPlayerCard);
    }   
}

/**
 * An async function to fetch user data from the randomuser.me API
 * @returns {Promise} - a promise that resolves to the user data
 */
async function getPlayerData(){

    const fullURL = `./data.json`;
    console.log("Full URL: ", fullURL);
    //fetch the data
    const response = await fetch(fullURL);
    if(!response.ok){
        alert(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

/**
 * An async function to handle the fetch users button click
 */
async function handleFetchPlayersBtn(){
    console.log("Button clicked");

    //fetch the user data
    try {
        let playersData = await getPlayerData();
        console.log("Player data:  ", playersData);
        //do something with the user data
        currentPlayers = playersData.players;
        displayPlayers(currentPlayers);        

        //reset the filter to 'all'
        let filterUsersSelect = document.querySelector('#usersFilter');
        filterUsersSelect.value = 'all';

        
    }
    //if there's an error, log it
    catch(error){
        console.error("Error fetching user data: ", error);
    }
}


/**
 * A function to filter users for only US users
 * @param {Array} users - an array of user objects 
 * @returns {Array} - an array of user objects that are from the US
 */
function filterForOnlyUS(users){
    let usUsers = [];
    for(const user of users){
        if(user.nat === 'US'){
            usUsers.push(user);
        }
    }
    return usUsers;
}

function filterCurrentUsers(filterValue){
    if(filterValue === 'all'){
        displayUsers(currentUsers);
    }
    else if(filterValue == 'onlyUS'){
        let usUsers = filterForOnlyUS(currentUsers);
        console.log("US users: ", usUsers);
        displayUsers(usUsers);
    }
    //Try it out : Add other filters here
}

/************  Part 2 END: Random User data *********************/

/************  Part 1 START: Local JSON data *********************/
let jsonData = {};

function handleShowJSONDataBtn(){
    console.log("Show JSON data button clicked");
    console.log("JSON data: ", jsonData);
    let jsonDataOutput = document.querySelector('#jsonDataOutput');
    jsonDataOutput.textContent = JSON.stringify(jsonData, null, 2);
}

async function fetchJSONData(fileName){

    const response = await fetch(`data/${fileName}.json`);
    if(response.status !== 200){
        alert(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data: ", data);
    return data;



}
/************  Part 1 END: local JSON data *********************/

async function runProgram() {
    console.log("Program is running");

    /** Part 1: Getting local json data  */
    //getting the json data with/without 
    // try{
    //     jsonData = await fetchJSONData('astros');
    //     console.log("JSON data: ", jsonData);
    // }
    // catch(error){
    //     console.error("Error fetching JSON data: ", error);
    // }


    // let fetchJSONDataButton = document.querySelector('#showJSONData');
    // fetchJSONDataButton.addEventListener('click', handleShowJSONDataBtn);

    /** Part 2: Fetching users */

    let fetchPlayersButton = document.querySelector('#fetchPlayers');
    fetchPlayersButton.addEventListener('click', handleFetchPlayersBtn);

    let filterUsersSelect = document.querySelector('#usersFilter');
    filterUsersSelect.addEventListener('change', (event) =>{
        filterCurrentUsers(event.target.value);
    });

}

document.addEventListener('DOMContentLoaded', runProgram);