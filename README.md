# React Analytics LIN3S

React components and functions to help integrating Google Analytics and Google Tag Manager in a React application. 

## Installation

**Download the package:**

* Using npm

`$ npm install lin3s-react-analytics lin3s-react-analytics-enhanced-ecommerce lin3s-react-analytics-enhanced-ecommerce-sylius`

* Using yarn

`$ yarn add lin3s-react-analytics lin3s-react-analytics-enhanced-ecommerce lin3s-react-analytics-enhanced-ecommerce-sylius`

## Basic Data Layer Functions

### flush

`import {flush} from 'lin3s-react-analytics';`

### pushPageLoadDataLayer

`import {pushPageLoadDataLayer} from 'lin3s-react-analytics';`

### queueDataLayer

`import {queueDataLayer} from 'lin3s-react-analytics';`

### pushDataLayer

`import {pushDataLayer} from 'lin3s-react-analytics';`

## Enhanced Ecommerce (React Components)

### Checkout

```js
import {Checkout} from 'lin3s-react-analytics-enhanced-ecommerce';

const transformCartItemsForCheckoutDL = (items) => {
  //...
};
const cartItems = transformCartItemsForCheckoutDL(cart.items);

<Checkout checkout={cartItems}>
  <form>
  {/*...*/}
  </form>
</Checkout>
```

The list of checkout parameters, their type and default values are as follows:

| Parameter                                             | Type                  | Required  | Default value     |
|------------------------------------------------------ |:----------------------|:----------|:------------------|
| checkout                                              | object                | yes       | -                 |
| checkout.event                                        | string                | yes       | -                 |
| checkout.ecommerce                                    | object                | yes       | -                 |
| checkout.ecommerce.checkout                           | object                | yes       | -                 |
| checkout.ecommerce.checkout.actionField               | object                | yes       | -                 |
| checkout.ecommerce.checkout.actionField.step          | number                | yes       | -                 |
| checkout.ecommerce.checkout.products                  | array                 | yes       | -                 |
| checkout.ecommerce.checkout.products.brand            | string                | yes       | -                 |
| checkout.ecommerce.checkout.products.category         | string                | yes       | -                 |
| checkout.ecommerce.checkout.products.id               | string                | yes       | -                 |
| checkout.ecommerce.checkout.products.name             | string                | yes       | -                 |
| checkout.ecommerce.checkout.products.price            | number                | yes       | -                 |
| checkout.ecommerce.checkout.products.quantity         | number                | yes       | -                 |
| checkout.ecommerce.checkout.products.variant          | string                | yes       | -                 |
| children                                              | React Element         | yes       | -                 |

Checkout parameter example:
```json
{
   "event": "checkout",
   "ecommerce": {
      "checkout": {
         "actionField": {
            "step": 1
         },
         "products": [
            {
               "name": "Pretty Scarf",
               "id": "ps1234",
               "variant": "ps01234-red-l",
               "price": 19.95,
               "brand": "Lin3s Retail",
               "category": "women-accessories",
               "quantity": 1
            },
            {
               "name": "Long Socks",
               "id": "ls4321",
               "variant": "ls4321-black-m",
               "price": 4.98,
               "brand": "Lin3s Retail",
               "category": "men-underwear",
               "quantity": 3
            }
         ]
      }
   }
}
```

### Page

`import {Page} from 'lin3s-react-analytics-enhanced-ecommerce';`

### ProductDetail

`import {ProductDetail} from 'lin3s-react-analytics-enhanced-ecommerce';`

### ProductImpressions

`import {ProductImpressions} from 'lin3s-react-analytics-enhanced-ecommerce';`

### Purchase

`import {Purchase} from 'lin3s-react-analytics-enhanced-ecommerce';`

## Enhanced Ecommerce Sylius (transforms)

A group of functions to transform an object from Sylius (i.e. Product) to an structure accepted by Enhanced Ecommerce
React Components to send a Datalayer.

### transformOrderForDL

| Parameter                                          | Type                  | Required  | Default value     |
|--------------------------------------------------- |:----------------------|:----------|:------------------|
| order                                              | object                | yes       | -                 |
| order.tokenValue                                   | string                | yes       | -                 |
| order.totals                                       | object                | yes       | -                 |
| order.totals.total                                 | number                | yes       | -                 |
| order.totals.taxes                                 | number                | yes       | -                 |
| order.totals.shipping                              | number                | yes       | -                 |
| order.items                                        | array                 | yes       | -                 |
| order.items.brand                                  | string                | no        | params.brand      |
| order.items.total                                  | number                | yes       | -                 |
| order.items.quantity                               | number                | yes       | -                 |
| order.items.product                                | object                | yes       | -                 |
| order.items.product.name                           | string                | yes       | -                 |
| order.items.product.code                           | string                | yes       | -                 |
| order.items.product.taxons                         | object                | no        | -                 |
| order.items.product.taxons.main                    | string                | no        | ''                |
| order.items.product.variants                       | array                 | yes       | ''                |
| order.items.product.variants.code                  | string                | yes       | ''                |
| params                                             | object                | no        | {}                |
| params.affiliation                                 | string                | no        | 'Online Store'    |
| params.brand                                       | string                | no        | -                 |

Order parameter example:
```json
{
   "event": "purchase",
   "ecommerce": {
      "purchase": {
         "actionField": {
            "id": "abcfefgh-123a-456b-c789-jkl987654321",
            "affiliation": "Online Store",
            "revenue": 52.22,
            "tax": 7.33,
            "shipping": 10
         },
         "products": [
            {
               "name": "Pretty Scarf",
               "id": "ps1234",
               "variant": "ps01234-red-l",
               "price": 19.95,
               "brand": "Lin3s Retail",
               "category": "women-accessories",
               "quantity": 1
            },
            {
               "name": "Long Socks",
               "id": "ls4321",
               "variant": "ls4321-black-m",
               "price": 4.98,
               "brand": "Lin3s Retail",
               "category": "men-underwear",
               "quantity": 3
            }
         ]
      }
   }
}
```

### transformProductsForImpressionDL

### transformProductForDetailDL

### transformProductForClickDL

### transformCartItemsForCheckoutDL
