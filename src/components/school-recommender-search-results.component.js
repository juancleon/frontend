import React, {Component } from 'react';

export default class SchoolRecommenderSearchResults extends Component {
  render() {
      return (
          <div>
              <p>Welcome to the School Recommender Search Results Component!</p>
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
          </div>
      )
  }
}
