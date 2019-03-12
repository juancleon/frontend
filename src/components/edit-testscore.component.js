import React, {Component } from 'react';

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
      axios.get('http://localhost:4000/project/testScores/'+this.props.match.params.id)
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
      axios.post('http://localhost:4000/project/testScores/update/' + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
      this.props.history.push('/testScores');
  }


  render() {
      return (
          <div>
              <p>Welcome to the  Edit Test Score Component!</p>
          </div>
      )
  }
}
