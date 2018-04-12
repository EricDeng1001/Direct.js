import React from 'react';
import style from 'style';

class Sidebar extends React.PureComponent {
  static defaultProps = {
    CategoryIcon: "/static/pics/Category.png"
  }
  state = {
    show: true
  }

  toggleSidebar = () => {
    this.setState({
      show: !this.state.show
    });
  }
  render(){
    const { children , brand , items , right , CategoryIcon } = this.props;
    const { show } = this.state;
    return (
      <div className={`${style.container} fullSpaceBFC`}>
        <div className={style.sidebar + ' ' + ( show ? style.show : style.hide)}>
          <div className={style.brand}>
            {brand}
          </div>
          <div className={style.items}>
          {
            items.map( ( it , key ) =>
              <span
                className={style.item}
                key={key}
              >
              {it}
              </span>
            )
          }
          </div>
        </div>
        <div className={style.content}>
          <div
            className={style.btn}
            onClick={this.toggleSidebar}
          >
            <img src={CategoryIcon} />
          </div>
        {children}
        </div>
      </div>
    );
  }
};

export default Sidebar;
