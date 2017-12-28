import React from 'react';
import { connect } from 'react-redux';
import OneTranslatedWord from 'UI/OneTranslatedWord';
import Info from "UI/Info";
import style from 'style';

class TranslatedWords extends React.PureComponent {
    constructor( props ){
      super( props );
    }

    render(){
      const { words } = this.props;
      return (
        <div className="container">
        {
          words.length === 0
          ? <Info info="You do not have unknown words, great!"/>
          :words.map( wordObj =>
            <div
              className={style.oneItem}
              key={wordObj.word}
            >
              <OneTranslatedWord
                {...wordObj}
              />
            </div>
          )
        }
        </div>
      );
    }
};

export default connect(
  state => ({
    words: state.EnglishArticle.wordsTranslates
  })
)( TranslatedWords );
