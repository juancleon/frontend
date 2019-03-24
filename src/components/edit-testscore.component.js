import React, {Component } from 'react';
import axios from 'axios';
export default class EditTestScore extends Component {

  constructor(props){
      super(props);

      this.onChangeTestType = this.onChangeTestType.bind(this);//left off here
      this.onChangeMathScore = this.onChangeMathScore.bind(this);
      this.onChangeVerbalScore = this.onChangeVerbalScore.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          testType: '',
          mathScore: '',
          verbalScore: ''
      }
  }

  componentDidMount(){
      axios.get('http://localhost:4000/testScores/'+this.props.match.params.id)
          .then(response => {
              this.setState({
                  testType: response.data.testType,
                  mathScore: response.data.mathScore,
                  verbalScore: response.data.verbalScore,
              })
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

  onSubmit(e) {
      e.preventDefault();
      const obj = {
          testType: this.state.testType,
          mathScore: this.state.mathScore,
          verbalScore: this.state.verbalScore
      };
      axios.post('http://localhost:4000/testScores/update/' + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
      this.props.history.push('/testScores');
  }


  render() {
      return (
        <div style = {{marginTop: 20}}>
            <h3>Update Test Type</h3>
            <form onSubmit={this.onSubmit}>
               <div className = "form-group">
                    <label> Test: </label>
                    <input type="text"
                           className="form-control"
                           value={this.state.testType}
                           onChange={this.onChangeTestType}
                           />
               </div>
               <h3>Update Math Test Score</h3>
                  <div className = "form-group">
                       <label> Math Score: </label>
                       <input type="text"
                              className="form-control"
                              value={this.state.mathScore}
                              onChange={this.onChangeMathScore}
                              />
                  </div>
                  <h3>Update Verbal Test Score</h3>
                     <div className = "form-group">
                          <label> Verbal Score: </label>
                          <input type="text"
                                 className="form-control"
                                 value={this.state.verbalScore}
                                 onChange={this.onChangeVerbalScore }
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
