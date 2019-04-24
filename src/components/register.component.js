import React, {Component } from 'react';
import axios from 'axios';

export default class Register extends Component {

  constructor(props){
      super(props);

      this.onChangeUserName = this.onChangeUserName.bind(this);
      this.onChangePassword1 = this.onChangePassword1.bind(this);
      this.onChangePassword2 = this.onChangePassword2.bind(this);
      this.onChangeEMail = this.onChangeEMail.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          userName: '',
          password1: '',
          password2: '',
          eMail: '',
          isUserNameTaken: false
      }
  }

  onChangeUserName(e){
      this.setState({
          userName: e.target.value
      });
  }

  onChangePassWord1(e){
      this.setState({
          password1: e.target.value
      });
  }

  onChangePassWord2(e){
      this.setState({
          password2: e.target.value
      });
  }

  onChangeEMail(e){
      this.setState({
          eMail: e.target.value
      });
  }

  onSubmit(e){
      e.preventDefault();

      console.log(`Form submitted:`);
      console.log(`UserName: ${this.state.userName}`);
      console.log(`Password1: ${this.state.password1}`);
      console.log(`eMail: ${this.state.eMail}`);

      axios.get('http://localhost:4000/lookForUser/' + this.state.userName)
          .then(response => {
              this.setState({
                  isUserNameTaken: response.data,
              })
          })
          .catch(function(error){
              console.log(error)
          })

      if (this.state.isUserNameTaken){
          alert('The User Name entered is not available. Please select another User Name. ');
          }
      else if (this.state.eMail.isEmpty()){

      }

      else{
          const newUser = {
              userName: this.state.userName,
              password1: this.state.password1,
              eMail: this.state.eMail
          }

          axios.post('http://localhost:4000/user/register', newUser)
                  .then(res => console.log(res.data));
      }
      this.setState({
        userName: '',
        password1: '',
        password2: '',
        eMail: '',
        isUserNameTaken: false
      })
  }

  render() {
      return (
          <div style = {{marginTop: 20}}>
              <h3>Register</h3>
              <form onSubmit={this.onSubmit}>
                 <div className = "form-group">
                      <label>User Name:</label>
                      <input type="text"
                             className="form-control"
                             placeholder="Please enter a user name"
                             value={this.state.userName}
                             onChange={this.onChangeUserName}
                             />
                  </div>
                  <div className = "form-group">
                       <label>Password:</label>
                       <input type="text"
                              className="form-control"
                              placeholder="Please enter a password"
                              value={this.state.password1}
                              onChange={this.onChangePassWord1}
                              />
                   </div>
                   <div className = "form-group">
                        <label>Password:</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Please re-enter the same password"
                               value={this.state.password2}
                               onChange={this.onChangePassWord2}
                               />
                    </div>
                    <div className = "form-group">
                         <label>E-mail:</label>
                         <input type="text"
                                className="form-control"
                                placeholder="Please enter your email address"
                                value={this.state.eMail}
                                onChange={this.onChangeEMail}
                                />
                     </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                  </form>
          </div>
      )
  }
}
