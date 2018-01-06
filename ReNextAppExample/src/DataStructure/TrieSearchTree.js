class Node {
  constructor( charA ){
    this.character = charA;
    this.count = 1;
    this.children = [];
  }
  appendChild( child ){
    this.children.push( child );
    return child;
  }
  removeChild( child ){
    this.children = this.children.filter( c => c !== child );
  }
};

//insert , remove , find --> O( min( string.length , depth ) ) --> basiclly O( 1 )
//A very good DS to store unrelated string group
class TrieSearchTree {
  constructor( trieTreeRoot ){
    if( trieTreeRoot ){
      this.root = trieTreeRoot.root;
      return;
    }
    this.root = new Node('');
    this.root.count = 0;
  }

  insert( string ){
    if( this.has( string ) ){
      return;
    }
    this.root.count++;
    var checkingNode = this.root;
    var find = false;
    for( let i = 0; i < string.length ; i++ ){
      find = false;
      for( let j = 0 ; j < checkingNode.children.length ; j++ ){
        if( string[i] === checkingNode.children[j].character ){
          find = true;
          checkingNode.children[j].count++;
          checkingNode = checkingNode.children[j];
          break;
        }
      }
      if( !find ){
        checkingNode = checkingNode.appendChild( new Node( string[i] ) );
      }
    }
  }

  remove( string ){
    var checkingNode = this.root;
    var find = false;
    var needToremove = false;
    var nodesToBeRemoved = [];
    for( let i = 0; i < string.length ; i++ ){
      find = false;
      for( let j = 0 ; j < checkingNode.children.length ; j++ ){
        if( string[i] === checkingNode.children[j].character ){
          find = true;
          if( --checkingNode.children[j].count === 0 ){
            checkingNode.removeChild( checkingNode.children[j] );
            return;
          }
          checkingNode = checkingNode.children[j];
          break;
        }
      }
      if( !find ){
        return;
      }
    }
  }

  has( string ){
    var checkingNode = this.root;
    var find = false;
    for( let i = 0; i < string.length ; i++ ){
      find = false;
      for( let j = 0 ; j < checkingNode.children.length ; j++ ){
        if( string[i] === checkingNode.children[j].character ){
          find = true;
          checkingNode = checkingNode.children[j];
          break;
        }
      }
      if( !find ){
        return false;
      }
    }
    //checkingNode points to the last character
    if( checkingNode.children.length === 0 ){
      return true;
    }
    var sumCount = 0;
    for( let i = 0 ; i < checkingNode.children.length ; i++ ){
      sumCount += checkingNode.children[i].count;
    }
    if( checkingNode.count === sumCount + 1 ){
      return true;
    }
    else {
      return false;
    }
  }

  dfr( func = node => node.character, vertex = this.root ){
    var vistedNodes = new Set();
    var path = [];
    var res = [];
    var node;
    vistedNodes.add( vertex );
    res.push( func( vertex ) );
    node = vertex;
    do {
      for( let i = 0 ; i < node.children.length ; i++ ){
        let _node = node.children[i];
        if( !vistedNodes.has(  _node ) ){
          path.unshift( node );
          vistedNodes.add( _node );
          res.push( func( _node ) );
          node = _node;
          i = -1;
        }
      }
      node = path.shift();
    } while( path.length !== 0 );
    return res;
  }

  __toArrayRecursive( root ){
    var res = [];
    var childString;
    var stringed = 0;
    for( let i = 0 ; i < root.children.length ; i++ ){
      stringed += root.children[i].count;
      childString = this.__toArrayRecursive( root.children[i] );
      res = res.concat( childString.map( str => root.character + str ));
    }
    if( stringed === root.count - 1 ){
      res.push( root.character );
    }
    return res;
  }

  toArray(){
    return this.__toArrayRecursive( this.root );
  }
};

module.exports = TrieSearchTree;
