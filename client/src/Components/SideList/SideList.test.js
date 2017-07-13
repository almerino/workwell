import React from "react";
import { shallow } from "enzyme";
import { MockedProvider } from "react-apollo/lib/test-utils";
import SideList, { SimpleSideList } from "./SideList";
import citiesQuery from "../../GraphQL/Queries/citiesQuery";

const props = {
  data: {
    loading: false,
    cities: [
      {
        id: "1",
        placeId: "1",
        description: "Paris, France",
        lat: 48.864716,
        lng: 2.349014
      }
    ]
  }
};

describe("SideList", () => {
  it("renders SideList with data", () => {
    const wrapper = shallow(
      <MockedProvider
        mocks={[
          {
            request: { query: citiesQuery },
            result: { data: { ...props.data } }
          }
        ]}
      >
        <SideList {...props} />
      </MockedProvider>
    );

    const sideList = wrapper.find(SideList);
    expect(sideList).toHaveLength(1);
    expect(sideList.prop("data")).toEqual(props.data);
  });

  it("has elements", () => {
    const wrapper = shallow(<SimpleSideList {...props} />);

    expect(wrapper.find("withStyles(AppBar)").prop("children")).toBe(
      "My cities"
    );
    expect(wrapper.find("withStyles(List)")).toHaveLength(1);
    expect(wrapper.find("withStyles(ListItem)")).toHaveLength(1);
    expect(wrapper.find("withStyles(ListItemText)").prop("primary")).toBe(
      "Paris, France"
    );
    expect(wrapper.find("withStyles(ListItemIcon)")).toHaveLength(1);
    expect(wrapper.find("withStyles(IconButton)")).toHaveLength(1);
    expect(wrapper.find("pure(Delete)")).toHaveLength(1);
  });

  it("delete city", async () => {
    const deleteCity = jest.fn().mockReturnValue(Promise.resolve(true));

    const wrapper = shallow(
      <SimpleSideList {...props} deleteCity={deleteCity} />
    );
    const instance = wrapper.renderer._instance._instance;

    await instance.delete({
      id: "1"
    });
  });
});
