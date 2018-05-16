class ExpireBST {
  static createNode( data, expireTime ){
    return {
      data,
      expireAt: Date.now() + expireTime,
      touched: 1,
      left: null,
      right: null
    };
  }

  constructor( builder = ( a, b ) => a - b ){ // rebuild
    if( typeof builder === "string" ){
      builder = JSON.parse( builder );
    }
    if( typeof builder === "object" ){
      this.comp = new Function( "return " + builder.comp )();
      if( typeof builder.root === "string" ){
        builder.root = JSON.parse( builder.root );
      }
      this.root = builder.root;
    } else {
      this.comp = builder;
      this.root = null;
    }
  }

  toJSON(){ //serialize
    return {
      root: JSON.stringify( this.root ),
      comp: this.comp.toString()
    };
  }

  __touch( data, node, expireTime = 0 ){
    if( node === null ){
      node = ExpireBST.createNode( data, expireTime );
    } else {
      if( this.comp( data, node.data ) === 0 ){
        if( Date.now() < node.expireAt ){
          node.expireAt = Date.now() + expireTime;
          node.touched++;
          throw node.touched;
        } else {
          node.expireAt = Date.now() + expireTime;
          node.touched = 1;
        }
      } else {
        if( this.comp( data, node.data ) < 0 ){
          node.left = this.__touch( data, node.left, expireTime );
        } else {
          node.right = this.__touch( data, node.right, expireTime );
        }
      }
    }
    return node;
  }

  touch( data, expireTime ){
    try {
      this.root = this.__touch( data, this.root, expireTime );
    } catch( e ){
      if( typeof( e ) === "number" ){
        return e;
      } else {
        throw e;
      }
    }
    return 0;
  }
};

module.exports = ExpireBST;
