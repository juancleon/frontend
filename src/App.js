import React, { Component } from 'react';//run development server with "npm start"
import "bootstrap/dist/css/bootstrap.min.css";//npm install bootstrap
import {BrowserRouter as Router, Route} from "react-router-dom";//npm install react-router-dom
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
import DeleteSavedSearch from "./components/delete-savedSearch.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import NavigationBar from "./components/navigationBar.component";
import Calendar from "./components/calendar.component";
import "./App.css";
//npm install axios

class App extends Component {

  /*constructor(props) {
    super(props);

    this.state = { userName: ''
    };
  }

  onUsernameChange = (userName) => {
    this.setState({
      userName: userName
    });
  }*/

  render() {
    return (
      <Router>
        <div className="container">

        {/*<nav className = "navbar navbar-expand-lg navbar-light bg-light">
            <div className = "collapse navbar-collapse">
              <ul className = "navbar-nav mr-auto">
                <li className = "navbar-item">
                  <Link to ="/schoolRecommender" className = "nav-link">School Recommender</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/savedSearches" className = "nav-link">Saved Searches</Link>
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
                  <Link to ="/register" className = "nav-link">Register</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/" className = "nav-link">Login</Link>
                </li>
                <li className = "navbar-item">
                  <Link to ="/navigationBar" className = "nav-link">Navigation Bar</Link>
                </li>
              </ul>
            </div>
          </nav>*/}


          <h2>School Application Helper</h2>
          <Route path="/applications" component={Applications} />
          <Route path="/createApplication" component={CreateApplication} />
          <Route path="/editApplication/:id" component={EditApplication} />
          <Route path="/deleteApplication/:id" component={DeleteApplication} />
          <Route path="/testScores" component={TestScores} />
          <Route path="/createTestScore" component={CreateTestScore} />
          <Route path="/editTestScore/:id" component={EditTestScore} />
          <Route path="/deleteTestScore/:id" component={DeleteTestScore} />
          <Route path="/" exact component={Login}/>
          <Route path="/searchResults" component={SchoolRecommenderSearchResults} />
          <Route path="/savedSearches" component={SavedSearches} />
          <Route path="/deleteSavedSearch/:id" component={DeleteSavedSearch} />
          <Route path="/register" component={Register} />
          <Route path="/schoolRecommender" component={SchoolRecommender} />
          <Route path="/navigationBar" component={NavigationBar} />
          <Route path="/calendar" component={Calendar} />
        </div>
      </Router>
    );
  }
}

export default App;
