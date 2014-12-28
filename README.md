# ngraph.fromjson

Library to load graph from simple json format

# usage

``` javascript
// JSON string can be produced by `ngraph.tojson` library
// https://github.com/anvaka/ngraph.tojson
var jsonString = ' {"nodes":[{"id":"hello"},{"id":"world"}],"links":[{"fromId":"hello","toId":"world"}]}'

var fromJSON = require('ngraph.fromjson');
var graph = fromJSON(jsonString)

graph.getNode('hello'); // returns a node;
graph.getLinksCount(); // 1
```

# install

With [npm](https://npmjs.org) do:

```
npm install ngraph.fromjson
```

# license

MIT
