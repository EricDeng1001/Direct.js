/*
**   Antinux Innovation
**   Author: Eric Deng
*/

import React from 'react';
import style from 'style';
import Info from '../../UI/Info';


class Loading extends React.PureComponent {
  render(){
    const { children , loading , wasLoaded , lastFailed , reloader , info , center } = this.props;
    return (
      <React.Fragment>
      {
        loading ? (() => {
          var a = Math.random();
          if( a < 0.3 ){
            return (
              <div className={center && style.makeLoadingCenter} >
                <div className={style.spinner1} >
                  <div className={style.bounce1}  />
                  <div className={style.bounce2}  />
                  <div className={style.bounce3}  />
                </div>
              </div>
            );
          }
          else if( a < 0.7 ) {
            return (
              <div className={center && style.makeLoadingCenter} >
                <div className={style.spinner2} >
                  <div className={style.doubleBounce1}  />
                  <div className={style.doubleBounce2}  />
                </div>
              </div>
            );
          }
          else {
            return (
              <div className={center && style.makeLoadingCenter} >
                <div className={style.spinner3} >
                  <div className={style.rect1} />
                  <div className={style.rect2} />
                  <div className={style.rect3} />
                  <div className={style.rect4} />
                  <div className={style.rect5} />
                </div>
              </div>
            );
          }
        })()
        :lastFailed ?
        <div
          onClick={reloader}
          className={style.bigNote + ' ' + center && style.makeLoadingCenter}
        >
          <Info
            info={
              wasLoaded?
              "Latest request failed, click here to reload"
              :"Request failed, please check your network state.Click here to reload"
            }
          />
        </div>
        :<Info info={info} /> // could be null
      }
      {
      wasLoaded ?
      children
      :null
      }
      </React.Fragment>
    );
  }
};

export default Loading;
