import React, {Component } from 'react';
import axios from 'axios';

export default class DeleteTestScore extends Component {
  constructor(props) {
      super(props);

      this.delete = this.delete.bind(this);

      this.state = {
          testType: '',
          mathScore: '',
          verbalScore: '',
          dateTaken: Date,
          displayDate: '',
          currentDate: Date
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
                      currentDate: Date
                  })
            }
                else {
                  this.setState({
                    testType: response.data.testType,
                    mathScore: response.data.mathScore,
                    verbalScore: response.data.verbalScore,
                    dateTaken: response.data.dateTaken.substring(0, 10),
                    displayDate: response.data.displayDate,
                    currentDate: response.data.currentDate,
                  })
                }
          })
          .catch(function(error){
              console.log(error)
          })
  }

  delete(e) {
      e.preventDefault();
      axios.delete('http://localhost:4000/testScores/delete/' + this.props.match.params.id)
          .then(res => console.log(res.data));
      this.props.history.push('/testScores');
  }

  render() {
      return (
          <div>
              <h3>Are you sure you want to delete this test score?</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>Test Type</th>
                        <th>Math Score</th>
                        <th>Verbal Score</th>
                        <th>Date Taken</th>
                    </tr>
                </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.testType} </td>
                      <td>{this.state.mathScore} </td>
                      <td>{this.state.verbalScore} </td>
                      <td>{this.state.displayDate} </td>
                    </tr>
                  </tbody>
                </table>
                <form onSubmit={this.delete}>
                      <input type="submit" value="Delete Test Score" className="btn btn-primary" />
                </form>
          </div>
      )
  }
}
