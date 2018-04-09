/*
merge obj's props to target
do not damage target's shape unless obj.prop is not a object

difference to Object.assign:
Object.assign damage target's shape

for instance:
a = {
  l1p1:1,
  l1p2: "s",
  l1p3: null,
  l1p4: {
    l2p1:2,
    l2p2: "d",
    l2p3: {
      l3p1: 1
    }
  }
}
Object.assign( a , {
    l1p4: {
        l2p4: 4
    }
}) wiil result in
{
  l1p1:1,
  l1p2: "s",
  l1p3: null,
  l1p4: {
    l2p4: 4
  }
}
while
merge( a , {
    l1p4: {
        l2p4: 4
    }
}) wiil result in
{
  l1p1:1,
  l1p2: "s",
  l1p3: null,
  l1p4: {
    l2p1:2,
    l2p2: "d",
    l2p3: {
      l3p1: 1
    },
    l2p4: 4
  }
}
*/
const isObject = require('./isObject');

function merge( target , obj , override = true ){
  const keys = Object.keys( obj );
  for( let i = 0 ; i < keys.length ; i++ ){
    if( isObject( obj[keys[i]] ) ){
      if( !isObject( target[keys[i]] ) ){
        target[keys[i]] = {};
      }
      merge( target[keys[i]] , obj[keys[i]] );
    }
    else {
      if( keys[i] in target ){
        if( !override ){
          continue;
        }
      }
      target[keys[i]] = obj[keys[i]];
    }
  }
}

module.exports = merge;
