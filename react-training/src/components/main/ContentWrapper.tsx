import SideMenu from "../menu/SideMenu";
import TeamsTable from "../teams/TeamsTable";

export default function ContentWrapper() {
  return (
    <section id="content">
      <SideMenu />
      <div id="main">
        <div>
          <input id="search-id" type="text" placeholder="Search" />
          <button id="remove-selected">Remove Selected ✖</button>
        </div>
        <TeamsTable />
      </div>
    </section>
  );
}
