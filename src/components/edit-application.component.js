import React, {Component } from 'react';
import axios from 'axios';
import NavigationBar from "./navigationBar.component";

export default class EditApplication extends Component {

  constructor(props) {
      super(props);

      this.onChangeSchool = this.onChangeSchool.bind(this);
      this.onChangeStatus = this.onChangeStatus.bind(this);
      this.onChangedueDate = this.onChangedueDate.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          school: '',
          status: '',
          dueDate: Date,
          displayDate: '',
          currentDate: Date
      }
  }

  componentDidMount(){
      axios.get('http://localhost:4000/applications/'+this.props.match.params.id)
          .then(response => {
            if (response.data.dueDate == null)
            {
              this.setState({
                  school: response.data.school,
                  status: response.data.status,
                  dueDate: Date,
                  displayDate: '',
                  currentDate: Date,
              })
            }
            else {
              this.setState({
                  school: response.data.school,
                  status: response.data.status,
                  dueDate: response.data.dueDate.substring(0, 10),
                  displayDate: response.data.displayDate,
                  currentDate: response.data.currentDate,
              })
            }
          })
          .catch(function(error){
              console.log(error)
          })
  }

  onChangeSchool(e) {
    this.setState({
        school: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
        status: e.target.value
    });
  }

  onChangedueDate(e){
      this.setState({
          dueDate: e.target.value
      });
  }

  onSubmit(e) {
      e.preventDefault();
      if (Object.keys(this.state.dueDate).length == 0)
      {
        const obj = {
            school: this.state.school,
            status: this.state.status,
            dueDate: this.state.dueDate,
            displayDate: '',
            currentDate: Date.now()
        }

        axios.post('http://localhost:4000/applications/update/' + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
      }
      else {
        const obj = {
            school: this.state.school,
            status: this.state.status,
            dueDate: this.state.dueDate,
            displayDate: this.state.dueDate.substring(0, 10),
            currentDate: Date.now()
        }

        axios.post('http://localhost:4000/applications/update/' + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
      }
      alert('Application updated successfully.');

      this.setState({
        school: '',
        status: '',
        dueDate: Date,
        displayDate: '',
        currentDate: Date
      })
      this.props.history.push('/applications');
  }

  render() {
      return (
          <div>
          {<NavigationBar/>}
              <h3>Update Application</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>School: </label>
                      <input  type="text"
                              className="form-control"
                              value={this.state.school}
                              onChange={this.onChangeSchool}
                              />
                  </div>
                  <div className = "form-group">
                       <label> Due Date: </label>
                       <input type="text"
                              className="form-control"
                              placeholder="Please enter a date in the format YYYY-MM-DD"
                              value={this.state.dueDate}
                              onChange={this.onChangedueDate}
                              />
                   </div>
                   <div className="form-group">
                   <div className="form-check form-check-inline">
                           <input className="form-check-input"
                                  type="radio"
                                  name="applicationOptions"
                                  id="unsubmittedStatus"
                                  value="unsubmitted"
                                  checked={this.state.status==='unsubmitted'}
                                  onChange={this.onChangeStatus}
                                  />
                           <label className="form-check-label">Unsubmitted</label>
                     </div>
                     <div className="form-check form-check-inline">
                          <input className="form-check-input"
                                 type="radio"
                                 name="applicationOptions"
                                 id="submittedStatus"
                                 value="submitted"
                                 checked={this.state.status==='submitted'}
                                 onChange={this.onChangeStatus}
                                 />
                          <label className="form-check-label">Submitted</label>
                      </div>
                      <div className="form-check form-check-inline">
                              <input className="form-check-input"
                                     type="radio"
                                     name="applicationOptions"
                                     id="acceptedStatus"
                                     value="accepted"
                                     checked={this.state.status==='accepted'}
                                     onChange={this.onChangeStatus}
                                     />
                              <label className="form-check-label">Accepted</label>
                        </div>
                        <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                       type="radio"
                                       name="applicationOptions"
                                       id="declinedStatus"
                                       value="declined"
                                       checked={this.state.status==='declined'}
                                       onChange={this.onChangeStatus}
                                       />
                                <label className="form-check-label">Declined</label>
                         </div>
                         <br/>
                         <div className="form-group">
                            <input type="submit" value="Update Application" className="btn btn-primary" />
                        </div>
                    </div>
              </form>
          </div>
      )
  }
}
