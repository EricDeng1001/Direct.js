module.exports =
  ( ipv4 ) => ipv4
                .split(".")
                .map( ( number, index ) => number * ( 256 ** ( 3 - index ) ) )
                .reduce( ( sum, number ) => sum = sum + number, 0 )
