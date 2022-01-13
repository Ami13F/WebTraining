import { useState } from "react";
import SideMenu from "../menu/SideMenu";
import TeamsTableComponent from "../teams/TeamsTable";

export default function ContentWrapper() {
  return (
    <section id="content">
      <SideMenu />
      <div id="main">
        <div>
          <input id="search-id" type="text" placeholder="Search" />
          <button id="remove-selected">Remove Selected ✖</button>
        </div>
        <TeamsTableComponent />
      </div>
    </section>
  );
}
