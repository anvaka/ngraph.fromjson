module.exports = load;

var createGraph = require('ngraph.graph');

function load(jsonGraph) {
  if (typeof jsonGraph !== 'string') {
    throw new Error('Cannot load graph which is not stored as a string');
  }

  var stored = JSON.parse(jsonGraph),
      graph = createGraph(),
      i;

  if (stored.links === undefined || stored.nodes === undefined) {
    throw new Error('Cannot load graph without links and nodes');
  }

  for (i = 0; i < stored.nodes.length; ++i) {
    var parsedNode = stored.nodes[i];
    if (!parsedNode.hasOwnProperty('id')) {
      throw new Error('Graph node format is invalid: Node id is missing');
    }

    graph.addNode(parsedNode.id, parsedNode.data);
  }

  for (i = 0; i < stored.links.length; ++i) {
    var link = stored.links[i];
    if (!link.hasOwnProperty('fromId') || !link.hasOwnProperty('toId')) {
      throw 'Graph link format is invalid. Both fromId and toId are required';
    }

    graph.addLink(link.fromId, link.toId, link.data);
  }

  return graph;
}
