import React, {PureComponent} from 'react';
import {flush, pushPageLoadDataLayer} from 'lin3s-react-analytics';
import PropTypes from 'prop-types';

const pushDataLayers = () => {
  setTimeout(() => {
    pushPageLoadDataLayer();
    flush();
  }, 0);
};

class Page extends PureComponent {
  componentDidMount() {
    if (!this.props.doNotTrack) {
      pushDataLayers();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.doNotTrack && !nextProps.doNotTrack) {
      pushDataLayers();
    }
  }

  render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}

Page.propTypes = {
  children: PropTypes.element.isRequired,
  doNotTrack: PropTypes.bool,
};

Page.defaultProps = {
  doNotTrack: false,
};

export default Page;
