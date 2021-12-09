console.info("hello, Ami");

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

for (var i = 0; i < teams.length; i++) {
  var tb = document.querySelector("#teams-table tbody");
  var tr = getTeamHTML(teams[i]);
  tb.innerHTML += tr;
}
