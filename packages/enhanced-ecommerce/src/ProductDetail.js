import React, {PureComponent} from 'react';
import {queueDataLayer} from 'lin3s-react-analytics';
import PropTypes from 'prop-types';

class ProductDetail extends PureComponent {
  componentDidMount() {
    queueDataLayer(this.props.product);
  }

  render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}

ProductDetail.propTypes = {
  children: PropTypes.element.isRequired,
  product: PropTypes.shape({
    event: PropTypes.string.isRequired,
    ecommerce: PropTypes.shape({
      detail: PropTypes.shape({
        products: PropTypes.arrayOf(PropTypes.shape({
          brand: PropTypes.string.isRequired,
          category: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
        }).isRequired).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
