# NeverEatAlone Challenge
[NeverEatAlone App](https://nevereataloneapp.herokuapp.com/)

![](http://i.imgur.com/QyyQaRm.gif)

### Install
```
cd client
npm install
npm start
```

### How to test
```
cd client
npm run test
```
(There is an issue with yarn and some dependencies packages, tests can't be run with yarn unfortunatly, the issue should resolved with React 16)

----

### Solution
* NeverEatAlone app use [create-react-app](https://github.com/facebookincubator/create-react-app) as base as it is being updated by the community and helping to have the project up to date. It also simplify the management of webpack and help to focus only on our present task.

* The application also make use of [GraphQL](http://graphql.org/) to query data.
The client used along with GrapqQL is [Apollo](https://github.com/apollographql/apollo-client), it is a client closer from Redux and simpler to manage. The other alternative to consider is [Relay](https://github.com/facebook/relay).

* To manage the routing, [react-router v4](https://reacttraining.com/react-router/) would be the solution to go as the community around it makes it move in the right direction and is really present.

* For the tests we use [Jest](https://facebook.github.io/jest/)/[enzyme](https://github.com/airbnb/enzyme) to test our components

* For the interface [material-ui](https://material-ui-1dab0.firebaseapp.com/) v1 is the chosen solution as it works well with react and offers a good range of components based on material design. Also the v1 now support the accessibility which makes it a good plus over other libraries, as accessitilty become more and more present on the web.
[w3c](https://www.w3.org/WAI/intro/accessibility.php)
[google](https://www.google.fr/accessibility/)
[facebook](https://www.facebook.com/help/accessibility)
...

----

* The map itself is done using [leaflet.js](http://leafletjs.com/) along [d3.js](https://d3js.org/) for the layer displaying our custom markers.

* A good alternative might be [mapbox-gl-js](https://www.mapbox.com/mapbox-gl-js/api/), we can find a small comparison  between the 2 [here](https://bl.ocks.org/almccon/ad6c2a4bac17e7b2ae49decf4a91fff7 ).

* Also leaflet and mapbox seem to have already layers integrated that might be a good idea using it depending on the project need.

----
### Architecture
#### Client
* We have the main application with the providers, client at the top level of src/
The main App is inside the App folder with the principals components needed to run the app.
The others components are inside the components folders and can be resused.
Components are for the most part independant and can be loaded separatly.

* Shapes defining the proptypes are in a separate folder.

* All Queries for GraphQL are inside the GraphQL folder splitted between mutations and queries.

----

#### Server
The main purpose of the server is to allow us to serve our assets and reload any pages.

----

#### API
As for the API we are using a backend as a service(MBaaS) [graph.cool](https://www.graph.cool/) to serve our data. The goal was to gain speed and avoid to develop a backend and still have data served as a graph.

----

### Difficulties
* As part of the difficulties we could say that learning leaflet.js and d3.js were not a small task, mastering it may require some time, but the solutions are solid enough to go deeper with it and try to do more complicated stuff.

* Also the small thing to be noted on that is the react-leaflet and react-d3 are no longer supported and the projects are a bit left out. So there might be something good in creating new react components for leaflet v1.1.0 plugged with leaflet API.
This is the reason I chose to use the libraries itself directly and not react-leaflet.

* Also testing graphql queries/components are soemthing fairly new for me and there might be better solution to investigate and improve the tests.

