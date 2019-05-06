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

        this.state = {applications: [],
          _isMounted: false,
          _callComponentDidUpdate: true,
          sortCriteria: ''
        }
    }

  componentDidMount() {
        this._isMounted = true;
        console.log(`Is mounted inside componentDidMount: ${this.state._isMounted}`);
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
          console.log(`Call component did update: ${this.state._callComponentDidUpdate}`);
          console.log(`Is mounted: ${this.state._isMounted}`);
          if(this._isMounted && this._callComponentDidUpdate) {
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

    onSubmit(e) {
          e.preventDefault();

          this.setState(prevState => ({
              _callComponentDidUpdate: !prevState._callComponentDidUpdate
          }));

          axios.get('http://localhost:4000/sortApplications/' + this.state.sortCriteria)
            .then(res => {
                if(this._isMounted) {
                this.setState({applications: res.data});
                /*console.log(`Sort Criteria: ${this.state.sortCriteria}`);
                console.log(`Call Component Did Update: ${this.state._callComponentDidUpdate}`);*/
              }
            })
            .catch( error => {
              console.log(error);
            });

            this.setState(prevState => ({
                _callComponentDidUpdate: !prevState._callComponentDidUpdate
            }));
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
