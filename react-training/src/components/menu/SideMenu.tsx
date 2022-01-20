import { TodosApp } from "../todo/todo";
import "../../styles/sideMenu.css";

export default function SideMenu() {
  return (
    <div id="side-menu">
      <section>Ami's React App</section>
      <section>
        <h2>To learn:</h2>
        <TodosApp />
      </section>
    </div>
  );
}
