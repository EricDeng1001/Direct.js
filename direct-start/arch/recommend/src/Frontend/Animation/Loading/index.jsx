import React from "react";

import CircularProgress from "material-ui/CircularProgress";

import style from "./style";

class Loading extends React.PureComponent {
  render(){
    const { center } = this.props;
    return (
      <div className={center && style.makeLoadingCenter}>
        {
          (() => {
            const a = Math.random();
            if( a < 0.3 ){
              return (
                <div className={style.spinner1}>
                  <div className={style.bounce1}  />
                  <div className={style.bounce2}  />
                  <div className={style.bounce3}  />
                </div>
              );
            }
            else if( a < 0.7 ) {
              return (
                <CircularProgress />
              );
            }
            else {
              return (
                <div className={style.spinner3}>
                  <div className={style.rect1} />
                  <div className={style.rect2} />
                  <div className={style.rect3} />
                  <div className={style.rect4} />
                  <div className={style.rect5} />
                </div>
              );
            }
          })()
        }
      </div>
    );
  }
};

export default Loading;
