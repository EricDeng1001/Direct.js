import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from 'actions';
import Sentence from 'UI/Sentence';
import Button from 'UI/Button';
import Info from "UI/Info";
import style from 'style';

class EnglishArticle extends React.PureComponent {
  constructor( props ){
    super( props );
    this.isChoosedSentence = this.isChoosedSentence.bind( this );
  }

  render(){
    const {
      paragraphedWords,
      choosedWords,
      sentences,
      choosedSentences,
      selectWord,
      selectSentence,
      showAllTranslates,
      showSentencesTranslates,
      loadContent,
      allTranslates,
      sentencesTranslates,
      displayByWords
    } = this.props;

    var sentenceId = -1;

    return (
      <div className={`container ${style.article}`}>
        <div className={style.english}>
        {
          paragraphedWords.map( ( oneParagrah , key ) =>
            <div key={key} className={style.paragraphContainer}>
            {
              oneParagrah.map( ( oneSentence , key ) => {
                sentenceId++;
                return (
                <div
                  key={key}
                  className={
                    this.isChoosedSentence( sentenceId )?
                    style.choosedSentence
                    :style.sentenceContainer
                  }
                >
                  <Sentence
                    words={oneSentence}
                    displayByWords={displayByWords}
                    choosedWords={choosedWords}
                    sentenceId={sentenceId}
                    choosed={choosedSentences}
                    onSelectWord={selectWord}
                    onSelectSentence={selectSentence}
                  />
                  {
                    showSentencesTranslates &&
                    this.isChoosedSentence( sentenceId )
                    ?<Info info={sentencesTranslates[sentenceId]} />
                    :null
                  }
                </div>
              );})
            }
            </div>
          )
        }
        </div>
        {
          showAllTranslates ?
          <div className={style.chinese}>
          {
            allTranslates.map( allTranslate =>
              <div key={allTranslate}
                className={style.oneParagrahChinese}>
                <Sentence

                  words={[allTranslate]}
                  pure
                />
              </div>
            )
          }
          </div>
          :null
        }
      </div>
    );
  }
  isChoosedSentence( sid ){
    return this.props.choosedSentences.find( qid => qid === sid );
  }
};

export default connect(
  ({ EnglishArticle: ownState , ...state }) => ({
    paragraphedWords: ownState.paragraphedWords,
    sentences: ownState.sentences,
    choosedSentences: ownState.choosedSentences,
    choosedWords: ownState.choosedWords,
    showSentencesTranslates: ownState.showSentencesTranslates,
    showAllTranslates: ownState.showAllTranslates,
    allTranslates: ownState.allTranslates,
    sentencesTranslates: ownState.sentencesTranslates
  }),
  dispatch => bindActionCreators( actionsCreators , dispatch )
)( EnglishArticle );
