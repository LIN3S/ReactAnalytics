const getCategoryForProduct = product => {
  return product.taxons && product.taxons.main ? product.taxons.main : '';
};

const getVariantPrice = product => {
  return (product.variants && product.variants.length > 0 && product.variants[0].price)
    ? ((product.variants[0].price.price || product.variants[0].price.current) / 100) : 0;
};

const transformActionField = (order, params) => ({
  id: order.tokenValue,
  affiliation: params.affiliation || 'Online Store',
  revenue: order.totals.total / 100,
  tax: order.totals.taxes / 100,
  shipping: order.totals.shipping / 100,
});

const transformProducts = (items, params) => items.map(item => ({
  name: item.product.name,
  id: item.product.code,
  variant: item.product.variants[0].code,
  price: (item.total / item.quantity) / 100,
  brand: item.brand || params.brand,
  category: getCategoryForProduct(item.product),
  quantity: item.quantity,
  ...item.customFields,
}));

const transformProductsForImpression = (products, params) => products.map((product, index) => ({
  name: product.name,
  id: product.code,
  category: getCategoryForProduct(product),
  brand: product.brand || params.brand,
  list: params.list,
  price: getVariantPrice(product),
  position: (params.initialIndex || 0) + index + 1,
  ...product.customFields,
}));

const transformProductsForCart = (items, params) => items.map(item => ({
  name: item.product.name,
  id: item.product.code,
  variant: item.product.variants[0].code,
  price: getVariantPrice(item.product),
  brand: item.product.brand || params.brand,
  category: getCategoryForProduct(item.product),
  quantity: item.quantity,
  ...item.customFields,
}));

const transformOrderForDL = (order, params = {}) => ({
  event: 'purchase',
  ecommerce: {
    purchase: {
      actionField: transformActionField(order, params),
      products: transformProducts(order.items, params),
    }
  }
});

const transformProductsForImpressionDL = (products, params = {}) => ({
  event: 'productImpressions',
  ecommerce: {
    currencyCode: params.currency || 'EUR',
    impressions: transformProductsForImpression(products, params),
  },
});

const transformProductForDetailDL = (product, params = {}) => ({
  event: 'productDetail',
  ecommerce: {
    detail: {
      products: [{
        name: product.name,
        id: product.code,
        price: getVariantPrice(product),
        category: getCategoryForProduct(product),
        brand: product.brand || params.brand,
        ...product.customFields,
      }]
    }
  }
});

const transformProductForClickDL = (product, params = {}) => ({
  event: 'productClick',
  ecommerce: {
    click: {
      actionField: {
        list: params.list,
      },
      products: [{
        name: product.name,
        id: product.code,
        price: getVariantPrice(product),
        category: getCategoryForProduct(product),
        position: params.position,
        ...product.customFields,
      }]
    }
  }
});

const transformCartItemsForCheckoutDL = (cartItems, params = {}) => ({
  event: 'checkout',
  ecommerce: {
    checkout: {
      actionField: {
        step: params.step || 1,
        ...params.customActionField,
      },
      products: transformProducts(cartItems, params),
    }
  }
});

const transformAddToCartDL = (products, params = {}) => ({
  event: 'addToCart',
  ecommerce: {
    currencyCode: params.currency || 'EUR',
    add: {
      products: transformProductsForCart(products, params),
    }
  }
});

const transformRemoveFromCartDL = (products, params = {}) => ({
  event: 'removeFromCart',
  ecommerce: {
    currencyCode: params.currency || 'EUR',
    add: {
      products: transformProductsForCart(products, params),
    }
  }
});

export {
  transformOrderForDL,
  transformProductsForImpressionDL,
  transformProductForDetailDL,
  transformProductForClickDL,
  transformCartItemsForCheckoutDL,
  transformAddToCartDL,
  transformRemoveFromCartDL,
};
