import React, {Component } from 'react';

export default class CreateApplication extends Component {

  constructor(props){
      super(props);

      this.onChangeSchool = this.onChangeSchool.bind(this);
      this.onChangeStatus = this.onChangeStatus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          school: '',
          status: ''
      }
  }

  onChangeSchool(e){
      this.setState({
          school: e.target.value
      });
  }

  onChangeStatus(e){
      this.setState({
          status: e.target.value
      });
  }

  onSubmit(e){
      e.preventDefault();

      console.log(`Form submitted:`);
      console.log(`School: ${this.state.school}`);
      console.log(`Status: ${this.state.status}`);

      this.setState({
        school: '',
        status: '',
      })
  }

  render() {
      return (
          <div style = {{marginTop: 20}}>
              <h3>Create Application</h3>
              <form onSubmit={this.onSubmit}>
                 <div className = "form-group">
                      <label> School: </label>
                      <input type="text"
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
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Application" className="btn btn-primary" />
                    </div>
                  </form>
          </div>
      )
  }
}
