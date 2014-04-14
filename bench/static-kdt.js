var createKDT = require("../kdtree")

module.exports = {
  name: "Static KDTree",
  url: "https://github.com/mikolalysenko/static-kdtree",
  dynamic: false,
  pureJS: true,
  preprocess: function(points, repeat) {
    var start = Date.now()
    for(var i=0; i<repeat; ++i) {
      var tree = createKDT(points)
      tree.dispose()
    }
    return Date.now() - start
  },
  range: function(points, queries, repeat) {
    var tree = createKDT(points)
    var count = 0
    var m = queries.length
    var start = Date.now()
    for(var i=0; i<repeat; ++i) {
      for(var j=0; j<m; ++j) {
        tree.range(queries[j][0], queries[j][1], function() {
          count += 1
        })
      }
    }
    var end = Date.now()
    tree.dispose()
    return [end-start, count]
  },
  rnn: function(points, queries, repeat) {
    var tree = createKDT(points)
    var count = 0
    var m = queries.length
    var start = Date.now()
    for(var i=0; i<repeat; ++i) {
      //To get a fair comparison to ubilabs, we build an array here
      var list = []
      for(var j=0; j<m; ++j) {
        tree.rnn(queries[j][0], queries[j][1], function(idx) {
          list.push(idx)
        })
      }
      count += list.length
    }
    var end = Date.now()
    tree.dispose()
    return [end-start, count]
  }
}