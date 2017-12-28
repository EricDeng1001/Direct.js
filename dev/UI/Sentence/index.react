import React from 'react';
import style from 'style';

class Sentence extends React.PureComponent {
  render(){
    const { words , pure } = this.props;
    if( pure ){
      return (
        <React.Fragment>
        {
          words.map( ( word , key ) =>
            <span
              key={`${word}${key}`}
              className={style.normalWord}
            >
            {word}
            </span>
          )
        }
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
      {
        words.map( ( word , key ) =>
          <span
            key={`${word}${key}`}
            className={this.getClassName( word )}
            onClick={this.onSelect}
          >
          {word}
          </span>
        )
      }
      </React.Fragment>
    );
  }

  getClassName = ( word ) => {
    const { choosedWords , choosed , displayByWords , sentenceId } = this.props;
    return choosedWords.has( word ) ? style.choosedWord : style.normalWord
  }

  onSelect = ( ev ) => {
    const { displayByWords , onSelectWord , onSelectSentence , sentenceId } = this.props;
    if( displayByWords ){
      onSelectWord( ev.target.innerHTML );
    }
    else {
      onSelectSentence( sentenceId );
    }
  }
};

export default Sentence;
