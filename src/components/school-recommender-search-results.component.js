import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const School = props => (
    <tr>
        <td>{props.school.name} </td>
        <Link to={props.school.schoolUrl}></Link>
        <td>{props.school.zipCode} </td>
        <td>{props.school.costOfLiving} </td>
        <td>{props.school.programsOffered} </td>
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

        axios.get('http://localhost:4000/searchSchools/'+ this.props.location.state.zipCode + '/' + this.props.location.state.costOfLiving + '/' + this.props.location.state.programOfInterest)
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

    componentDidUpdate() {
        axios.get('http://localhost:4000/searchSchools/'+ this.props.location.state.zipCode + '/' + this.props.location.state.costOfLiving + '/' + this.props.location.state.programOfInterest)
        .then(res => {
            if(this._isMounted) {
            this.setState({schools: res.data});
          }
        })
        .catch( error => {
          console.log(error);
        });
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
                      <th>Cost of Living</th>
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
