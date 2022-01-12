import { sleep, debounce, $, $$ } from "./utilities"; // use {methodName} for destricturing
import myDefaultStuff from "./utilities";
// import { _ } from "lodash"; //_ will be a JSON
// import { debounce } from "lodash/debounce"; // best way to import only what is needed

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
        <td style="text-align:center">
          <input value="${id}" type="checkbox"/></td>
        <td>${promotion}</td>
        <td>${members}</td>
        <td>${name}</td>
        <td><a href="${url}" target="_blank">${url.replace("https://github.com/", "")}</a></td>
        <td>
          <a href="#" data-team-id="${id}" class="edit-btn">&#9998;</a>
          <a href="#" data-team-id="${id}" class="delete-btn">&#10006;</a>          
        </td>    
    </td>
</tr>`;
}

var tb = document.querySelector("#teams-table tbody");
var teams;
let editId;

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

function updateTeamRequest(team) {
  // PUT teams-json/update
  fetch("http://localhost:3000/teams-json/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  })
    .then(r => r.json())
    .then(status => {
      if (status.success) {
        loadTeams();
      }
    });
}

function deleteTeamRequest(teamId) {
  // DELETE teams-json/delete
  return fetch("http://localhost:3000/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: teamId })
  });
}

function deleteTeam(teamId) {
  console.info("delete hit");
  const countBeforeDelete = teams.length;
  deleteTeamRequest(teamId)
    .then(response => response.json())
    .then(async status => {
      if (status.success) {
        const newTeams = await loadTeams();
        console.log("Deleted teams number:", countBeforeDelete - newTeams.length);
      }
    });
}

function setFormValues({ promotion, name, members, url }) {
  document.querySelector("#editForm input[name=promotion]").value = promotion;
  document.querySelector("input[name=name]").value = name;
  document.querySelector("input[name=members]").value = members;
  document.querySelector("input[name=url]").value = url;
}

function cleanValues() {
  // setFormValues({ promotion: "", name: "", members: "", url: "" });
  editId = undefined;
  document.querySelector("#editForm").reset();
}

function editTeam(id) {
  console.info("edit hit");
  const team = teams.find(team => team.id === id);
  setFormValues(team);
  editId = id;
}

function submitForm() {
  console.info("Submiting...");
  const team = getSubmitValues();
  if (editId) {
    team.id = editId;
    updateTeamRequest(team);
  } else {
    createTeamRequest(team);
  }
  cleanValues();
}

async function removeSelected() {
  var checkboxes = $$("#teams-table tbody input[type=checkbox]:checked");

  $("#editForm").classList.add("loading-mask");

  const removeRequests = Array.from(checkboxes).map(checkbox => deleteTeamRequest(checkbox.value));

  removeRequests.push(sleep(2000));
  await Promise.allSettled(removeRequests);
  await loadTeams();
  $("#editForm").classList.remove("loading-mask");
}

function initEvents() {
  $("#remove-selected").addEventListener("click", removeSelected);

  var search = document.getElementById("search-id");

  search.addEventListener(
    "input",
    debounce(event => {
      var searchText = event.target.value;
      filterTeams(searchText);
    }, 1000)
  );

  document.querySelector("#editForm").addEventListener("submit", submitForm);
  // we override reset event here
  document.querySelector("#editForm").addEventListener("reset", cleanValues);

  document.querySelector("#teams-table tbody").addEventListener("click", event => {
    if (event.target.matches("a.delete-btn")) {
      const id = event.target.getAttribute("data-team-id");
      deleteTeam(id);
    } else if (event.target.matches("a.edit-btn")) {
      const id = event.target.getAttribute("data-team-id");
      editTeam(id);
    }
  });
}

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
      return teams;
    });
}

initEvents();
loadTeams();
