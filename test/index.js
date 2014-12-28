var test = require('tap').test,
    createGraph = require('ngraph.graph'),
    fromJSON = require('../');
    toJSON = require('ngraph.tojson');

test('Can save and load graph', function (t) {
  var g = createGraph();
  g.addLink(1, 2);

  var loadedGraph = fromJSON(toJSON(g));

  t.ok(loadedGraph.getNode(1) && loadedGraph.getNode(2) && loadedGraph.getNodesCount() === 2, 'Should have all nodes');
  t.ok(loadedGraph.hasLink(1, 2) && loadedGraph.getLinksCount() === 1, 'Should have all links');

  t.end();
});
