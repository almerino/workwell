import React from "react";
import { shallow } from "enzyme";
import { MockedProvider } from "react-apollo/lib/test-utils";
import Menu, { SimpleMenu } from "./Menu";
import GeoSuggestItem from "../GeoSuggestItem/GeoSuggestItem";
import SideList from "../SideList/SideList";
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

  it("has elements", () => {
    const wrapper = shallow(<SimpleMenu {...props} />);
    const instance = wrapper.renderer._instance._instance;

    expect(wrapper.find("withStyles(Paper)").prop("className")).toBe("menu");
    expect(wrapper.find("pure(Menu)")).toHaveLength(1);

    let IconButton = wrapper.find("withStyles(IconButton)");
    expect(IconButton.prop("onClick")).toBe(
      wrapper.renderer._instance._instance.handleOpen
    );
    instance.handleOpen();
    expect(instance.state.open).toBe(true);

    expect(wrapper.find(SideList)).toHaveLength(1);
    expect(wrapper.find("withStyles(Snackbar)")).toHaveLength(1);
  });

  it("has geosuggest rightly configured", () => {
    const wrapper = shallow(<SimpleMenu {...props} />);

    const geosuggest = wrapper.find("Geosuggest");
    expect(geosuggest).toHaveLength(1);
    expect(geosuggest.prop("types")).toEqual(["(cities)"]);
    expect(geosuggest.prop("renderSuggestItem")).toBe(GeoSuggestItem);
    expect(geosuggest.prop("onSuggestSelect")).toBe(
      wrapper.renderer._instance._instance.onSuggestSelect
    );
  });

  it("has a drawer rightly configured", () => {
    const wrapper = shallow(<SimpleMenu {...props} />);
    const instance = wrapper.renderer._instance._instance;

    const drawer = wrapper.find("withStyles(Drawer)");

    expect(drawer).toHaveLength(1);
    expect(drawer.prop("open")).toBe(false);
    instance.handleOpen();
    expect(wrapper.find("withStyles(Drawer)").prop("open")).toBe(true);
    instance.handleClose();
    expect(wrapper.find("withStyles(Drawer)").prop("open")).toBe(false);
  });

  it("onSuggestSelect tests when none exists", () => {
    const createCity = jest.fn().mockReturnValue(Promise.resolve(true));

    const wrapper = shallow(<SimpleMenu {...props} createCity={createCity} />);
    const instance = wrapper.renderer._instance._instance;
    instance._geoSuggest = {};
    instance._geoSuggest.clear = jest.fn();
    instance._geoSuggest.blur = jest.fn();

    expect(instance.state.message).toBe(undefined);
    expect(instance.state.snackbarOpen).toBe(false);

    instance.onSuggestSelect({});
    expect(instance.state.message).toBe("undefined doesn't exist.");
    expect(instance.state.snackbarOpen).toBe(true);

    instance.onSuggestSelect({ label: "Paris, France", placeId: "1" });
    expect(instance.state.message).toBe(
      "Paris, France is already in the list."
    );
  });

  it("onSuggestSelect tests when one exists", async () => {
    const createCity = jest.fn().mockReturnValue(Promise.resolve(true));

    const wrapper = shallow(<SimpleMenu {...props} createCity={createCity} />);
    const instance = wrapper.renderer._instance._instance;
    instance._geoSuggest = {};
    instance._geoSuggest.clear = jest.fn();
    instance._geoSuggest.blur = jest.fn();

    await instance.onSuggestSelect({
      label: "Paris, France",
      placeId: "2",
      location: {
        lat: 0,
        lng: 0
      }
    });

    expect(instance.state.message).toBe(
      "Paris, France has been added to the list."
    );
  });

  it("onSuggestSelect tests when error", async () => {
    const createCity = jest
      .fn()
      .mockReturnValue(Promise.reject("rejecting promise"));

    const wrapper = shallow(<SimpleMenu {...props} createCity={createCity} />);
    const instance = wrapper.renderer._instance._instance;
    instance._geoSuggest = {};
    instance._geoSuggest.clear = jest.fn();
    instance._geoSuggest.blur = jest.fn();

    await instance.onSuggestSelect({
      label: "Paris, France",
      placeId: "2",
      location: {
        lat: 0,
        lng: 0
      }
    });

    expect(instance.state.message).toBe(undefined);
  });
});
