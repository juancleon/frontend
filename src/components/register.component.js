import React, {Component } from 'react';
import axios from 'axios';

export default class Register extends Component {

  constructor(props){
      super(props);

      this.onChangeUserName = this.onChangeUserName.bind(this);
      this.onChangeFirstPassword = this.onChangeFirstPassword.bind(this);
      this.onChangeSecondPassword = this.onChangeSecondPassword.bind(this);
      this.onChangeEMail = this.onChangeEMail.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          userName: '',
          firstPassword: '',
          secondPassword: '',
          eMail: ''
      }
  }

  onChangeUserName(e){
      this.setState({
          userName: e.target.value
      });
  }

  onChangeFirstPassword(e){
      this.setState({
          firstPassword: e.target.value
      });
  }

  onChangeSecondPassword(e){
      this.setState({
          secondPassword: e.target.value
      });
  }

  onChangeEMail(e){
      this.setState({
          eMail: e.target.value
      });
  }

  onSubmit(e){
      e.preventDefault();

      if (this.state.userName === ""){//check if User Name field is empty
          alert('The User Name field is required.');
      }

      else if (this.state.firstPassword === ""){//check if Password field is empty
          alert('The Password field is required.');
      }

      else if (this.state.secondPassword === ""){//check if Confirm Password field is empty
          alert('The Confirm Password field is required.');
      }

      else if (this.state.eMail === ""){//check if E-mail field is empty
          alert('The E-mail field is required.');
      }

      else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.eMail))){//check if E-mail format is valid
          alert('Email is invalid.');
          this.setState({
            eMail: ''
          });
      }

      else if (!((6 <= (this.state.firstPassword).length) && ((this.state.firstPassword).length) <= 30)){
          alert('The Password entered is the wrong length.');
          this.setState({
            firstPassword: '',
            secondPassword: ''
          });
      }

      else if (this.state.firstPassword !== this.state.secondPassword){
          alert('The Passwords entered do not match.');
          this.setState({
            firstPassword: '',
            secondPassword: ''
          });
      }

      else{

          const newUser = {
              userName: this.state.userName,
              password: this.state.firstPassword,
              eMail: this.state.eMail
          }

          axios.post('http://localhost:4000/register', newUser)
                  .then(res => {
                    console.log(res.data);
                    this.setState({
                          userName: '',
                          firstPassword: '',
                          secondPassword: '',
                          eMail: ''
                        });
                        alert('You have successfully registered.');
                        this.props.history.push('/login');
                    }).catch(error => {
                          this.setState({
                            userName: ''
                          });
                          alert('The User Name selected is not available. Please select another.');
                    });
          }
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
                       <label>Enter Password:</label>
                       <input type="text"//change to "password" to mask text
                              className="form-control"
                              placeholder="Please enter a password"
                              value={this.state.firstPassword}
                              onChange={this.onChangeFirstPassword}
                              />
                   </div>
                   <div className = "form-group">
                        <label>Confirm Password:</label>
                        <input type="text"//change to "password" to mask text
                               className="form-control"
                               placeholder="Please re-enter the same password"
                               value={this.state.secondPassword}
                               onChange={this.onChangeSecondPassword}
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
