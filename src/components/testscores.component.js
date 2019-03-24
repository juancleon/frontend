import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TestScore = props => (
    <tr>
        <td>{props.testScore.testType} </td>
        <td>{props.testScore.mathScore} </td>
        <td>{props.testScore.verbalScore} </td>
        <td>
            <Link to={'/editTestScore/'+props.testScore._id}>Edit</Link>
        </td>
        <td>
            <Link to={'/deleteTestScore/'+props.testScore._id}>Delete</Link>
        </td>
    </tr>
)

export default class TestScores extends Component {
  constructor(props) {
      super (props);
      this.state = {testScores: [],
        _isMounted: false}
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

  render() {
      return (
          <div>
          <h3> Test Scores List</h3>
          <table className="table table-striped" style={{marginTop: 20}}>
              <thead>
                  <tr>
                      <th>Test Type</th>
                      <th>Math Score</th>
                      <th>Verbal Score</th>
                  </tr>
              </thead>
              <tbody>
                  {this.testScoreList()}
              </tbody>
          </table>
          </div>
      )
  }
}
