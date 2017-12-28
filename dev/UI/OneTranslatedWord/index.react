import React from 'react';
import style from 'style';

class OneTranslatedWord extends React.PureComponent {
  constructor( props ){
    super( props );
  }

  render(){
    const {
      word,
      example,
      translate,
      exampleTranslate,
      expression,
      pronouncation
    } = this.props;
    return (
      <React.Fragment>
        <div className={style.word}>{word}&nbsp;|{pronouncation || "none"}|</div>
        <div className={style.label}>Meaning:</div>
        <div className={style.translate}>{translate  || "none" }</div>
        <div className={style.label}>Example:</div>
        <div className={style.example}>{example || "none" }</div>
        <div className={style.label}>Meaning:</div>
        <div className={style.exampleTranslate}>{exampleTranslate  || "none" }</div>
        <div className={style.label}>RegularExpression:</div>
        <div className={style.expression}>{expression  || "none" }</div>
      </React.Fragment>
    );
  }
};

export default OneTranslatedWord;
