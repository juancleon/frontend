import React, {Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavigationBar from "./navigationBar.component";

const SchoolRecommenderSearchResult = props => (

    <table className="table table-striped" style={{marginTop: 20}}>
        <thead>
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
                <td>
              <Link to={{
                          pathname: '/searchResults',
                          state: {zipCode: props.schoolRecommenderSearchResult.zipCode,
                                  costOfLivingIndex: props.schoolRecommenderSearchResult.costOfLivingIndex,
                                  programOfInterest:props.schoolRecommenderSearchResult.programOfInterest}

                        }}>Search</Link>
                </td>
            </tr>
          </tbody>
      </table>
)

export default class SavedSearches extends Component {
  constructor(props) {
      super (props);
      this.state = {schoolRecommenderSearchResults: [],
        schools: [],
        _isMounted: false
      }
  }

  componentDidMount() {
        this._isMounted = true;

        axios.get('http://localhost:4000/savedSearches')
            .then(response => {
                this.setState({
                  schoolRecommenderSearchResults: response.data,
                  schools: response.data.schools
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentWillUnmount() {
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
        {<NavigationBar/>}
            <div>
                <h4>Saved Searches</h4>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <tbody>
                        {this.savedSearchList()}
                    </tbody>
                </table>
            </div>
          </div>
      )
      }
}
