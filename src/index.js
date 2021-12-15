console.info("Hello, Ami");

function getTeamHTML({
  //destructuring: instead to use the hole object specify what you need(json keys in our case)
  promotion,
  members,
  name,
  url,
  id
}) {
  return `<tr>
        <td>${promotion}</td>
        <td>${members}</td>
        <td>${name}</td>
        <td>${url}</td>
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
  var filteredTeams = teams.filter(team => {
    // const name = team.name;
    // using destructuring
    const { promotion: group, members, name } = team;

    return (
      name.toLowerCase().includes(text) || group.toLowerCase().includes(text) || members.toLowerCase().includes(text)
    );
  });
  displayTableHTML(filteredTeams);
}

function createTeamRequest(team, successFunction) {
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
        teams = [...teams, { ...team, id: status.id }]; //create new object to avoid object mutation
        displayTableHTML(teams);
        if (successFunction) {
          // if there is any success function will call it(CALLBACK)
          successFunction(status.id);
        }
      }
    });
}

function getSubmitValues() {
  const promotion = document.querySelector("#editForm input[name=promotion]").value;
  const projectName = document.querySelector("input[name=name]").value;
  const members = document.querySelector("input[name=members]").value;
  const url = document.querySelector("input[name=url]").value;
  return {
    promotion,
    members,
    name: projectName,
    url // if equivalent with(if key name and value are the same):  url: url
  };
}

function submitForm() {
  console.info("Submiting...");
  const team = getSubmitValues();
  console.info(team, JSON.stringify(team));
  createTeamRequest(team, function successFunction(teamId) {
    console.info(team, JSON.stringify(team), teamId);
  });
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
