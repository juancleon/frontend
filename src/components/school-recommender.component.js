import React, {Component } from 'react';

export default class SchoolRecommender extends Component {
  render() {
      return (
          <div>
              <p>Welcome to the School Recommender Component!</p>
              {/*User enters:
                            + Zip Code
                            + Cost of Living Index (desired)
                            + Program of Interest
                System returns:
                            + Name of School
                            + School URL
              */}
          </div>
      )
  }
}
