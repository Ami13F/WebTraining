import { Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import SideMenu from "../menu/SideMenu";
import TeamsTableComponent from "../teams/TeamsTable";

export default function ContentWrapper() {
  const [search, setSearch] = useState("");

  function startSearching(e: string) {
    setSearch(e);
  }
  return (
    <section id="content">
      <SideMenu />
      <div id="main">
        <div>
          <TextField
            type="text"
            value={search}
            label="Search"
            onChange={e => {
              startSearching(e.target.value);
            }}
          />
          <Button variant="contained">Remove Selected ✖</Button>
        </div>
        <TeamsTableComponent search={search} />
      </div>
    </section>
  );
}
