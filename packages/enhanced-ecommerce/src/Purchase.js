import React, {PureComponent} from 'react';
import {queueDataLayer} from 'lin3s-react-analytics';
import PropTypes from 'prop-types';

class Purchase extends PureComponent {
  componentDidMount() {
    const {shouldSend, purchase, callback} = this.props;

    if (!shouldSend) {
      return;
    }

    queueDataLayer(purchase);

    if (callback) {
      callback();
    }
  }

  render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}

Purchase.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.element.isRequired,
  purchase: PropTypes.shape({
    event: PropTypes.string.isRequired,
    ecommerce: PropTypes.shape({
      purchase: PropTypes.shape({
        actionField: PropTypes.shape({
          affiliation: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          revenue: PropTypes.number.isRequired,
          shipping: PropTypes.number.isRequired,
          tax: PropTypes.number.isRequired,
        }).isRequired,
        products: PropTypes.arrayOf(PropTypes.shape({
          brand: PropTypes.string.isRequired,
          category: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          quantity: PropTypes.number.isRequired,
          variant: PropTypes.string.isRequired,
        }).isRequired).isRequired,
      }).isRequired,
    }).isRequired,
  }),
  shouldSend: PropTypes.bool,
};

Purchase.defaultProps = {
  shouldSend: true,
};

export default Purchase;
