import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Application = props => (
    <tr>
        <td>{props.application.school} </td>
        <td>{props.application.status} </td>
        <td>
            <Link to={"/editApplication/"+props.application._id}>Edit</Link>
        </td>
    </tr>
)
export default class Applications extends Component {

    constructor(props) {
        super (props);
        this.state = {applications: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/project/applications')
            .then(response => {
                this.setState({applications: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    applicationList() {
        return this.state.applications.map(function(currentApplication, i) {
            return <Application application={currentApplication} key ={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3> Applications List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.applicationList() }
                    </tbody>
                </table>
            </div>
        )
  }
}
