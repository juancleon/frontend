import React, {Component } from 'react';
import axios from 'axios';

export default class SchoolRecommender extends Component {
  constructor(props){
      super(props);

      this.onChangeZipCode = this.onChangeZipCode.bind(this);
      this.onChangeCostOfLiving = this.onChangeCostOfLiving.bind(this);
      this.onChangeProgramOfInterest = this.onChangeProgramOfInterest.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          zipCode: '',
          costOfLiving: '',
          programOfInterest: ''
      }
  }

  onChangeZipCode(e){
      this.setState({
          zipCode: e.target.value
      });
  }

  onChangeCostOfLiving(e){
      this.setState({
          costOfLiving: e.target.value
      });
  }

  onChangeProgramOfInterest(e){
      this.setState({
          programOfInterest: e.target.value
      });
  }

  onSubmit(e){
      e.preventDefault();

      console.log(`Search criteria submitted:`);
      console.log(`Zip Code: ${this.state.zipCode}`);
      console.log(`Cost of Living: ${this.state.costOfLiving}`);
      console.log(`Program of Interest: ${this.state.programOfInterest}`);

      const searchCriteria = {
          zipCode: this.state.zipCode,
          costOfLiving: this.state.costOfLiving,
          programOfInterest: this.state.programOfInterest
      }

      axios.get('http://localhost:4000/project/SchoolRecommender', searchCriteria)
          .then(res => console.log(res.data));

      this.setState({
        zipCode: '',
        costOfLiving: '',
        programOfInterest: ''
      })
      this.props.history.push('/searchResults');
  }

  render() {
      return (
        <div style = {{marginTop: 20}}>
            <h3>Where Would You Like to go to School?</h3>
            <form onSubmit={this.onSubmit}>
               <div className = "form-group">
                    <label> Zip Code: </label>
                    <input type="number"
                           className="form-control"
                           value={this.state.zipCode}
                           onChange={this.onChangeZipCode}
                           />
               </div>
               <h3>What Cost of Living Level Would You Prefer?</h3>
                  <div className = "form-group">
                       <label> U.S. Average is 100 </label>
                       <input type="number"
                              className="form-control"
                              value={this.state.costOfLiving}
                              onChange={this.onChangeCostOfLiving}
                              />
                  </div>
                  <h3>What Academic Program(s) are You Interested In?</h3>
                     <div className = "form-group">
                          <label> Program(s) of Interest: </label>
                          <input type="text"
                                 className="form-control"
                                 value={this.state.programOfInterest}
                                 onChange={this.onChangeProgramOfInterest }
                                 />
                     </div>
                  <div className="form-group">
                      <input type="submit" value="Enter Search Criteria" className="btn btn-primary" />
                  </div>
              </form>
        </div>
          {/*User enters:
                        + Zip Code
                        + Cost of Living Index (desired)
                        + Program of Interest
            System returns:
                        + Name of School
                        + School URL
                        + Zip Code
                        + Cost of Living Index (actual)
                        + Program(s) of Interest
          */}
      )
  }
}
