import gql from "graphql-tag";

export default gql`
  mutation DeleteCity($id: ID!) {
    deletedCity: deleteCity(id: $id) {
      id
    }
  }
`;
