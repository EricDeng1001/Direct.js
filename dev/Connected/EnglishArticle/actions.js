import {
  __SELECT_WORD,
  __SELECT_SENTNCE,
  __TRANSLATE_SENTENCES,
  __TRANSLATE_ALL,
  __HIDE_TRANSLATE,
  __ASYNC_TRANSLATE_WORDS,
  __HIDE_ALL,
  __ASYNC_LOAD_CONTENT
} from 'actionTypes';


/*
defineSyncActionCreator hideAllTranslate start
*/
let hideAllTranslateCounter = 0;
export const hideAllTranslate = () => ({
    type: __HIDE_ALL,
    payload: {
    },
    id: hideAllTranslateCounter++
});
/*
defineSyncActionCreator hideAllTranslate end
*/

/*
defineSyncActionCreator hideTranslate start
*/
let hideTranslateCounter = 0;
export const hideTranslate = () => ({
    type: __HIDE_TRANSLATE,
    payload: {
    },
    id: hideTranslateCounter++
});
/*
defineSyncActionCreator hideTranslate end
*/
let selectWordCounter = 0;
export const selectWord = ( word ) => ({
    type: __SELECT_WORD,
    payload: {
      word,
    },
    id: selectWordCounter++
});

let selectSentenceCounter = 0;
export const selectSentence = ( sentenceId ) => ({
    type: __SELECT_SENTNCE,
    payload: {
      sentenceId,
    },
    id: selectSentenceCounter++
});

/*
defineSyncActionCreator translateSentence start
*/
let translateSentencesCounter = 0;
export const translateSentences = () => ({
    type: __TRANSLATE_SENTENCES,
    payload: {

    },
    id: translateSentencesCounter++
});
/*
defineSyncActionCreator translateSentence end
*/
let translateAllCounter = 0;
export const translateAll = () => ({
    type: __TRANSLATE_ALL,
    payload: {
    },
    id: translateAllCounter++
});

let translateWordsCounter = 0;
const translateWordsStart = () => ({
    type: __ASYNC_TRANSLATE_WORDS.pending,
    payload: {

    },
    id: translateWordsCounter
});
const translateWordsResolved = ( response ) => ({
    type: __ASYNC_TRANSLATE_WORDS.resolved,
    payload: {
      response
    },
    id: translateWordsCounter
});
const translateWordsRejected = ( reason , detail ) => ({
    type: __ASYNC_TRANSLATE_WORDS.rejected,
    payload: {
      reason,
      detail
    },
    id: translateWordsCounter
});

export const translateWords = () => ( dispatch , getState ) => {
  const oldState = getState();
  const reqId = ++translateWordsCounter;
  const dispatchLastest = action => {
    if( reqId === translateWordsCounter ){
      dispatch( action );
    }
  }
  dispatch( translateWordsStart() );
  fetch( 'http://139.129.210.230/LearningSystem/BackEnd/get_word.php' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',

      },
      body: 'query_words=' + oldState.EnglishArticle.choosedWords.toArray().join(' ')
  })
  .then( response => {
    if( !response.ok ){
      dispatchLastest( translateWordsRejected( "server" , response.status ) );
      return;
    }
    response.json()
    .then( json => dispatchLastest( translateWordsResolved( json ) ) )
    .catch( err => {
      dispatchLastest( translateWordsRejected( "json" , err ) )
    });
  })
  .catch( err => {
      dispatchLastest( translateWordsRejected( "network" , err ) );
  });
}
let translateSentenceCounter = 0;
export const translateSentence = () => ({
    type: __TRANSLATE_SENTENCES,
    payload: {
    },
    id: translateSentenceCounter++
});

let loadContentCounter = 0;
const loadContentStart = () => ({
    type: __ASYNC_LOAD_CONTENT.pending,
    payload: {

    },
    id: loadContentCounter
});
const loadContentResolved = ( response ) => ({
    type: __ASYNC_LOAD_CONTENT.resolved,
    payload: {
      response
    },
    id: loadContentCounter
});
const loadContentRejected = ( reason , detail ) => ({
    type: __ASYNC_LOAD_CONTENT.rejected,
    payload: {
      reason,
      detail
    },
    id: loadContentCounter
});

export const loadContent = () => ( dispatch , getState ) => {
  const oldState = getState();
  const reqId = ++loadContentCounter;
  const dispatchLastest = action => {
    if( reqId === loadContentCounter ){
      dispatch( action );
    }
  }
  dispatch( loadContentStart() );
  fetch( 'http://139.129.210.230/LearningSystem/BackEnd/get_sentence.php' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${oldState.UserManager.name}&lock=0&articleId=0`
  })
  .then( response => {
    if( !response.ok ){
      dispatchLastest( loadContentRejected( "server" , response.status ) );
      return;
    }
    response.json()
    .then( json => dispatchLastest( loadContentResolved( json ) ) )
    .catch( err => {
      dispatchLastest( loadContentRejected( "json" , err ) )
    });
  })
  .catch( err => {
      dispatchLastest( loadContentRejected( "network" , err ) );
  });
}
