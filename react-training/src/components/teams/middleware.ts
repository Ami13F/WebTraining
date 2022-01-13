import { Team } from "./models";

export function loadTeam(): Promise<Team[]> {
  return fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json());
}

export function createTeam(team: Team): Promise<{ success: true; id: string }> {
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(response => response.json());
}

export function deleteTeam(teamId: string): Promise<{ success: boolean }> {
  return fetch("http://localhost:3000/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: teamId })
  }).then(response => response.json());
}
