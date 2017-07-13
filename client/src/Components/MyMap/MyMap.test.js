import React from "react";
import { shallow } from "enzyme";
import { SimpleMap } from "./MyMap";

const props = {
  data: {
    loading: false,
    cities: []
  }
};

describe("SimpleMap", () => {
  it("has elements", () => {
    const wrapper = shallow(<SimpleMap {...props} />);

    expect(wrapper.find("#map")).toHaveLength(1);
  });
});
