import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/footer";
import SideMenu from "./components/menu/SideMenu";
import ContentWrapper from "./components/main/ContentWrapper";

function App() {
  return (
    <>
      <AppHeader />
      <ContentWrapper />
      <AppFooter />
    </>
  );
}

export default App;
