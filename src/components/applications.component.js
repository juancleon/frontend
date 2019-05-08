import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from "./navigationBar.component";

const Application = props => (
    <tr>
        <td>{props.application.school} </td>
        <td>{props.application.status} </td>
        <td>{props.application.displayDate} </td>
        <td>{props.application.timeLeft} </td>
        <td>
            <Link to={"/editApplication/"+props.application._id}>Edit</Link>
        </td>
        <td>
            <Link to={{
                        pathname: "/deleteApplication/"+props.application._id,
                        state: {timeLeft: props.application.timeLeft,}
                      }}>Delete</Link>
        </td>
    </tr>
)
//<Link to={"/deleteApplication/"+props.application._id}>Delete</Link>
export default class Applications extends Component {

    constructor(props) {
        super (props);

        this.onChangeSortCriteria = this.onChangeSortCriteria.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
        this.onChangeSearchField = this.onChangeSearchField.bind(this);
        this.onChangeSearchCriteria = this.onChangeSearchCriteria.bind(this);

        this.state = {applications: [],
          _isMounted: false,
          _callComponentDidUpdate: true,
          sortCriteria: '',
          searchField: '',
          searchCriteria: ''
        }
    }

  componentDidMount() {
        this._isMounted = true;
        //console.log(`Is mounted inside componentDidMount: ${this.state._isMounted}`);
        axios.get('http://localhost:4000/applications')
            .then(response => {
              this.setState({applications: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

  componentWillUnmount(){
    this._isMounted = false;
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/applications')
        .then(res => {
            //console.log(`Call Component Did Update: ${this._callComponentDidUpdate}`);
            //console.log(`Is Mounted: ${this._isMounted}`);
            //this._isMounted is returning false when the component mounts after sorting then editing
            if(this._isMounted) {
              this.setState({applications: res.data});
          }
        })
        .catch( error => {
          console.log(error);
        });
  }

    applicationList() {
        return this.state.applications.map(function(currentApplication, i) {
            return <Application application={currentApplication} key ={i} />;
        });
    }

    onChangeSortCriteria(e){
        this.setState({
            sortCriteria: e.target.value
        });
    }

    onChangeSearchField(e){
        this.setState({
            searchField: e.target.value
        });
    }

    onChangeSearchCriteria(e){
        this.setState({
            searchCriteria: e.target.value
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

        axios.get('http://localhost:4000/sortApplications/' + this.state.sortCriteria)
          .then(res => {

              this.setState({applications: res.data});
              /*console.log(`Sort Criteria: ${this.state.sortCriteria}`);
              console.log(`Call Component Did Update: ${this.state._callComponentDidUpdate}`);*/

          })
          .catch( error => {
            console.log(error);
          });

          /*this.setState(prevState => ({
              _callComponentDidUpdate: !prevState._callComponentDidUpdate
          }));*/

    }

    onSubmitSearch(e) {
        e.preventDefault();
        this._isMounted = false;
        /*this.setState(prevState => ({
            _callComponentDidUpdate: !prevState._callComponentDidUpdate
        }));*/

        axios.get('http://localhost:4000/searchApplications/' + this.state.searchField+ '/' + this.state.searchCriteria)
          .then(res => {

              this.setState({applications: res.data});
              /*console.log(`Sort Criteria: ${this.state.sortCriteria}`);
              console.log(`Call Component Did Update: ${this.state._callComponentDidUpdate}`);*/

          })
          .catch( error => {
            console.log(error);
          });

          /*this.setState(prevState => ({
              _callComponentDidUpdate: !prevState._callComponentDidUpdate
          }));*/
    }

    render() {
        return (
          <div>
          {<NavigationBar/>}
            <div>
                  <h3>Applications List</h3>
                  <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                          <input type="submit" value="Sort" className="btn btn-primary" />
                      {/*</div>
                      <div className="form-group">*/}
                          <div className="form-check form-check-inline">
                                  <input className="form-check-input"
                                         type="radio"
                                         name="sortOptions"
                                         id="sortBySchool"
                                         value="school"
                                         checked={this.state.sortCriteria==='school'}
                                         onChange={this.onChangeSortCriteria}
                                         />
                                  <label className="form-check-label">School</label>
                            </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input"
                                         type="radio"
                                         name="sortOptions"
                                         id="sortByStatus"
                                         value="status"
                                         checked={this.state.sortCriteria==='status'}
                                         onChange={this.onChangeSortCriteria}
                                         />
                                  <label className="form-check-label">Status</label>
                              </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input"
                                         type="radio"
                                         name="sortOptions"
                                         id="sortByDueDate"
                                         value="dueDate"
                                         checked={this.state.sortCriteria==='dueDate'}
                                         onChange={this.onChangeSortCriteria}
                                         />
                                  <label className="form-check-label">Due Date</label>
                              </div>
                        </div>
                  </form>

                  <form onSubmit={this.onSubmitSearch}>
                     <div className = "form-group">
                        {/*  <label> Search: </label>*/}
                          <input type="text"
                                 className="form-control"
                                 value={this.state.searchCriteria}
                                 onChange={this.onChangeSearchCriteria}
                                 />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" />
                  {/*</div>
                      <div className="form-group">*/}
                            <div className="form-check form-check-inline">
                                  <input className="form-check-input"
                                         type="radio"
                                         name="searchOptions"
                                         id="searchSchool"
                                         value="school"
                                         checked={this.state.searchField==='school'}
                                         onChange={this.onChangeSearchField}
                                         />
                                  <label className="form-check-label">School</label>
                            </div>
                              <div className="form-check form-check-inline">
                                  <input className="form-check-input"
                                         type="radio"
                                         name="searchOptions"
                                         id="searchStatus"
                                         value="status"
                                         checked={this.state.searchField==='status'}
                                         onChange={this.onChangeSearchField}
                                         />
                                  <label className="form-check-label">Status</label>
                              </div>
                              <div className="form-check form-check-inline">
                                      <input className="form-check-input"
                                             type="radio"
                                             name="searchOptions"
                                             id="searchDisplayDate"
                                             value="displayDate"
                                             checked={this.state.searchField==='displayDate'}
                                             onChange={this.onChangeSearchField}
                                             />
                                      <label className="form-check-label">Due Date</label>
                                </div>
                            </div>
                        </form>

                  <table className="table table-striped" style={{marginTop: 20}}>
                      <thead>
                          <tr>
                              <th>School</th>
                              <th>Status</th>
                              <th>Due Date</th>
                              <th>Time Left (Days)</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.applicationList()}
                      </tbody>
                  </table>
              </div>
            </div>
        )
  }
}
