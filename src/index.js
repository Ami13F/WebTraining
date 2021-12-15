console.info("Hello, Ami");

function getTeamHTML(team) {
  return `<tr>
        <td>${team.promotion}</td>
        <td>${team.members}</td>
        <td>${team.name}</td>
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

function filterTeams(text) {
  text = text.toLowerCase();
  var filteredTeams = teams.filter(el => {
    return el.members.toLowerCase().includes(text);
  });
  displayTableHTML(filteredTeams);
}

function createTeamRequest(team) {
  // POST teams-json/create
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  })
    .then(r => r.json())
    .then(status => {
      console.info(status);
      if (status.success) {
        //window.location.reload();
        // loadTeams();
        team.id = status.id;
        // teams.push(team);
        // push will use the same ref, the corect way to add elements
        teams = [...teams, team];
        displayTableHTML(teams);
      }
    });
}

function getSubmitValues() {
  const promotion = document.querySelector("#editForm input[name=promotion]").value;
  const name = document.querySelector("input[name=name]").value;
  const members = document.querySelector("input[name=members]").value;
  const url = document.querySelector("input[name=url]").value;
  return {
    promotion: promotion,
    members: members,
    name: name,
    url: url
  };
}

function submitForm() {
  console.info("Submiting...");
  const team = getSubmitValues();

  createTeamRequest(team);
}

function initEvents() {
  var search = document.getElementById("search-id");
  search.addEventListener("input", event => {
    var text = event.target.value;
    filterTeams(text);
  });

  document.querySelector("#editForm").addEventListener("submit", submitForm);
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
