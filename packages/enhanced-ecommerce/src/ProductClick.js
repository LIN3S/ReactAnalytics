import React, {PureComponent} from 'react';
import {pushDataLayer} from 'lin3s-react-analytics';
import PropTypes from 'prop-types';

class ProductClick extends PureComponent {
  constructor(props) {
    super(props);

    this.handleProductClick = this.handleProductClick.bind(this);
  }

  handleProductClick() {
    const {productTransform, product, ...rest} = this.props;

    pushDataLayer(productTransform(product, {...rest}));
  }

  render() {
    const {component: Component, ...rest} = this.props;

    return (
      <div onClick={this.handleProductClick}><Component {...rest}/></div>
    );
  }
}

ProductClick.propTypes = {
  component: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  productTransform: PropTypes.func.isRequired,
};

export default ProductClick;
