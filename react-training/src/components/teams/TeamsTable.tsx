import React, { useState } from "react";
import { createTeam, deleteTeam, loadTeam, updateTeam } from "./middleware";
import { Team } from "./models";
import "../../styles/loading.css";
import Highlighted from "../Highlighted";
import { Autocomplete, TextField } from "@mui/material";

type CommonProps = {
  loading: boolean;
  team: Team;
  teams: Team[];
};
type Props = CommonProps & {
  search: string;
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
        // var form = e.target as HTMLFormElement;
        // const team = getValues(form);
        props.save(props.team);
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
                <td>
                  {" "}
                  <Highlighted text={team.promotion} highlight={props.search} />
                </td>
                <td>
                  <Highlighted text={team.members} highlight={props.search} />
                </td>
                <td
                // dangerouslySetInnerHTML={{
                //   __html: props.search
                //     ? team.name.replaceAll(new RegExp(props.search, "gi"), m => `<mark>${m}</mark>`)
                //     : team.name
                // }}
                >
                  <Highlighted text={team.name} highlight={props.search} />
                </td>
                <td>
                  <a href={team.url} target="_blank">
                    <Highlighted text={team.url.replace("https://github.com/", "")} highlight={props.search} />
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
              <Autocomplete
                options={[...new Set(props.teams.map(team => team.promotion))]}
                renderInput={params => <TextField required {...params} label="Promotion" />}
                onChange={(e, newValue) => {
                  props.inputChanged("promotion", newValue || "");
                }}
              />
              {/* <input
                type="text"
                name="promotion"
                value={props.team.promotion}
                onChange={e => {
                  props.inputChanged(e.target.promotion, e.target.value);
                }}
                required
                placeholder="Promotion"
              /> */}
            </td>
            <td>
              <Autocomplete
                options={[...new Set(props.teams.map(team => team.members))]}
                renderInput={params => <TextField required {...params} label="Members" />}
                onChange={(e, newValue) => {
                  props.inputChanged("members", newValue || "");
                }}
              />
            </td>
            <td>
              <TextField
                type="text"
                name="name"
                fullWidth
                value={props.team.name}
                onChange={e => {
                  props.inputChanged(e.target.name, e.target.value);
                }}
                required
                label="Name"
              />
            </td>
            <td>
              <TextField
                type="text"
                name="url"
                fullWidth
                value={props.team.url}
                onChange={e => {
                  props.inputChanged(e.target.name, e.target.value);
                }}
                required
                label="Url"
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

type TableProps = {
  search?: string;
};

type TableState = CommonProps & {
  filteredTeams: Team[] | null;
};

export default class TeamsTableComponent extends React.Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      loading: true,
      team: { ...emptyTeam },
      teams: [],
      filteredTeams: null
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

  componentDidUpdate(prevProps: TableProps, prevState: TableState) {
    let search = this.props.search || "";
    if (search !== prevProps.search || this.state.teams !== prevState.teams) {
      search = search.toLocaleLowerCase();
      // or search changed or teams array updated
      if (search) {
        this.setState(state => ({
          filteredTeams: state.teams.filter(
            team =>
              team.id.toLowerCase().indexOf(search) > -1 ||
              team.promotion.toLowerCase().indexOf(search) > -1 ||
              team.name.toLowerCase().indexOf(search) > -1 ||
              team.members.toLowerCase().indexOf(search) > -1 ||
              team.url.toLowerCase().indexOf(search) > -1
          )
        }));
      } else {
        this.setState({
          filteredTeams: null
        });
      }
    }
  }

  async save(team: Team) {
    this.setState({
      loading: true
    });
    if (team.id) {
      const response = await updateTeam(team);
      this.setState(state => ({
        loading: false,
        teams: state.teams.map(t => {
          if (team.id === t.id) {
            return { ...team };
          }
          return t;
        })
      }));
    } else {
      const response = await createTeam(team);
      team.id = response.id;
      this.setState(previewState => ({
        loading: false,
        teams: [...previewState.teams, team]
      }));
    }
    this.reset();
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
    // console.info("changed", name, value);
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
    const { loading, team, teams, filteredTeams } = this.state;
    const { search } = this.props;

    return (
      <TeamsTable
        teams={filteredTeams !== null ? filteredTeams : teams}
        loading={loading}
        team={team}
        search={search || ""}
        save={this.save}
        delete={this.delete}
        startEdit={this.startEdit}
        reset={this.reset}
        inputChanged={this.inputChange}
      />
    );
  }
}
