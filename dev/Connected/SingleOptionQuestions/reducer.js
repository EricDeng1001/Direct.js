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

export default ( state = {
    content: [],
    submitState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network", // "json" , "server"
      failedDetail: null
    },
    loadState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network", // "json" , "server"
      failedDetail: null
    },
} , { type , payload , id } ) => {
  const { content } = state;
  switch( type ){
    case __SET_CHOICE:
      return {
        ...state,
        content: content.map(
          q => q.questionId === payload.questionId ?
            { ...q , choosed: payload.choice }
            :q
        )
      };

    case __LOCK_QUESTION:
    case __UNLOCK_QUESTION:
      
      return {
        ...state,
        content: content.map(
          q => q.questionId === payload.questionId ?
            { ...q , lock : type === __LOCK_QUESTION }
            :q
        )
      };

    case __SHOW_QUESTION:
    case __HIDE_QUESTION:
      return {
        ...state,
        content: content.map(
          q => q.questionId === payload.questionId ?
            { ...q , show : type === __HIDE_QUESTION }
            :q
        )
      };

    case __LOCK_AND_SHOW:
    case __UNLOCK_AND_HIDE:

      return {
        ...state,
        content: content.map(
          q => q.questionId === payload.questionId ?
            { ...q,
              show : type === __LOCK_AND_SHOW,
              lock : __LOCK_AND_SHOW === type
            }
            :q
          )
        };

    case __ASYNC_SUBMIT_QUESTIONS.pending: {
      let submitState = {...state.submitState};
      submitState.pending++;
      submitState.lastFailed = false;
      return { ...state,
        submitState
      };
    }
    case __ASYNC_SUBMIT_QUESTIONS.resolved: {
      let submitState = {...state.submitState};
      submitState.pending--;
      submitState.resolved++;
      return { ...state,
        submitState
      };
    }
    case __ASYNC_SUBMIT_QUESTIONS.rejected: {
      let submitState = {...state.submitState};
      submitState.pending--;
      submitState.rejected++;
      submitState.lastFailed = true;
      return { ...state,
        submitState
      };
    }

    /*
    defineAsyncActionReducer __LOAD_QUESTIONS start
    */
    case __ASYNC_LOAD_QUESTIONS.pending: {
      let loadState = {...state.loadState };
      loadState.lastFailed = false;
      loadState.pending++;
      return {
        ...state,
        loadState
      };
    }
    case __ASYNC_LOAD_QUESTIONS.resolved: {
      let { response , initState } = payload;
      initState = initState || {
        lock: false,
        show: false,
        choice: -1
      };
      let loadState = {...state.loadState };
      loadState.resolved++;
      loadState.pending--;
      return {
        ...state,
        loadState,
        content: response.map( q => ({
          ...q,
          lock: initState.lock,
          show: initState.show,
          choice: initState
        }))
      };
    }
    case __ASYNC_LOAD_QUESTIONS.rejected: {
      let { reason , detail } = payload;
      let loadState = {...state.loadState };
      loadState.rejected++;
      loadState.pending--;
      loadState.lastFailed = true;
      loadState.failedReason = reason;
      loadState.failedDetail = detail;
      return {
        ...state,
        loadState
      };
    }
    /*
    defineAsyncActionReducer __LOAD_QUESTIONS end
    */

    default:
      return state;
  }
}
