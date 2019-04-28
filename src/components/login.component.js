import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {

  constructor(props){
      super(props);

      this.onChangeUserName = this.onChangeUserName.bind(this);
      this.onChangeUserEnteredPassword = this.onChangeUserEnteredPassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          userName: '',
          userEnteredPassword: '',
          databasePassword: ''
      }
  }

  onChangeUserName(e){
      this.setState({
          userName: e.target.value
      });
  }

  onChangeUserEnteredPassword(e){
      this.setState({
          userEnteredPassword: e.target.value
      });
  }

  onSubmit(e){
      e.preventDefault();

      console.log(`Form submitted:`);
      console.log(`userName: ${this.state.userName}`);
      console.log(`userEnteredPassword: ${this.state.userEnteredPassword}`);

      if (this.state.userName === ""){//check if User Name field is empty
          alert('The User Name field is required.');
      }

      else if (this.state.userEnteredPassword === ""){//check if Password field is empty
          alert('The Password field is required.');
      }

      else{
          axios.get('http://localhost:4000/login/'+this.state.userName)
          .then(response => {
            console.log(response.data);
            this.setState({//found user
                  databasePassword: response.data.password
                });

                if(this.state.userEnteredPassword === this.state.databasePassword)
                {
                    this.props.history.push('/SchoolRecommender');
                }
                else {
                    alert('The password entered is incorrect.');
                    this.setState({
                      userEnteredPassword: ''
                    });
                }
            }).catch(error => {//didn't find user
                alert('The User Name entered was not found.');
                this.setState({
                  userName: ''
                });
            });
      }
}

  render() {
      return (
          <div style = {{marginTop: 20}}>
              <h3>User Name</h3>
              <h6>Don't have an account? <Link to={"/register"}>Register</Link></h6>
              <form onSubmit={this.onSubmit}>
                 <div className = "form-group">
                      <label> Enter user name: </label>
                      <input type="text"
                             className="form-control"
                             value={this.state.userName}
                             onChange={this.onChangeUserName}
                             />
                 </div>
                 <h3>Password</h3>
                    <div className = "form-group">
                         <label> Enter password: </label>
                         <input type="text"//change to "password" to mask text
                                className="form-control"
                                value={this.state.userEnteredPassword}
                                onChange={this.onChangeUserEnteredPassword}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
          </div>
      )
  }
}
