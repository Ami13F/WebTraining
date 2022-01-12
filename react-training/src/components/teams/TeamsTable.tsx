export default function TeamsTable() {
  return (
    <form
      id="editForm"
      action=""
      onSubmit={e => {
        e.preventDefault();
        console.warn("test");
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
        <tbody></tbody>
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
