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

### CometD

[JavaScript Documentation](https://docs.cometd.org/current4/reference/#_javascript)

### Salesforce

[Subscribing to Platform Events via CometD](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_subscribe_cometd.htm)