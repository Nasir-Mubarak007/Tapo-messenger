// import { Button } from "@chakra-ui/react";
// import { FaEye } from "react-icons/fa";
import { Route } from "react-router-dom";

import "./App.css";
import Chats from "./Pages/chats";
import Auth from "./Pages/auth";
// import { useContext } from "react";
// import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={Auth} exact />
      <Route path={"/chats"} component={Chats} />
    </div>
  );
}

export default App;
