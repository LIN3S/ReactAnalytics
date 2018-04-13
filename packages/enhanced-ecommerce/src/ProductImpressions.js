import React, {PureComponent} from 'react';
import {queueDataLayer, pushDataLayer} from 'lin3s-react-analytics';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';

class ProductImpressions extends PureComponent {
  componentDidMount() {
    if (this.props.synchronous) {
      pushDataLayer(this.props.impressions);
    } else {
      queueDataLayer(this.props.impressions);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synchronous && !isEqual(nextProps.impressions.ecommerce, this.props.impressions.ecommerce)) {
      pushDataLayer(nextProps.impressions);
    }
  }

  render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}

ProductImpressions.propTypes = {
  children: PropTypes.element.isRequired,
  impressions: PropTypes.shape({
    event: PropTypes.string.isRequired,
    ecommerce: PropTypes.shape({
      currencyCode: PropTypes.string.isRequired,
      impressions: PropTypes.arrayOf(PropTypes.shape({
        brand: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        list: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        position: PropTypes.number.isRequired,
      }).isRequired).isRequired,
    }).isRequired,
  }).isRequired,
  synchronous: PropTypes.bool,
};

ProductImpressions.defaultPros = {
  synchronous: false,
};

export default ProductImpressions;
