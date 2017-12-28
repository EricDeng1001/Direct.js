import React from 'react';
import style from 'style';


class SingleQuestion extends React.Component {
  constructor( props ){
    super( props );
    this.setChoice = this.setChoice.bind( this );
    this.tryChange = this.tryChange.bind( this );
  }

  render(){
    const { questionId , options , question , choosed , lock , show , rightKey , analysis } = this.props;
    var checked = [];
    var highlighted = [];
    var validChoice = false;
    var questionStyle = style.normalQuestion;
    for( let i = 0 ; i < options.length ; i++ ){
      checked.push('');
      highlighted.push( style.normalOption );
    }

    for( let i = 0 ; i < choosed.length ; i++ ){
      if( choosed[i] >= 0 && choosed[i] <= options.length ){
        checked[choosed[i]] = 'checked';
        highlighted[choosed[i]] = style.choosedOption;
        validChoice = true;
      }
    }

    if( show ){
      questionStyle = style.rightQuestion;
      for( let i = 0 ; i < rightKey.length ; i++ ){
        highlighted[rightKey[i]] = style.rightOption;
      }

      if( validChoice ){
        for( let i = 0 , right = 0 , wrong = 0; i < choosed.length ; i++ ){
          if( !isRightKey( choice[i] ) ){
            highlighted[choice[i]] = style.wrongOption;
            wrong++;
          }
          else {
            right++;
            if( right > wrong ){
              questionStyle = style.rightGtWrong;
            }
            else {
              questionStyle = style.rightLtWrong;
            }
          }
        }
      }
      else {
        questionStyle = style.wrongQuestion;
      }
    }
    return(
      <div className="container">
  	   <form
          id={questionId}
          className={style.questionWrapper}
      >
        <div className={questionStyle}>{question}</div>
  	  	{
  	  	options.map( ( option , key ) =>
  	  		<div
            key={key}
            className={style.option}
            onClick={lock ? this.tryChange( key ) : this.setChoice( key )}
          >
  	  			<input
              type="checkbox"
  	  			  id={`question${questionId}option${key}`}
  	  			  name={`answerToComponentQuestion${questionId}`}
  	  			  checked={checked[key]}
              readOnly={ lock ? 'readonly' : ''}
            />
      			<label
              htmlFor={`question${questionId}option${key}`}
            >
  	  			  {option}
      		  </label>
          </div>
   	   	  )
  	   	 }
  	     </form>
         {
           show ? <div>{analysis}</div> : null
         }
      </div>
    );
  }

  tryChange( index ){
    if( this.props.tryChange ){
      return () => this.props.tryChange( index );
    }
    return () => console.log("trying change to " + index);
  }

  setChoice( index ){
    if( this.props.onSetChoice ){
      return () => this.props.onSetChoice( index );
    }
    return () => this.choice = index;
  }
};

export default SingleQuestion;
