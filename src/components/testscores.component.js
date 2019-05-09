import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from "./navigationBar.component";

const TestScore = props => (
    <tr>
        <td>{props.testScore.testType} </td>
        <td>{props.testScore.mathScore} </td>
        <td>{props.testScore.verbalScore} </td>
        <td>{props.testScore.displayDate} </td>
        <td>{props.testScore.timeSinceTaken} </td>
        <td>
            <Link to={'/editTestScore/'+props.testScore._id}>Edit</Link>
        </td>
        <td>
            <Link to={{
                        pathname: '/deleteTestScore/'+props.testScore._id,
                        state: {timeSinceTaken: props.testScore.timeSinceTaken}
                      }}>Delete</Link>
        </td>
    </tr>
)
//<Link to={'/deleteTestScore/'+props.testScore._id}>Delete</Link>

export default class TestScores extends Component {
  constructor(props) {
      super (props);

      this.onChangeSortCriteria = this.onChangeSortCriteria.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {testScores: [],
        _isMounted: false,
        sortCriteria: '',
      }
  }

  componentDidMount() {
      this._isMounted = true;
      axios.get('http://localhost:4000/testScores')
          .then(response => {
              this.setState({testScores: response.data});
          })
          .catch(function (error) {
              console.log(error);
          })
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/testScores')
      .then(res => {
          if(this._isMounted) {
          this.setState({testScores: res.data});
        }
      })
      .catch( error => {
        console.log(error);
      });
  }

  testScoreList() {
      return this.state.testScores.map(function(currentTestScore, i) {
          return <TestScore testScore={currentTestScore} key ={i} />;
      });
  }

  onChangeSortCriteria(e){
      this.setState({
          sortCriteria: e.target.value
      });
  }

  onSubmit(e) {
      e.preventDefault();
      //console.log(`Is mounted inside submit: ${this.state._isMounted}`);
      //console.log(`Is mounted inside submit: ${this._isMounted}`);
      this._isMounted = false;
      /*this.setState(prevState => ({
          _callComponentDidUpdate: !prevState._callComponentDidUpdate
      }));*/

      axios.get('http://localhost:4000/sortTestScores/' + this.state.sortCriteria)
        .then(res => {

            this.setState({testScores: res.data});
            /*console.log(`Sort Criteria: ${this.state.sortCriteria}`);
            console.log(`Call Component Did Update: ${this.state._callComponentDidUpdate}`);*/

        })
        .catch( error => {
          console.log(error);
        });
}

  render() {
      return (
            <div>
            {<NavigationBar/>}
              <div>
              <h3> Test Scores List</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <input type="submit" value="Sort" className="btn btn-primary" />
                  {/*</div>
                  <div className="form-group">*/}
                      <div className="form-check form-check-inline">
                              <input className="form-check-input"
                                     type="radio"
                                     name="sortOptions"
                                     id="sortByTestType"
                                     value="testType"
                                     checked={this.state.sortCriteria==='testType'}
                                     onChange={this.onChangeSortCriteria}
                                     />
                              <label className="form-check-label">Test Type</label>
                        </div>
                          <div className="form-check form-check-inline">
                              <input className="form-check-input"
                                     type="radio"
                                     name="sortOptions"
                                     id="sortByMathScore"
                                     value="mathScore"
                                     checked={this.state.sortCriteria==='mathScore'}
                                     onChange={this.onChangeSortCriteria}
                                     />
                              <label className="form-check-label">Math Score</label>
                          </div>
                          <div className="form-check form-check-inline">
                              <input className="form-check-input"
                                     type="radio"
                                     name="sortOptions"
                                     id="sortByverbalScore"
                                     value="verbalScore"
                                     checked={this.state.sortCriteria==='verbalScore'}
                                     onChange={this.onChangeSortCriteria}
                                     />
                              <label className="form-check-label">Verbal Score</label>
                          </div>
                          <div className="form-check form-check-inline">
                              <input className="form-check-input"
                                     type="radio"
                                     name="sortOptions"
                                     id="sortByDateTaken"
                                     value="dateTaken"
                                     checked={this.state.sortCriteria==='dateTaken'}
                                     onChange={this.onChangeSortCriteria}
                                     />
                              <label className="form-check-label">Date Taken</label>
                          </div>
                    </div>
              </form>
              <table className="table table-striped" style={{marginTop: 20}}>
                  <thead>
                      <tr>
                          <th>Test Type</th>
                          <th>Math Score</th>
                          <th>Verbal Score</th>
                          <th>Date Taken</th>
                          <th>Time Since Taken (Days)</th>
                      </tr>
                  </thead>
                  <tbody>
                      {this.testScoreList()}
                  </tbody>
              </table>
              </div>
          </div>
      )
  }
}
