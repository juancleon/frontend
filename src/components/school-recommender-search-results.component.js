import React, {Component } from 'react';
import axios from 'axios';

const School = props => (
    <tr>
        <td>{props.school.name}</td>
        <td>
            <a href={props.school.schoolURL} target="_blank">{props.school.schoolURL}</a>
        </td>
        <td>{props.school.zipCode}</td>
        <td>{props.school.costOfLivingIndex}</td>
        <td>{props.school.state}</td>
        <td>{props.school.programsOfferedArray}</td>
    </tr>
)

export default class SchoolRecommenderSearchResults extends Component {
  constructor(props) {
      super (props);
      this.state = {schools: [],
        _isMounted: false
      }
  }

  componentDidMount() {
        this._isMounted = true;

        axios.get('http://localhost:4000/searchSchools/'+ this.props.location.state.zipCode + '/' + this.props.location.state.costOfLivingIndex + '/' + this.props.location.state.programOfInterest)
            .then(response => {
                this.setState({schools: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillUnmount(){
      this._isMounted = false;
    }

    schoolList() {
        return this.state.schools.map(function(currentSchool, i) {
            return <School school={currentSchool} key ={i} />;
        });
    }

render() {
  return (
      <div>
          <h3>Search Results</h3>
          <table className="table table-striped" style={{marginTop: 20}}>
              <thead>
                  <tr>
                      <th>School Name</th>
                      <th>Website</th>
                      <th>Zip Code</th>
                      <th>Cost of Living Index</th>
                      <th>State</th>
                      <th>Program(s) Offered</th>
                  </tr>
              </thead>
              <tbody>
                  {this.schoolList()}
              </tbody>
          </table>
      </div>
  )
  }
}
