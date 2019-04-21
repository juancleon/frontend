import React, { Component } from 'react';//run development server with "npm start"
import "bootstrap/dist/css/bootstrap.min.css";//npm install bootstrap
import {BrowserRouter as Router, Route, Link} from "react-router-dom";//npm install react-router-dom
import Applications from "./components/applications.component";
import CreateApplication from "./components/create-application.component";
import EditApplication from "./components/edit-application.component";
import DeleteApplication from "./components/delete-application.component";
import TestScores from "./components/testscores.component";
import CreateTestScore from "./components/create-testscore.component";
import EditTestScore from "./components/edit-testscore.component";
import DeleteTestScore from "./components/delete-testscore.component";
import SchoolRecommenderSearchResults from "./components/school-recommender-search-results.component";
import SchoolRecommender from "./components/school-recommender.component";
import SavedSearches from "./components/saved-searches.component";

//npm install axios

{/*import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";*/}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

        <nav className = "navbar navbar-expand-lg navbar-light bg-light">
            <div className = "collapse navbar-collapse">
              <ul className = "navbar-nav mr-auto">
              {/*  <li className = "navbar-item">
                  <Link to ="/" className = "nav-link">Todos</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/create" className = "nav-link">Create ToDo</Link>
                </li>*/}
                <li className = "navbar-item">
                  <Link to ="/" className = "nav-link">School Recommender</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/applications" className = "nav-link">Applications</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/createApplication" className = "nav-link">Create Application</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/testScores" className = "nav-link">Test Scores</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/createTestScore" className = "nav-link">Create Test Score</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/savedSearches" className = "nav-link">Saved Searches</Link>
                </li>
              </ul>
            </div>
          </nav>


          <h2>School Application Helper</h2>
          {/*}<Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />*/}
          <Route path="/applications" component={Applications} />
          <Route path="/createApplication" component={CreateApplication} />
          <Route path="/editApplication/:id" component={EditApplication} />
          <Route path="/deleteApplication/:id" component={DeleteApplication} />
          <Route path="/testScores" component={TestScores} />
          <Route path="/createTestScore" component={CreateTestScore} />
          <Route path="/editTestScore/:id" component={EditTestScore} />
          <Route path="/deleteTestScore/:id" component={DeleteTestScore} />
          <Route path="/" exact component={SchoolRecommender} />
          <Route path="/searchResults" component={SchoolRecommenderSearchResults} />
          <Route path="/savedSearches" component={SavedSearches} />
        </div>
      </Router>
    );
  }
}

export default App;
