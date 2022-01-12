import { useState } from "react";
import SideMenu from "../menu/SideMenu";
import TeamsTable, { Team } from "../teams/TeamsTable";

export default function ContentWrapper() {
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
        setTeams(fetchedTeams);
      });
  }

  const [newTeams, setTeams] = useState([]);
  // loadTeams();

  return (
    <section id="content">
      <SideMenu />
      <div id="main">
        <div>
          <input id="search-id" type="text" placeholder="Search" />
          <button id="remove-selected">Remove Selected ✖</button>
        </div>
        <TeamsTable teams={newTeams} />
      </div>
    </section>
  );
}
