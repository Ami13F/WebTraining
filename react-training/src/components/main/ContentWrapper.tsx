import { ChangeEvent, useState } from "react";
import SideMenu from "../menu/SideMenu";
import TeamsTableComponent from "../teams/TeamsTable";

export default function ContentWrapper() {
  const [search, setSearch] = useState("");

  function startSearching(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }
  return (
    <section id="content">
      <SideMenu />
      <div id="main">
        <div>
          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={e => {
              startSearching(e);
            }}
          />
          <button>Remove Selected ✖</button>
        </div>
        <TeamsTableComponent search={search} />
      </div>
    </section>
  );
}
