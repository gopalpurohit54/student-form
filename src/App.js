import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import CreateStudent from "./components/student-form/CreateStudent";
import UpdateStudent from "./components/update-student/UpdateStudent";
import StudentList from "./components/student-list/StudentList";
import NavigationBar from "./components/navbar/NavigationBar";
import store from "./redux/Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={StudentList} />
          <Route path="/edit" component={UpdateStudent} />
          <Route path="/create" component={CreateStudent} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
