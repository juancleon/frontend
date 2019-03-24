import React, {Component } from 'react';
import axios from 'axios';

export default class EditApplication extends Component {
  constructor(props) {
      super(props);

      this.onChangeSchool = this.onChangeSchool.bind(this);
      this.onChangeStatus = this.onChangeStatus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          school: '',
          status: ''
      }
  }

  componentDidMount(){
      axios.get('http://localhost:4000/applications/'+this.props.match.params.id)
          .then(response => {
              this.setState({
                  school: response.data.school,
                  status: response.data.status
              })
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

  onSubmit(e) {
      e.preventDefault();
      const obj = {
          school: this.state.school,
          status: this.state.status
      };
      axios.post('http://localhost:4000/applications/update/' + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
      this.props.history.push('/applications');
  }

  render() {
      return (
          <div>
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
                  <div className="form-group">
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
