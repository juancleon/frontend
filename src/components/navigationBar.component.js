import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {

  render() {
    return (
        <div className="container" >
          <nav className = "navbar navbar-expand-lg navbar-light bg-light">
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
                    <Link to ="/" className = "nav-link">Logout</Link>
                  </li>
                </ul>
              </div>
            </nav>
        </div>
    );
  }
}
