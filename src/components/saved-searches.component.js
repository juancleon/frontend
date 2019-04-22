import React, {Component } from 'react';
import axios from 'axios';

const SchoolRecommenderSearchResult = props => (

    <table className="table table-striped" style={{marginTop: 20}}>
        <thead>
            <th>Search Criteria</th>
            <tr>
                <th>Zip Code</th>
                <th>Cost of Living Index</th>
                <th>Program(s) of Interest</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{props.schoolRecommenderSearchResult.zipCode}</td>
                <td>{props.schoolRecommenderSearchResult.costOfLivingIndex}</td>
                <td>{props.schoolRecommenderSearchResult.programOfInterest}</td>
            </tr>
          {/*  <th>Search Results</th>
            <tr>
                <th>School Name</th>
                <th>Website</th>
                <th>Zip Code</th>
                <th>Cost of Living Index</th>
                <th>State</th>
                <th>Program(s) Offered</th>
            </tr>*/}
            </tbody>
      </table>

)

export default class SavedSearches extends Component {
  constructor(props) {
      super (props);
      this.state = {schoolRecommenderSearchResults: [],
        _isMounted: false
      }
  }

  componentDidMount() {
        this._isMounted = true;

        axios.get('http://localhost:4000/savedSearches')
            .then(response => {
                this.setState({schoolRecommenderSearchResults: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillUnmount(){
      this._isMounted = false;
    }

    savedSearchList() {
        return this.state.schoolRecommenderSearchResults.map(function(currentSchoolRecommenderSearchResult, i) {
            return <SchoolRecommenderSearchResult schoolRecommenderSearchResult={currentSchoolRecommenderSearchResult} key ={i} />;
        });
    }

render() {
  return (
      <div>
          <h4>Saved Searches</h4>
          <table className="table table-striped" style={{marginTop: 20}}>
              <tbody>
                  {this.savedSearchList()}
              </tbody>
          </table>
      </div>
  )
  }
}
