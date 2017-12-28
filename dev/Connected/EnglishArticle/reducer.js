import {
  __SELECT_WORD,
  __SELECT_SENTNCE,
  __TRANSLATE_SENTENCES,
  __TRANSLATE_ALL,
  __ASYNC_TRANSLATE_WORDS,
  __HIDE_TRANSLATE,
  __HIDE_ALL,
  __ASYNC_LOAD_CONTENT
} from 'actionTypes';

import TrieTree from 'DataStructure/TrieTree';

export default (
  state = {
    articleId: -1,
    sentences: [],
    paragraphedWords: [],
    wordsTranslates: [],
    sentencesTranslates: [],
    allTranslates: [],
    choosedWords: new TrieTree(),
    choosedSentences: [],
    showAllTranslates: false,
    showSentencesTranslates: false,
    showWordsTranslates: false,
    loadState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network" // "json" , "server"
    },
    translateWordsState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network" // "json" , "server"
    }
  } , { type , payload , id } ) => {
  switch( type ){

    /*
    defineSyncActionReducer __HIDE_ALL start
    */
    case __HIDE_ALL: {
      return {
        ...state,
        showAllTranslates: false
      };
    }
    /*
    defineSyncActionReducer __HIDE_ALL end
    */
    /*
    defineSyncActionReducer __SELECT_WORD__ start
    */
    case __SELECT_WORD:
      var choosedWords = Object.create( state.choosedWords );
      if( choosedWords.has( payload.word ) ){
        choosedWords.remove( payload.word );
      }
      else {
        choosedWords.insert( payload.word );
      }
      return {
        ...state,
        choosedWords
      };
      /*
      defineSyncActionReducer __SELECT_WORD__ end
      */
      /*
      defineSyncActionReducer __SELECT_SENTNCE__ start
      */
    case __SELECT_SENTNCE:
    var choosedSentences = [...state.choosedSentences];
    if( state.choosedSentences.find( sid => sid === payload.sentenceId ) + 1 ){
      choosedSentences = choosedSentences.filter( sid => sid !== payload.sentenceId );
    }
    else {
      choosedSentences.push( payload.sentenceId );
    }
    return {
      ...state,
      choosedSentences
    };
    /*
    defineSyncActionReducer __SELECT_SENTNCE__ end
    */
    /*
    defineSyncActionReducer __TRANSLATE_ALL__ start
    */
    case __TRANSLATE_ALL: {
      return {
        ...state,
        showAllTranslates: true
      };
    }
    /*
    defineSyncActionReducer __TRANSLATE_ALL__ end
    */
    /*
    defineSyncActionReducer __TRANSLATE_SENTENCES__ start
    */
    case __TRANSLATE_SENTENCES:
      return {
        ...state,
        showSentencesTranslates: true
      };
    /*
    defineSyncActionReducer __TRANSLATE_SENTENCES__ end
    */
    /*
    defineSyncActionReducer __HIDE_TRANSLATE start
    */
    case __HIDE_TRANSLATE: {
      return {
        ...state,
        showSentencesTranslates: false
      };
    }
    /*
    defineSyncActionReducer __HIDE_TRANSLATE end
    */

    /*
    defineAsyncActionReducer __TRANSLATE_WORDS start
    */
    case __ASYNC_TRANSLATE_WORDS.pending: {
      const translateWordsState = { ...state.translateWordsState };
      translateWordsState.lastFailed = false;
      translateWordsState.pending++;
      return {
        ...state,
        translateWordsState
      };
    }
    case __ASYNC_TRANSLATE_WORDS.resolved: {
      const { response } = payload;
      const translateWordsState = { ...state.translateWordsState };
      translateWordsState.resolved++;
      translateWordsState.pending--;

      var wordsTranslates = [];

      for( var i = 0 ; i < response.length ; i++ ){
        wordsTranslates.push({
          expression: response[i].duanyu,
          example: response[i].liju,
          exampleTranslate: response[i].liju_translate,
          translate: response[i].translate,
          word: response[i].word_l,
          pronouncation: response[i].yinbiao
        });
      }

      return {
        ...state,
        translateWordsState,
        wordsTranslates
      };
    }
    case __ASYNC_TRANSLATE_WORDS.rejected: {
      const { reason , detail } = payload;
      const translateWordsState = { ...state.translateWordsState };
      translateWordsState.rejected++;
      translateWordsState.pending--;
      translateWordsState.lastFailed = true;
      translateWordsState.failedReason = reason;
      translateWordsState.failedDetail = detail;
      return {
        ...state,
        translateWordsState,
        wordsTranslates
      };
    }
    /*
    defineAsyncActionReducer __TRANSLATE_WORDS end
    */

    /*
    defineAsyncActionReducer __LOAD_CONTENT start
    */
    case __ASYNC_LOAD_CONTENT.pending: {
      const loadState = { ...state.loadState };
      loadState.lastFailed = false;
      loadState.pending++;
      return {
        ...state,
        loadState
      };
    }
    case __ASYNC_LOAD_CONTENT.resolved: {
      const { response } = payload;
      const loadState = { ...state.loadState };
      loadState.resolved++;
      loadState.pending--;

      var sentences = [];
      var sentencesTranslates = [];
      var oneParagraphTranslate = "";
      var oneParagraphWords = [];
      const allTranslates = [];
      var paragraphedWords = response.map( sentenceObjs => {
        oneParagraphTranslate = "";
        oneParagraphWords = sentenceObjs.map( sentenceObj => {
          sentences.push( sentenceObj.sentence );
          oneParagraphTranslate += sentenceObj.translate;
          sentencesTranslates.push( sentenceObj.translate );
          return sentenceObj.sentence.split( ' ' );
        });
        allTranslates.push( oneParagraphTranslate );
        return oneParagraphWords;
      });

      return {
        ...state,
        loadState,
        articleId: response[0][0].artid,
        sentences,
        paragraphedWords,
        sentencesTranslates,
        allTranslates
      };
    }
    case __ASYNC_LOAD_CONTENT.rejected: {
      const { reason , detail } = payload;
      const loadState = { ...state.loadState };
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
    defineAsyncActionReducer __LOAD_CONTENT end
    */
    default:
      return state;
  }
};
