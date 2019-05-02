import React, {Component } from 'react';
import axios from 'axios';

export default class DeleteSavedSearch extends Component {
  constructor(props) {
      super(props);

      this.delete = this.delete.bind(this);

      this.state = {
          zipCode: '',
          costOfLivingIndex: '',
          programOfInterest: ''
      }
  }

  componentDidMount(){
      axios.get('http://localhost:4000/savedSearches/'+this.props.match.params.id)
          .then(response => {
              this.setState({
                  zipCode: response.data.zipCode,
                  costOfLivingIndex: response.data.costOfLivingIndex,
                  programOfInterest: response.data.programOfInterest
              })
          })
          .catch(function(error){
              console.log(error)
          })
  }

  delete(e) {
      e.preventDefault();
      axios.delete('http://localhost:4000/savedSearches/delete/' + this.props.match.params.id)
          .then(res => console.log(res.data));
      this.props.history.push('/savedSearches');
  }

  render() {
      return (
          <div>
              <h3>Are you sure you want to delete this application?</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>Zip Code</th>
                        <th>Cost of Living Index</th>
                        <th>Program of Interest</th>
                    </tr>
                </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.zipCode} </td>
                      <td>{this.state.costOfLivingIndex} </td>
                      <td>{this.state.programOfInterest} </td>
                    </tr>
                  </tbody>
                </table>
                <form onSubmit={this.delete}>
                      <input type="submit" value="Delete Search" className="btn btn-primary" />
                </form>
          </div>
      )
  }
}
