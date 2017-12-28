import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import TrieTree from 'DataStructure/TrieTree';
import Info from 'UI/Info';
import style from 'style';

class EnglishArticleSummary extends React.PureComponent {

    render(){
      const { wordCount , choosedWordCount , allWordCount } = this.props;
      return (
        <div className="container">
          <Info info={`Unknown words:${choosedWordCount} of ${wordCount} = ${(choosedWordCount/wordCount).toFixed(3)*100}%;Total Num: ${allWordCount} `}
          />
        </div>
      );
    }
};

const convert3DTo1D = _3D => {
  var res = [];
  for( let i = 0 ; i < _3D.length ; i++ ){
    for( let j = 0 ; j < _3D[i].length ; j++ ){
      for( let h = 0 ; h < _3D[i][j].length ; h++ ){
        res.push( _3D[i][j][h] );
      }
    }
  }
  return res;
}

const convertToTrieTree = createSelector(
  convert3DTo1D,
  wordList => {
  var tmp = new TrieTree();
  for( let i = 0 ; i < wordList.length ; i++ ){
    tmp.insert( wordList[i] );
  }
  return tmp;
});

const countWordNum = createSelector(
  convertToTrieTree,
  TrieTree => TrieTree.root.count
);

export default connect(
  state => ({
    allWordCount: convert3DTo1D( state.EnglishArticle.paragraphedWords ).length,
    wordCount: countWordNum( state.EnglishArticle.paragraphedWords ),
    choosedWordCount: state.EnglishArticle.choosedWords.root.count
  })
)( EnglishArticleSummary );
