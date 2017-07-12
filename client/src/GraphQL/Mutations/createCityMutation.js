import gql from "graphql-tag";

export default gql`
  mutation createCity(
    $placeId: String!
    $description: String!
    $lat: Float!
    $lng: Float!
  ) {
    city: createCity(
      placeId: $placeId
      description: $description
      lat: $lat
      lng: $lng
    ) {
      id
      placeId
      description
      lat
      lng
    }
  }
`;
