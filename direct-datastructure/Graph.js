class Graph {
  constructor(){
    this.__nodes = {};
    this.__negetiveEdge = 0;
  }
  clearVertexs(){
    this.__nodes = {};
    this.__negetiveEdge = 0;
  }

  clearEdges(){
    i = 0;
    keys = Object.keys( this.__nodes );
    length = keys.length;
    while( i < length ){
      this.__nodes[keys[i]] = {};
      i += 1;
    }
  }

  addVertex( vertexName ){
    if( typeof vertexName === "string" ){
      if( vertexName in this.__nodes ){
        return null;
      }
      this.__nodes[vertexName] = {}
    } else if( Array.isArray( vertexName ) ){
      for( let name of vertexName ){
        if( typeof name === "string" ){
          this.__nodes[name] = {};
        }
      }
    }
    return vertexName;
  }

  removeVertex( vertexName ){
    if ( typeof vertexName === "string" ){
      if( !( vertexName in this.__nodes ) ){
        return null;
      }
      delete this.__nodes[vertexName]
    } else if( Array.isArray( vertexName ) ){
      for( let name of vertexName ){
        if( typeof name === "string"){
          delete this.__nodes[name];
        }
      }
    }
  }

  addArcFromTo( source , destiny , weight = 1 ){
    if( !( source in this.__nodes ) ){
      return source;
    }
    if( !( destiny in this.__nodes ) ){
      return destiny;
    }
    this.__nodes[source][destiny] = weight
    if( weight < 0 ){
      this.__negetiveEdge += 1;
    }
  }

  removeArcFromTo( source , destiny ){
    if( !( source in this.__nodes ) || !( destiny in this.__nodes ) ){
      return null;
    }
    if( this.__nodes[source][destiny] < 0 ){
      this.__negetiveEdge -= 1;
    }
    delete this.__nodes[source][destiny];
  }

  associate( source , destiny , weight = 1 ){
    if( !( source in this.__nodes ) || !( destiny in this.__nodes ) ){
      return null;
    }
    this.__nodes[source][destiny] = weight;
    this.__nodes[destiny][source] = weight;

    if( weight < 0 ){
      this.__negetiveEdge += 2
    }
  }

  unAssociate( source , destiny ){
    if( !( source in this.__nodes ) || !( destiny in this.__nodes ) ){
      return null;
    }
    if( this.__nodes[source][destiny] < 0 ){
      this.__negetiveEdge -= 2;
    }
    delete this.__nodes[source][destiny];
    delete this.__nodes[destiny][source];
  }

  getAllNodes(){
    return Object.keys( this.__nodes );
  }

  getNeighbors( vertex ){
    if( !( vertex in this.__nodes ) ){
      return [];
    }
    return Object.keys( this.__nodes[vertex] );
  }

  getWeight( source , destiny ){
    if( !( source in this.__nodes ) || !( destiny in this.__nodes ) ){
      return Infinity;
    }
    return this.__nodes[source][destiny];
  }

  findAPath( source , destiny ){
    if( !( source in this.__nodes ) || !( destiny in this.__nodes ) ){
      return null;
    }
    const parent = {
      [source]: null
    }
    const visited = [];
    const path = [];
    var end = false;
    const __findAPath = vertex => {
      visited.push( vertex );
      for( let node of this.getNeighbors( vertex ) ){
        if( visited.indexOf( node  ) !== -1 ){
          continue;
        }
        parent[node] = vertex;
        if( node === destiny ){
          while( node ){
            path.unshift( node );
            node = parent[node];
          }
          end = true;
          return;
        }
        __findAPath( node )
        if( end ){
          return;
        }
      }
    }
    __findAPath( source )
    return path;
  }

  shortestPath( source , destiny ){
    const toVisit = [];
    const visited = [source];
    const parent = {
      [source]: null
    }
    for( let name of this.getNeighbors( source ) ){
      toVisit.push( name );
      parent[name] = source;
    }
    while( toVisit.length ){
      let node = toVisit.shift();
      visited.push( node )
      if( node === destiny ){
        let path = [];
        while( node ){
          path.unshift( node );
          node = parent[node];
        }
        return path;
      }
      for( let name of this.getNeighbors( node ) ){
        if( visited.indexOf( name  ) === -1 && toVisit.indexOf( name  ) === -1 ){
          toVisit.push( name );
          parent[name] = node;
        }
      }
    }
    return null;
  }

  bfr( vertex , callback ){
    let end = false;
    function endRetrieve(){
      end = true;
    }
    const toVisit = [];
    const visited = [vertex];
    const res = [callback({
      name: vertex,
      path: [],
      end: endRetrieve
    })]
    const parent = {
      [vertex]: null
    }
    for( let name of this.getNeighbors( vertex ) ){
      toVisit.push( name );
      parent[name] = vertex;
    }
    while( toVisit ){
      let node = toVisit.shift();
      if( visited.indexOf( node ) !== -1 ){
        continue;
      }
      let tmp =  parent[node];
      let path = [];
      while( tmp ){
        path.unshift( tmp );
        tmp = parent[tmp];
      }
      res.push( callback({
        name: node,
        path: path,
        end: endRetrieve
      }))
      if( end ){
        return res;
      }
      visited.push( node )
      for( let name of this.getNeighbors( node ) ){
        if( visited.indexOf( node  ) === -1 && toVisit.indexOf( node  ) === -1 ){
          toVisit.push( name );
          parent[name] = node;
        }
      }
    }
    return res;
  }

   dfr( vertex , callback ){
    if( !( vertex in this.__nodes ) ){
      return null;
    }
    let end = false;
    const res = [];
    const parent = {
      [vertex]: null
    };
    let visited = [];
    function endRetrieve(){
      end = true
    }
    const __dfr = vertex => {
      visited.push( vertex )
      for( let node of this.getNeighbors( vertex ) ){
        if( visited.indexOf( visited ) !== -1 ){
          continue;
        }
        parent[node] = vertex;
        let tmp =  parent[node];
        let path = [];
        while( tmp ){
          path.unshift( tmp );
          tmp = parent[tmp];
        }
        res.push(callback({
          name: node,
          path: path,
          end: endRetrieve
        }))
        if( end ){
          return;
        }
        __dfr( node )
        if( end ){
          return;
        }
      }
    }
    __dfr( vertex )
    return res;
  }

   __dijkstra( source , destiny ){
    if( !( source in this.__nodes ) || !( destiny in this.__nodes ) ){
      return [null, Infinity];
    }

    function getLowestCost(){
      let res = "";
      let r = Infinity;
      for( let node of toVisit ){
        if( cost[node] < r ){
          res = node;
          r = cost[node];
        }
      }
      return res;
    }

    const cost = {};
    const parent = {};
    const visited = [];
    const toVisit = [source];
    for( let node of this.getAllNodes() ){
      cost[node] = Infinity;
      parent[node] = null;
    }
    cost[source] = 0;
    while( toVisit.length ){
      let nodeNow = getLowestCost();

      toVisit.splice( toVisit.indexOf( nodeNow ) );
      visited.push( nodeNow );
      for( let node of this.getNeighbors( nodeNow ) ){
        if( visited.indexOf( node ) !== -1 ){
          continue;
        }
        toVisit.push( node )
        let newCost = cost[nodeNow] + this.getWeight( nodeNow , node );
        if( newCost < cost[node] ){
          cost[node] = newCost;
          parent[node] = nodeNow;
        }
      }
    }
    let node = destiny;
    let path = [];
    while( node ){
      path.unshift( node );
      node = parent[node];
    }
    return [path , cost[destiny]];
  }

   __BellmanFord( source , destiny ){
    if( ! ( destiny in this.__nodes ) || !( source in this.__nodes ) ){
      return [null, Infinity];
    }
    const parent = {};
    const cost = {};
    for( let node of this.getAllNodes() ){
      cost[node] = Infinity;
      parent[node] = null;
    }
    cost[source] = 0;
    const length = this.getAllNodes().length;
    for( let i = 0 ; i < length ; i++ ){
      for( let node of this.getAllNodes() ){
        for( let neighbor of this.getNeighbors( node ) ){
          let newCost = cost[node] + this.getWeight( node , neighbor );
          if( cost[neighbor] > newCost ){
            cost[neighbor] = newCost;
            parent[neighbor] = node;
          }
        }
      }
    }
    for( let node of this.getAllNodes() ){
      for( let neighbor of this.getNeighbors( node ) ){
        let newCost = cost[neighbor] + this.getWeight( neighbor , node );
        if( cost[node] > newCost ){
          throw Error("A negetive cycle exists");
        }
      }
    }
    let path = [];
    node = destiny;
    while( node ){
      path.unshift( node );
      node = parent[node];
    }
    return [path , cost[destiny]];
  }

   lowestCostPath( source , destiny ){
   let cost;
   let path;
    if( !this.__negetiveEdge ){
      [path , cost] = this.__dijkstra( source , destiny );
    } else {
      [path , cost] = this.__BellmanFord( source , destiny );
    }
    return [path , cost];
  }
};

module.exports = Graph;
