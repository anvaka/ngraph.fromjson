var test = require('tap').test;
var createGraph = require('ngraph.graph');
var fromJSON = require('../');

var toJSON = require('ngraph.tojson');

test('it can restore from json object', function(t) {
  var graph = createGraph();
  graph.addLink(1, 2);
  var json = toJSON(graph);
  var restored = fromJSON(JSON.parse(json));

  t.equal(restored.getNodesCount(), 2);
  t.equal(restored.getLinksCount(), 1);

  t.end();
});

test('it throws when json object has no links or nodes', function(t) {
  let json = {};
  t.throws(function() {fromJSON(json);});
  t.end();
});

test('it throw when node has no id', function(t) {
  let json = {
    nodes: [{}],
    links: []
  };
  t.throws(function() {fromJSON(json);});
  t.end();
});

test('it throw when link has no fromId', function(t) {
  let json = {
    nodes: [{id: 1}],
    links: [{toId: 1}]
  };
  t.throws(function() {fromJSON(json);});
  t.end();
})


test('Can save and load graph', function(t) {
  var g = createGraph();
  g.addLink(1, 2);

  var loadedGraph = fromJSON(toJSON(g));

  t.ok(loadedGraph.getNode(1) && loadedGraph.getNode(2) && loadedGraph.getNodesCount() === 2, 'Should have all nodes');
  t.ok(loadedGraph.hasLink(1, 2) && loadedGraph.getLinksCount() === 1, 'Should have all links');

  t.end();
});

test('Can save and load graph with transform', function(t) {
  var g = createGraph();
  var nodeTransformCalledTimes = 0;
  var linkTransformCalledTimes = 0;

  g.addNode(1, 'Custom data');
  g.addLink(1, 2, 'Custom link data');

  var json = toJSON(g, nodeSaveTransform, linkSaveTransform);

  var loadedGraph = fromJSON(json, nodeLoadTransform, linkLoadTransform);

  t.ok(loadedGraph.getNode(1) && loadedGraph.getNode(2) && loadedGraph.getNodesCount() === 2, 'Should have all nodes');
  t.equal(loadedGraph.getNode(1).data, 'Custom data', 'Node data is loaded');
  t.ok(loadedGraph.hasLink(1, 2) && loadedGraph.getLinksCount() === 1, 'Should have all links');
  t.equal(loadedGraph.hasLink(1, 2).data, 'Custom link data', 'link data is loaded');
  t.ok(nodeTransformCalledTimes && linkTransformCalledTimes, 'Transform is called');
  t.end();

  function nodeLoadTransform(node) {
    nodeTransformCalledTimes += 1;

    return {
      id: node[0],
      data: node[1]
    };
  }

  function linkLoadTransform(link) {
    linkTransformCalledTimes += 1;

    return {
      fromId: link[0],
      toId: link[1],
      data: link[2]
    };
  }

  function nodeSaveTransform(node) {
    return [node.id, node.data];
  }

  function linkSaveTransform(link) {
    return [link.fromId, link.toId, link.data];
  }
});

test('Can save and load graph with multigraph option', function(t) {
  var g = createGraph({ multigraph: true });
  g.addLink(1, 2);
  g.addLink(1, 2);

  var loadedGraph = fromJSON(toJSON(g), null, null, { multigraph: true });

  t.ok(loadedGraph.getNode(1) && loadedGraph.getNode(2) && loadedGraph.getNodesCount() === 2, 'Should have all nodes');
  t.ok(loadedGraph.hasLink(1, 2) && loadedGraph.getLinksCount() === 2, 'Should have all links');

  t.end();
});