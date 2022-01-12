export type Team = {
  id: string | number;
  members: string;
  name: string;
  url: string;
  promotion: string;
};

type Props = {
  teams: Team[];
};

export default function TeamsTable(props: Props) {
  return (
    <form
      id="editForm"
      onSubmit={e => {
        e.preventDefault();
        console.warn("submit done", props);
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
