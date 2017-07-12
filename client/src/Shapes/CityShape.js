import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
});
