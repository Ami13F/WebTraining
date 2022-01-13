import { Team } from "./models";

export function loadTeam(): Promise<Team[]> {
  return fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}
