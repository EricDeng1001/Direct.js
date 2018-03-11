import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$values from 'babel-runtime/core-js/object/values';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import uncontrollable from 'uncontrollable';

import { bsStyles, bsClass, getClassSet, splitBsPropsAndOmit } from './utils/bootstrapUtils';
import { State, Style } from './utils/StyleConfig';
import Body from './PanelBody';
import Heading from './PanelHeading';
import Title from './PanelTitle';
import Footer from './PanelFooter';
import Toggle from './PanelToggle';
import Collapse from './PanelCollapse';

var defaultGetId = function defaultGetId(id, type) {
  return id ? id + '--' + type : null;
};

var propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires
   * a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in.
   *
   * @controllable onToggle
   */
  expanded: PropTypes.bool,
  /**
   * A callback fired when the collapse state changes.
   *
   * @controllable expanded
   */
  onToggle: PropTypes.func,
  eventKey: PropTypes.any,

  /**
   * An HTML `id` attribute uniquely identifying the Panel component.
   */
  id: PropTypes.string
};

var contextTypes = {
  $bs_panelGroup: PropTypes.shape({
    getId: PropTypes.func,
    activeKey: PropTypes.any,
    onToggle: PropTypes.func
  })
};

var childContextTypes = {
  $bs_panel: PropTypes.shape({
    headingId: PropTypes.string,
    bodyId: PropTypes.string,
    bsClass: PropTypes.string,
    onToggle: PropTypes.func,
    expanded: PropTypes.bool
  })
};

var Panel = function (_React$Component) {
  _inherits(Panel, _React$Component);

  function Panel() {
    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  Panel.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        eventKey = _props.eventKey,
        id = _props.id;

    var _ref = this.context.$bs_panelGroup || {},
        getId = _ref.getId;

    var ids = void 0;
    var idKey = eventKey == null ? id : eventKey;

    if (idKey !== null) {
      getId = getId || defaultGetId;
      ids = {
        headingId: getId(idKey, 'heading'),
        bodyId: getId(idKey, 'body')
      };
    }

    return {
      $bs_panel: _extends({}, ids, {
        bsClass: this.props.bsClass,
        expanded: this.getExpanded(),
        onToggle: this.handleToggle
      })
    };
  };

  Panel.prototype.getExpanded = function getExpanded() {
    var eventKey = this.props.eventKey;

    var _ref2 = this.context.$bs_panelGroup || {},
        activeKey = _ref2.activeKey;

    return this.props.expanded != null || activeKey === undefined ? this.props.expanded : activeKey === eventKey;
  };

  Panel.prototype.handleToggle = function handleToggle(e) {
    var _ref3 = this.context.$bs_panelGroup || {},
        onToggle = _ref3.onToggle;

    var expanded = !this.getExpanded();

    this.props.onToggle(expanded, e);
    if (onToggle) {
      onToggle(this.props.eventKey, expanded, e);
    }
  };

  Panel.prototype.render = function render() {
    var _props2 = this.props,
        className = _props2.className,
        children = _props2.children;

    var _splitBsPropsAndOmit = splitBsPropsAndOmit(this.props, ['onToggle', 'eventKey', 'expanded']),
        bsProps = _splitBsPropsAndOmit[0],
        props = _splitBsPropsAndOmit[1];

    return React.createElement(
      'div',
      _extends({}, props, { className: classNames(className, getClassSet(bsProps)) }),
      children
    );
  };

  return Panel;
}(React.Component);

Panel.propTypes = propTypes;

Panel.contextTypes = contextTypes;
Panel.childContextTypes = childContextTypes;

var UncontrolledPanel = uncontrollable(bsClass('panel', bsStyles([].concat(_Object$values(State), [Style.DEFAULT, Style.PRIMARY]), Style.DEFAULT, Panel)), { expanded: 'onToggle' });

_Object$assign(UncontrolledPanel, {
  Heading: Heading,
  Title: Title,
  Body: Body,
  Footer: Footer,
  Toggle: Toggle,
  Collapse: Collapse
});

export default UncontrolledPanel;