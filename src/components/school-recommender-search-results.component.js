import React, {Component } from 'react';
import axios from 'axios';
import NavigationBar from "./navigationBar.component";

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

      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        zipCode: '',
        costOfLivingIndex: '',
        programOfInterest: '',
        schools: [],
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

    onSubmit(e) {
        e.preventDefault();

        const newSchoolRecommenderSearchResult = {
                  zipCode: this.props.location.state.zipCode,
                  costOfLivingIndex: this.props.location.state.costOfLivingIndex,
                  programOfInterest: this.props.location.state.programOfInterest,
        }

        axios.post('http://localhost:4000/savedSearches/add', newSchoolRecommenderSearchResult)
            .then(res => console.log(res.data));

        this.setState({
          zipCode: '',
          costOfLivingIndex: '',
          programOfInterest: '',
          schools: []
        });
        alert('Your search was saved successfully.');
        //this.props.history.push('/savedSearches');

    }

render() {
  return (
    <div>
    {<NavigationBar/>}
        <div>
            <h3>Search Results
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="submit" value="Save Search" className="btn btn-primary" />
                </div>
            </form>
            </h3>
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
      </div>
  )
  }
}
