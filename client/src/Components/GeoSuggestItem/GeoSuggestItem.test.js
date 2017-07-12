import React from "react";
import { shallow } from "enzyme";
import GeoSuggestItem from "./GeoSuggestItem";

const props = {
  label: "paris"
};

describe("GeoSuggestItem", () => {
  it("has elements", () => {
    const wrapper = shallow(<GeoSuggestItem {...props} />);

    expect(wrapper.find(".geosuggest__suggested-item")).toHaveLength(1);
    expect(wrapper.find("withStyles(IconButton)")).toHaveLength(1);
    expect(wrapper.find("pure(AddLocation)")).toHaveLength(1);
    expect(wrapper.text()).toContain("paris");
  });
});
