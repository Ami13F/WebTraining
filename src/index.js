console.info("Hello, Ami");

var teams = [
  {
    promotion: "itiviti2021",
    members: "Amelia",
    projectName: "Team Networking",
    url: "https://www.w3schools.com/"
  },
  {
    promotion: "itiviti2022",
    members: "Restu",
    projectName: "Team Networking",
    url: "https://www.w3schools.com/"
  }
];

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

teams.forEach(team => {
  var tr = getTeamHTML(team);
  tb.innerHTML += tr;
});

var m = teams.map(function (team) {
  return getTeamHTML(team);
});

tb.innerHTML = m.join("");
