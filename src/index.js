console.info("Hello, Ami");

function getTeamHTML(team) {
  return `<tr>
        <td>${team.promotion}</td>
        <td>${team.members}</td>
        <td>${team.projectName}</td>
        <td>${team.url}</td>
        <td>x</td>
    </td>
</tr>`;
}

var tb = document.querySelector("#teams-table tbody");
var teams;

function displayTableHTML(teamsArray) {
  var teamHTML = teamsArray.map(team => getTeamHTML(team));
  tb.innerHTML = teamHTML.join("");
}

function initEvents() {
  var search = document.getElementById("search-id");
  search.addEventListener("input", event => {
    var text = event.target.value;
    displayTableHTML(teams.filter(el => el.members.toLowerCase().includes(text)));
  });
}

initEvents();

function loadTeams() {
  // GET teams-json
  return fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(fetchedTeams => {
      teams = fetchedTeams;
      displayTableHTML(fetchedTeams);
    });
}

loadTeams();
