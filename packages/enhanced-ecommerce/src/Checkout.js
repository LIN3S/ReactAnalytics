import React, {PureComponent} from 'react';
import {queueDataLayer} from 'lin3s-react-analytics';
import PropTypes from 'prop-types';

class Checkout extends PureComponent {
  componentDidMount() {
    queueDataLayer(this.props.checkout);
  }

  render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}

Checkout.propTypes = {
  checkout: PropTypes.shape({
    event: PropTypes.string.isRequired,
    ecommerce: PropTypes.shape({
      checkout: PropTypes.shape({
        actionField: PropTypes.shape({
          step: PropTypes.number.isRequired,
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
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default Checkout;
