const city = {
  id: "2",
  placeId: "2",
  description: "Paris, France",
  lat: 0,
  lng: 0
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    // const userID = parseInt(url.substr("/users/".length), 10);
    process.nextTick(
      () =>
        // users[userID]
        resolve(city)
      // : reject({
      //     error: "User with " + userID + " not found."
      //   })
    );
  });
}
