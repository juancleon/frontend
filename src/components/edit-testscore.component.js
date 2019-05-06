import React, {Component } from 'react';
import axios from 'axios';
export default class EditTestScore extends Component {

  constructor(props){
      super(props);

      this.onChangeTestType = this.onChangeTestType.bind(this);
      this.onChangeMathScore = this.onChangeMathScore.bind(this);
      this.onChangeVerbalScore = this.onChangeVerbalScore.bind(this);
      this.onChangeDateTaken = this.onChangeDateTaken.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          testType: '',
          mathScore: '',
          verbalScore: '',
          dateTaken: Date,
          displayDate: '',
          currentDate: Date,
          timeSinceTaken: ''
      }
  }

  componentDidMount(){
      axios.get('http://localhost:4000/testScores/'+this.props.match.params.id)
          .then(response => {
            if (response.data.dateTaken == null)
            {
              this.setState({
                  testType: response.data.testType,
                  mathScore: response.data.mathScore,
                  verbalScore: response.data.verbalScore,
                  dateTaken: Date,
                  displayDate: '',
                  currentDate: Date.now(),
                  timeSinceTaken: ''
              })
            }
            else {
              this.setState({
                  testType: response.data.testType,
                  mathScore: response.data.mathScore,
                  verbalScore: response.data.verbalScore,
                  dateTaken: response.data.dateTaken.substring(0, 10),
                  displayDate: response.data.displayDate,
                  currentDate: Date.now(),
                  timeSinceTaken: ''
              })
            }

          })
          .catch(function(error){
              console.log(error)
          })
  }

  onChangeTestType(e) {
    this.setState({
        testType: e.target.value
    });
  }

  onChangeMathScore(e) {
    this.setState({
        mathScore: e.target.value
    });
  }

  onChangeVerbalScore(e) {
    this.setState({
        verbalScore: e.target.value
    });
  }

  onChangeDateTaken(e){
      this.setState({
          dateTaken: e.target.value
      });
  }

  onSubmit(e) {
      e.preventDefault();

      if (((this.state.mathScore <= 0) || (1600 <= this.state.mathScore)))
      {
        alert('The math score entered is outside of the valid range. Please re-enter the score.');
        this.setState({
          mathScore: ''
        })
      }
      else if (((this.state.verbalScore <= 0) || (1600 <= this.state.verbalScore)))
      {
        alert('The verbal score entered is outside of the valid range. Please re-enter the score.');
        this.setState({
          verbalScore: ''
        })
      }
      else if (Object.keys(this.state.dateTaken).length == 0)
      {
            const obj = {
                testType: this.state.testType,
                mathScore: this.state.mathScore,
                verbalScore: this.state.verbalScore,
                dateTaken: this.state.dateTaken,
                displayDate: '',
                currentDate: Date.now(),
                timeSinceTaken: ''
          }

          axios.post('http://localhost:4000/testScores/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
      }
      else {
            const obj = {
              testType: this.state.testType,
              mathScore: this.state.mathScore,
              verbalScore: this.state.verbalScore,
              dateTaken: this.state.dateTaken,
              displayDate: this.state.dateTaken.substring(0, 10),
              currentDate: Date.now(),
              timeSinceTaken: ''
            }

        axios.post('http://localhost:4000/testScores/update/' + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
      }
      alert('Test score updated successfully.');

      this.setState({
        testType: '',
        mathScore: '',
        verbalScore: '',
        dateTaken: Date,
        displayDate: '',
        currentDate: Date.now(),
        timeSinceTaken: ''
      })
      this.props.history.push('/testScores');
  }


  render() {
      return (
        <div style = {{marginTop: 20}}>
            <h3>Update Test Score</h3>
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
                       <input type="text"
                              className="form-control"
                              value={this.state.mathScore}
                              onChange={this.onChangeMathScore}
                              />
                  </div>
                  <div className = "form-group">
                          <label> Verbal Score: </label>
                          <input type="text"
                                 className="form-control"
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
                                 onChange={this.onChangeDateTaken}
                                 />
                      </div>
                  <div className="form-group">
                      <input type="submit" value="Update Test Score" className="btn btn-primary" />
                  </div>
              </form>
        </div>
      )
  }
}
