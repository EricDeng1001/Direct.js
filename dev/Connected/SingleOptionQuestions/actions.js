/*
**   Antinux Innovation
**   Author: Eric Deng
*/
import {
  __SET_CHOICE,
  __LOCK_QUESTION,
  __HIDE_QUESTION,
  __SHOW_QUESTION,
  __LOCK_AND_SHOW,
  __UNLOCK_AND_HIDE,
  __UNLOCK_QUESTION,
  __ASYNC_LOAD_QUESTIONS,
  __ASYNC_SUBMIT_QUESTIONS,
} from 'actionTypes';

import jsonToUrlencoded from 'Algorithm/jsonToUrlencoded';

/*
defineSyncActionCreator setChoice start
*/
let setChoiceCounter = 0;
export const setChoice = ( questionId , choice ) => ({
    type: __SET_CHOICE,
    payload: {
      questionId,
      choice
    },
    id: setChoiceCounter++
});
/*
defineSyncActionCreator setChoice end
*/

/*
defineSyncActionCreator lockQuestion start
*/
let lockQuestionCounter = 0;
export const lockQuestion = ( questionId ) => ({
    type: __LOCK_QUESTION,
    payload: {
      questionId
    },
    id: lockQuestionCounter++
});
/*
defineSyncActionCreator lockQuestion end
*/
/*
defineSyncActionCreator unlockAndHide start
*/

/*
defineSyncActionCreator hideQuestion start
*/
let hideQuestionCounter = 0;
export const hideQuestion = ( questionId ) => ({
    type: __HIDE_QUESTION,
    payload: {
      questionId
    },
    id: hideQuestionCounter++
});
/*
defineSyncActionCreator hideQuestion end
*/

/*
defineSyncActionCreator showQuestion start
*/
let showQuestionCounter = 0;
export const showQuestion = ( questionId ) => ({
    type: __SHOW_QUESTION,
    payload: {
      questionId
    },
    id: showQuestionCounter++
});
/*
defineSyncActionCreator showQuestion end
*/

/*
defineSyncActionCreator lockAndShow start
*/
let lockAndShowCounter = 0;
export const lockAndShow = ( questionId ) => ({
    type: __LOCK_AND_SHOW,
    payload: {
      questionId
    },
    id: lockAndShowCounter++
});
/*
defineSyncActionCreator lockAndShow end
*/

/*
defineSyncActionCreator unlockAndHide start
*/
let unlockAndHideCounter = 0;
export const unlockAndHide = ( questionId ) => ({
    type: __UNLOCK_AND_HIDE,
    payload: {
      questionId
    },
    id: unlockAndHideCounter++
});
/*
defineSyncActionCreator unlockAndHide end
*/

/*
defineAsyncActionCreator submitQuestions start
*/
let submitQuestionsCounter = 0;
const submitQuestionsStart = () => ({
    type: __ASYNC_SUBMIT_QUESTIONS.pending,
    payload: {
    },
    id: submitQuestionsCounter
});
const submitQuestionsResolved = ( response ) => ({
    type: __ASYNC_SUBMIT_QUESTIONS.resolved,
    payload: {
      response
    },
    id: submitQuestionsCounter
});
const submitQuestionsRejected = ( reason , detail ) => ({
    type: __ASYNC_SUBMIT_QUESTIONS.rejected,
    payload: {
      reason,
      detail
    },
    id: submitQuestionsCounter
});

export const submitQuestions = ({ url , body , headers }) => ( dispatch , getState ) => {
  const reqId = ++submitQuestionsCounter;
  const dispatchLastest = action => {
    if( reqId === submitQuestionsCounter ){
      dispatch( action );
    }
  }
  dispatch( submitQuestionsStart() );
  if( typeof body === "object" ){
    body = jsonToUrlencoded( body );
  }
  fetch( url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
      },
      body: body
  })
  .then( response => {
    if( response.ok ){
      dispatchLastest( submitQuestionsResolved() );
      return;
    }
  })
  .catch( err => {
      dispatchLastest( submitQuestionsRejected( "network" , err ) );
  });
};

/*
defineAsyncActionCreator submitQuestions end
*/

/*
defineAsyncActionCreator loadQuestions start
*/
let loadQuestionsCounter = 0;
const loadQuestionsStart = () => ({
    type: __ASYNC_LOAD_QUESTIONS.pending,
    payload: {

    },
    id: loadQuestionsCounter
});
const loadQuestionsResolved = ( response , initState ) => ({
    type: __ASYNC_LOAD_QUESTIONS.resolved,
    payload: {
      response,
      initState
    },
    id: loadQuestionsCounter
});
const loadQuestionsRejected = ( reason , detail ) => ({
    type: __ASYNC_LOAD_QUESTIONS.rejected,
    payload: {
      reason,
      detail
    },
    id: loadQuestionsCounter
});

export const loadQuestions = ({ url , body , parser , headers  , initState }) => ( dispatch , getState ) => {
  const reqId = ++loadQuestionsCounter;
  const dispatchLastest = action => {
    if( reqId === loadQuestionsCounter ){
      dispatch( action );
    }
  }
  dispatch( loadQuestionsStart() );
  if( typeof body === "object" ){
    body = jsonToUrlencoded( body );
  }
  fetch( url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
      },
      body: body
  })
  .then( response => {
    if( !response.ok ){
      dispatchLastest( loadQuestionsRejected( "server" , response.status ) );
      return;
    }
    response.json()
    .then( json => dispatchLastest( loadQuestionsResolved( parser( json ) , initState ) ) )
    .catch( err => {
      dispatchLastest( loadQuestionsRejected( "json" , err ) )
    });
  })
  .catch( err => {
      dispatchLastest( loadQuestionsRejected( "network" , err ) );
  });
};

/*
defineAsyncActionCreator loadQuestions end
*/
// I hope to download the earlieast request
