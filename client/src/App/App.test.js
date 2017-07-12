import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  it("renders App", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".app")).toHaveLength(1);
    expect(wrapper.find(".content")).toHaveLength(1);
    expect(wrapper.find(".map")).toHaveLength(1);
    expect(wrapper.find("Apollo(MyMap)")).toHaveLength(1);
  });
});
