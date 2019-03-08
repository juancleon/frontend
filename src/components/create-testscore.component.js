import React, {Component } from 'react';

export default class CreateTestScore extends Component {

  constructor(props){
      super(props);

      this.onChangeTestType = this.onChangeTestType.bind(this);//left off here
      this.onChangeScore = this.onChangeScore.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          testType: '',
          score: ''
      }
  }

  onChangeTestType(e){
      this.setState({
          testType: e.target.value
      });
  }

  onChangeScore(e){
      this.setState({
          score: e.target.value
      });
  }

  onSubmit(e){
      e.preventDefault();

      console.log(`Form submitted:`);
      console.log(`Test Type: ${this.state.testType}`);
      console.log(`Score: ${this.state.score}`);

      this.setState({
        testType: '',
        score: ''
      })
  }

  render() {
      return (
          <div style = {{marginTop: 20}}>
              <h3>Create Test Type</h3>
              <form onSubmit={this.onSubmit}>
                 <div className = "form-group">
                      <label> Test: </label>
                      <input type="text"
                             className="form-control"
                             value={this.state.testType}
                             onChange={this.onChangeTestType}
                             />
                 </div>
                 </form>
                 <h3>Create Test Score</h3>
                 <form onSubmit={this.onSubmit}>
                    <div className = "form-group">
                         <label> Score: </label>
                         <input type="text"
                                className="form-control"
                                value={this.state.score}
                                onChange={this.onChangeScore}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Test Score" className="btn btn-primary" />
                    </div>
                 </form>
          </div>
      )
  }
}
