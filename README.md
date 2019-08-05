# sfdc-subscriber

A Node app that subscribes to Salesforce Platform Events via CometD.

## Usage

### Development

1. Start up the client.
    ```
    cd client
    npm start
    ```
2. Start up the server.
    ```
    cd server
    npm start
    ```
### Production

```
cd client
npm run build
```



## Tests

### Client

```
npm run test
```

### Server

Running tests with console output:

```
npm run test
```

Running tests without console output:

```
npm run test:silent
```

Running tests with coverage report:

```
npm run test:coverage
```

Running tests with coverage report and without console output:

```
npm run test:coverage-silent
```

## Resources

### React

[Composition vs. Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)

### Redux
[Proper Typing of react-redux Connected Components](https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d)

### CometD

[JavaScript Documentation](https://docs.cometd.org/current4/reference/#_javascript)

### Salesforce

[Subscribing to Platform Events via CometD](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_subscribe_cometd.htm)

### d3.js

#### Documentation

[Api Reference](https://github.com/d3/d3/blob/master/API.md)

[Selection.join](https://observablehq.com/@d3/selection-join)

#### Patterns and Conventions

[General Update Pattern](https://bl.ocks.org/mbostock/3808218)

[Margin Convention](https://bl.ocks.org/mbostock/3019563)

[Towards Reusable Chart](https://bost.ocks.org/mike/chart/)

#### Tutorials

[Dashing D3.js Tutorials](https://www.dashingd3js.com/table-of-contents)

[D3 in Depth](https://www.d3indepth.com/)

#### Libraries

[Cubism.js](http://square.github.io/cubism/)

#### Examples

[scaleTime Example](https://bl.ocks.org/d3indepth/8948c9936c71e63ef2647bc4cc2ebf78)

[D3 Timeseries with Brush](http://mlvl.github.io/timeseries/)

[Line Chart Example](https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89)

[D3 Based Real Time Chart](https://bl.ocks.org/boeric/3b57a788a4b96e1af211)

[Real Time Chart with Multiple Data Streams](https://bl.ocks.org/boeric/6a83de20f780b42fadb9)

[Real-time multi-series time series chart data](http://bl.ocks.org/simenbrekken/6634070)

[I Make Circles](https://bl.ocks.org/mbostock/ad550c9d6d156ac726b45f48fa6ff2c7)