import React, {Component } from 'react';
import axios from 'axios';

export default class DeleteApplication extends Component {
  constructor(props) {
      super(props);

      this.delete = this.delete.bind(this);

      this.state = {
          school: '',
          status: '',
          dueDate: Date,
          displayDate: '',
          currentDate: Date
      }
  }

  componentDidMount(){
      axios.get('http://localhost:4000/applications/'+this.props.match.params.id)
          .then(response => {
            if (response.data.dueDate == null)
            {
              this.setState({
                  school: response.data.school,
                  status: response.data.status,
                  dueDate: Date,
                  displayDate: '',
                  currentDate: Date,
              })
            }
            else {
              this.setState({
                  school: response.data.school,
                  status: response.data.status,
                  dueDate: response.data.dueDate.substring(0, 10),
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
                        <th>Due Date</th>
                    </tr>
                </thead>
                  <tbody>
                    <tr>
                      <td>{this.state.school} </td>
                      <td>{this.state.status} </td>
                      <td>{this.state.displayDate} </td>
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
