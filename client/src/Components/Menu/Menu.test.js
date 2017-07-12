import React from "react";
import { shallow } from "enzyme";
import { MockedProvider } from "react-apollo/lib/test-utils";
import Menu, { SimpleMenu } from "./Menu";
import citiesQuery from "../../GraphQL/Queries/citiesQuery";

const props = {
  data: {
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

describe("Menu", () => {
  it("renders Menu with data", () => {
    const wrapper = shallow(
      <MockedProvider
        mocks={[
          {
            request: { query: citiesQuery },
            result: { data: { ...props.data } }
          }
        ]}
      >
        <Menu {...props} />
      </MockedProvider>
    );

    const menu = wrapper.find(Menu);
    expect(menu).toHaveLength(1);
    expect(menu.prop("data")).toEqual(props.data);
  });

  // it("renders SimpleComposers ", () => {
  //   const wrapper = shallow(<SimpleComposers {...props} />);
  //   const instance = wrapper.renderer._instance._instance;

  //   expect(wrapper.find("withStyles(Typography)")).toHaveLength(1);
  //   expect(wrapper.find("withStyles(Typography)").prop("children")).toBe(
  //     "Composers"
  //   );

  //   expect(wrapper.find("withStyles(Paper)")).toHaveLength(1);
  //   expect(wrapper.find("withStyles(List)")).toHaveLength(1);
  //   expect(wrapper.find("Link")).toHaveLength(1);
  //   expect(wrapper.find("Link").prop("to")).toBe("/article/composers/1");
  //   expect(wrapper.find("withStyles(ListItem)")).toHaveLength(1);
  //   expect(wrapper.find("withStyles(Avatar)").props()).toEqual({
  //     alt: "name",
  //     src: "image"
  //   });

  //   expect(wrapper.find("withStyles(ListItemText)")).toHaveLength(1);
  //   expect(wrapper.find("withStyles(ListItemText)").prop("primary")).toBe("name");
  // });
});
