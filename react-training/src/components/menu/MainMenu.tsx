import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import "../../styles/menu.css";

function MainMenuHTML() {
  return (
    <ul id="top-menu-bar">
      <li>
        <a href="#home">Home</a>
      </li>
      <li>
        <a href="#teams">Teams</a>
      </li>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
    </ul>
  );
}
type Active = "home" | "teams" | "about" | "contact";

export default function MainMenu() {
  const [active, setActive] = useState<Active>("teams");

  return (
    <div id="top-menu-bar">
      <ToggleButtonGroup
        value={active}
        exclusive
        onChange={(e, newActive) => {
          console.log(newActive);
          setActive(newActive);
        }}
      >
        <ToggleButton value="home">
          <a href="#home">Home</a>
        </ToggleButton>
        <ToggleButton value="teams">
          <a href="#teams">Teams</a>
        </ToggleButton>
        <ToggleButton value="about">
          <a href="#about">About</a>
        </ToggleButton>
        <ToggleButton value="contact">
          <a href="#contact">Contact</a>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
