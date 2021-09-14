var inputBtn = document.getElementById("input-btn");
var inputField = document.getElementById("input-field");

inputField.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key == "Enter")
        inputBtn.click();
});

const searchField = () => {
    const inputField = document.getElementById('input-field')
    inputFieldText = inputField.value;
    inputField.value = '';

    const url =`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputFieldText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySportsTeams(data.teams))
        // .catch(err =>alert('wrong team name'))
        // const errorDiv = document.getElementById('error');
        // if (inputField = '') {
        //     errorDiv.innerHTML ='please give a team name'
        // }

};
const displaySportsTeams = teams => {
    const imageBox = document.getElementById('image-box')
    imageBox.textContent = '';
    for (const team of teams) {
        // console.log(team);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
             <div onclick="searchTeamDetails(${team.idTeam})" class="card">
             <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
             <div class="card-body">
             <h5 class="card-title">${team.strTeam}</h5>
             <p class="card-text">${team.strDescriptionEN.slice(0, 200)}</p>
             <h6>${team.strAlternate}</h6>
             </div>
           </div>`
        imageBox.appendChild(div)
    }
};
const searchTeamDetails = teamId => {
// console.log(teamId);
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`
    fetch(url)
        .then(res => res.json())
        .then(data=>displayTeamDetails(data.teams[0]))
}
const displayTeamDetails = team => {
    const teamDetails = document.getElementById('team-details')
    // console.log(team);
    teamDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
        <img width:100px src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${team.strTeam}</h5>
        <p class="card-text">${team.strDescriptionEN.slice(0, 200)}</p>
        <a href="${team.strWebsite}" class="btn btn-primary">Go somewhere</a>
        </div>
        `
    teamDetails.appendChild(div)
}

