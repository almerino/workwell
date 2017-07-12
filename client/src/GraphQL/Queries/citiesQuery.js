import gql from "graphql-tag";

export default gql`
  query CitiesQuery {
    cities: allCities {
      id
      placeId
      description
      lat
      lng
    }
  }
`;
