import React, { useState } from "react";
import { createTeam, deleteTeam, loadTeam } from "./middleware";
import { Team } from "./models";
import "../../styles/loading.css";
import { isEmptyStatement } from "typescript";

type Props = {
  loading: boolean;
  team: Team;
  teams: Team[];
};

type Actions = {
  // save: () => void;
  save(team: Team): void;
  delete(teamId: string): void;
  startEdit(teamId: string): void;
  reset(): void;
  inputChanged(name: string, value: string): void;
};

function getValues(form: HTMLFormElement): Team {
  return ["promotion", "members", "url", "name"].reduce((team: any, key) => {
    team[key] = form[key].value;
    return team;
  }, {} as Team); // empty json for default preview
}

export function TeamsTable(props: Props & Actions) {
  return (
    <form
      className={props.loading === true ? "loading-mask" : ""}
      onSubmit={e => {
        e.preventDefault();
        var form = e.target as HTMLFormElement;
        const team = getValues(form);
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
                  <a
                    href="#"
                    data-team-id={team.id}
                    className="edit-btn"
                    onClick={() => {
                      props.startEdit(team.id);
                    }}
                  >
                    &#9998;
                  </a>
                  <a
                    href="#"
                    data-team-id={team.id}
                    className="delete-btn"
                    onClick={() => {
                      props.delete(team.id);
                    }}
                  >
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
              <input
                type="text"
                name="promotion"
                value={props.team.promotion}
                onChange={e => {
                  props.inputChanged(e.target.name, e.target.value);
                }}
                required
                placeholder="Promotion"
              />
            </td>
            <td>
              <input
                type="text"
                name="members"
                value={props.team.members}
                onChange={e => {
                  props.inputChanged(e.target.name, e.target.value);
                }}
                required
                placeholder="Members"
              />
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={props.team.name}
                onChange={e => {
                  props.inputChanged(e.target.name, e.target.value);
                }}
                required
                placeholder="Name"
              />
            </td>
            <td>
              <input
                type="text"
                name="url"
                value={props.team.url}
                onChange={e => {
                  props.inputChanged(e.target.name, e.target.value);
                }}
                required
                placeholder="Url"
              />
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

const emptyTeam: Team = {
  id: "",
  members: "",
  name: "",
  url: "",
  promotion: ""
};

export default class TeamsTableComponent extends React.Component<{}, Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      team: { ...emptyTeam },
      teams: []
    };
    // // override/bind save method to keep reference to this.save
    // const originalSave = this.save;
    // this.save = async team => {
    //   console.log("another save", this);
    //   originalSave.call(this, team);
    // };
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.reset = this.reset.bind(this);
    this.inputChange = this.inputChange.bind(this);
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
    team.id = response.id;
    this.setState(previewState => ({
      loading: false,
      teams: [...previewState.teams, team]
    }));
  }

  async delete(teamId: string) {
    this.setState({
      loading: true
    });
    const response = await deleteTeam(teamId);
    if (response.success) {
      this.setState(state => ({
        loading: false,
        teams: state.teams.filter(team => team.id !== teamId)
      }));
    }
  }

  startEdit(teamId: string) {
    this.setState(state => ({
      team: state.teams.find(team => team.id === teamId)!
    }));
  }

  inputChange(name: string, value: string) {
    console.warn("changed", name, value);

    this.setState(state => ({
      team: { ...state.team, [name]: value }
    }));
  }

  reset() {
    this.setState({
      team: { ...emptyTeam }
    });
  }
  render() {
    const { loading, team, teams } = this.state;
    return (
      <TeamsTable
        teams={teams}
        loading={loading}
        team={team}
        save={this.save}
        delete={this.delete}
        startEdit={this.startEdit}
        reset={this.reset}
        inputChanged={this.inputChange}
      />
    );
  }
}
