import React from "react";
import PropTypes from "prop-types";
import IconButton from "material-ui/IconButton";
import AddLocationIcon from "material-ui-icons/AddLocation";

function GeoSuggestItem({ label }) {
  return (
    <span className="geosuggest__suggested-item">
      <span>
        <IconButton color="accent" aria-label="Menu">
          <AddLocationIcon />
        </IconButton>
      </span>
      <span>
        {label}
      </span>
    </span>
  );
}

GeoSuggestItem.propTypes = {
  label: PropTypes.string.isRequired
};

export default GeoSuggestItem;
