import React, {Component } from 'react';
import axios from 'axios';

export default class DeleteApplication extends Component {
  constructor(props) {
      super(props);

      this.delete = this.delete.bind(this);

      this.state = {
          school: '',
          status: ''
      }
  }

  componentDidMount(){
      axios.get('http://localhost:4000/applications/'+this.props.match.params.id)
          .then(response => {
              this.setState({
                  school: response.data.school,
                  status: response.data.status
              })
          })
          .catch(function(error){
              console.log(error)
          })
  }

  delete(e) {
      e.preventDefault();
      axios.delete('http://localhost:4000/applications/delete/' + this.props.match.params.id)
          .then(res => console.log(res.data));
      this.props.history.push('/applications');
  }

  render() {
      return (
          <div>
              <h3>Are you sure you want to delete this application?</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Status</th>
                    </tr>
                </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.school} </td>
                      <td>{this.state.status} </td>
                    </tr>
                  </tbody>
                </table>
                <form onSubmit={this.delete}>
                      <input type="submit" value="Delete Application" className="btn btn-primary" />
                </form>
          </div>
      )
  }
}
