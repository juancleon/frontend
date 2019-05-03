import React, {Component } from 'react';
import axios from 'axios';
import NavigationBar from "./navigationBar.component";

export default class CreateTestScore extends Component {

  constructor(props){
      super(props);

      this.onChangeTestType = this.onChangeTestType.bind(this);
      this.onChangeMathScore = this.onChangeMathScore.bind(this);
      this.onChangeVerbalScore = this.onChangeVerbalScore.bind(this);
      this.onChangedateTaken = this.onChangedateTaken.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          testType: '',
          mathScore: '',
          verbalScore: '',
          dateTaken: Date,
          displayDate: '',
          currentDate: Date
      }
  }

  onChangeTestType(e){
      this.setState({
          testType: e.target.value
      });
  }

  onChangeMathScore(e){
      this.setState({
          mathScore: e.target.value
      });
  }

  onChangeVerbalScore(e){
      this.setState({
          verbalScore: e.target.value
      });
  }

  onChangedateTaken(e){
      this.setState({
          dateTaken: e.target.value
      });
  }

  onSubmit(e){
      e.preventDefault();

      console.log(`Form submitted:`);
      console.log(`Test Type: ${this.state.testType}`);
      console.log(`Math Score: ${this.state.mathScore}`);
      console.log(`Date taken: ${this.state.dateTaken}`);

      if ((this.state.mathScore <= 0) || (1600 <= this.state.mathScore))
      {
        alert('The math score entered is outside of the valid range. Please re-enter the score.');
        this.setState({
          mathScore: ''
        })
      }
      else if ((this.state.verbalScore <= 0) || (1600 <= this.state.verbalScore))
      {
        alert('The verbal score entered is outside of the valid range. Please re-enter the score.');
        this.setState({
          verbalScore: ''
        })
      }
      else if (Object.keys(this.state.dateTaken).length == 0){

            const newTestScore = {
                testType: this.state.testType,
                mathScore: this.state.mathScore,
                verbalScore: this.state.verbalScore,
                dateTaken: this.state.dateTaken,
                displayDate: '',
                currentDate: Date.now()
            }

            axios.post('http://localhost:4000/testScores/add', newTestScore)
                .then(res => console.log(res.data));

            this.setState({
                  testType: '',
                  mathScore: '',
                  verbalScore: '',
                  dateTaken: Date,
                  displayDate: '',
                  currentDate: Date
                })

            alert('Test score submitted successfully.');
      }
      else{
          const newTestScore = {
              testType: this.state.testType,
              mathScore: this.state.mathScore,
              verbalScore: this.state.verbalScore,
              dateTaken: this.state.dateTaken,
              displayDate: this.state.dateTaken.substring(0, 10),
              currentDate: Date.now()
          }

          axios.post('http://localhost:4000/testScores/add', newTestScore)
              .then(res => console.log(res.data));

          this.setState({
                testType: '',
                mathScore: '',
                verbalScore: '',
                dateTaken: Date,
                displayDate: '',
                currentDate: Date
              })

            alert('Test score submitted successfully.');
      }
}

  render() {
      return (
        <div>
        {<NavigationBar/>}
            <div style = {{marginTop: 20}}>
                <h3>Create Test Score</h3>
                <form onSubmit={this.onSubmit}>
                   <div className = "form-group">
                        <label> Test: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.testType}
                               onChange={this.onChangeTestType}
                               />
                   </div>
                   <div className = "form-group">
                           <label> Math Score: </label>
                           <input type="number"
                                  className="form-control"
                                  placeholder="Please enter a number between 0 - 1600"
                                  value={this.state.mathScore}
                                  onChange={this.onChangeMathScore}
                                  />
                      </div>
                      <div className = "form-group">
                              <label> Verbal Score: </label>
                              <input type="number"
                                     className="form-control"
                                     placeholder="Please enter a number between 0 - 1600"
                                     value={this.state.verbalScore}
                                     onChange={this.onChangeVerbalScore }
                                     />
                         </div>
                         <div className = "form-group">
                              <label>Date Taken: </label>
                              <input type="text"
                                     className="form-control"
                                     placeholder="Please enter a date in the format YYYY-MM-DD"
                                     value={this.state.dateTaken}
                                     onChange={this.onChangedateTaken}
                                     />
                          </div>
                      <div className="form-group">
                          <input type="submit" value="Create Test Score" className="btn btn-primary" />
                      </div>
                  </form>
            </div>
          </div>
      )
  }
}
