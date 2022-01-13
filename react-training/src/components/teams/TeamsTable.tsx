import React, { useState } from "react";
import { createTeam, loadTeam } from "./middleware";
import { Team } from "./models";
import "../../styles/loading.css";

type Props = {
  loading: boolean;
  teams: Team[];
};

type Actions = {
  // save: () => void;
  save(team: Team): void;
};

function getValues(form: any): Team {
  return ["promotion", "members", "url", "name"].reduce((team: any, key) => {
    team[key] = form[key].value;
    return team;
  }, {} as Team); // empty json for default preview
}

export function TeamsTable(props: Props & Actions) {
  return (
    <form
      className={props.loading === true ? "loading-mask" : ""}
      id="editForm"
      onSubmit={e => {
        e.preventDefault();
        var form = e.target as any;
        const team = getValues(form);
        console.log(team);
        props.save(team);
      }}
    >
      <table id="teams-table">
        <colgroup>
          <col span={1} className="select-cell" />
          <col span={1} />
          <col span={1} />
          <col span={1} />
          <col span={1} />
          <col span={1} style={{ width: "100px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="select-all" />
            </th>
            <th>Group</th>
            <th>Members</th>
            <th>Project Name</th>
            <th>Project URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.teams.map(team => {
            return (
              <tr key={team.id}>
                <td style={{ textAlign: "center" }}>
                  <input value={team.id} type="checkbox" />
                </td>
                <td>{team.promotion}</td>
                <td>{team.members}</td>
                <td>{team.name}</td>
                <td>
                  <a href={team.url} target="_blank">
                    {team.url.replace("https://github.com/", "")}
                  </a>
                </td>
                <td>
                  <a href="#" data-team-id={team.id} className="edit-btn">
                    &#9998;
                  </a>
                  <a href="#" data-team-id={team.id} className="delete-btn">
                    &#10006;
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input type="text" name="promotion" required placeholder="Promotion" />
            </td>
            <td>
              <input type="text" name="members" required placeholder="Members" />
            </td>
            <td>
              <input type="text" name="name" required placeholder="Name" />
            </td>
            <td>
              <input type="text" name="url" required placeholder="Url" />
            </td>
            <td>
              <button type="submit">➕</button>
              <button type="reset">❌</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  );
}

export default class TeamsTableComponent extends React.Component<{}, Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      teams: []
    };
  }

  componentDidMount() {
    loadTeam()
      .then((teams: Team[]) => {
        this.setState({
          teams
        });
      })
      .then(_ => {
        this.setState({ loading: false });
      });
  }

  async save(team: Team) {
    this.setState({
      loading: true
    });
    const response = await createTeam(team);
    console.log("response", response);
    team.id = response.id;
    this.setState(previewState => {
      return {
        loading: false,
        teams: [...previewState.teams, team]
      };
    });
  }

  render() {
    const { loading, teams } = this.state;

    return (
      <TeamsTable
        teams={teams}
        loading={loading}
        save={team => {
          this.save(team);
        }}
      />
    );
  }
}
