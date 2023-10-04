# Gateway Testing UI

![example workflow](https://github.com/dev-future-tech/gateway-testing-ui/actions/workflows/node.js.yml/badge.svg)


This application is designed to test out how Spring Cloud Gateway works. There have been some strange goings on and tyhis project will cover different scnenarios to determine how it works and how to approach the gateway when:

* Security is required
* CORS is required
* Different types of filters are used

The premise is that we integrate this UI with spring gateway to simulate production scenarios and prove out how to approach the models while also exploring other options (e.g. AWS API Gateway, WAFs, etc)

# Back end services

As we build out the system the backend will be developed using Spring specific technologies. Other technologies will eventually be explored.

Potential name for this compendium? Spring Cloud Recipes.

# Let's get Started

## Create the Backing Services

2 main APIs will be implemented:

* Product API
  * Lists products that are available
  * Basic metadata includes:
    * Product Name
    * Product SKU
    * Product Description
    * Product Price
* Cart API
    * A representation of a cart that contains products from the Product API
    * Links to a User account that is temporarily managed by the Cart API

# Scenerio 1 - Basic Product Listing

THis scenario will allow the gateway to proxy requests to the product API to get a list of products.

* No auth will be included.
* Gateway will just proxy requests

## Endpoints
* `GET /product`
  * List all products
* `GET /product/{productId}`
  * Get a single product

## UI Components
* `ProductComponent`
  * Renders the metadata - either as a block or single product panel.

## Building out the Product API

We've created a WebFlux project that has 3 main characteristics:

1. ProductController with the defined Endpoints returning static data
2. CorsGlobalConfiguration that serves up the CORS capabilities
3. Unit tests that:
    * Test the main endpoints
    * Performs a CORS request against the `/product/v1` endpoint

The results of the CORS tests currently run successfully given the global cors configuration:

```
> OPTIONS http://localhost:8090/product/v1
> WebTestClient-Request-Id: [1]
> Origin: [http://localhost:4200]
> Host: [localhost:4200]
> Access-Control-Request-Method: [GET]
> Access-Control-Request-Headers: [authorization]

No content

< 200 OK OK
< Vary: [Origin, Access-Control-Request-Method, Access-Control-Request-Headers]
< Access-Control-Allow-Origin: [http://localhost:4200]
< Access-Control-Allow-Methods: [GET]
< Access-Control-Allow-Headers: [authorization]

0 bytes of content (unknown content-type).
```

This, of course, doesn't mean our UI testing will produce the same results, however, we do hope it aligns.

## Building the User Interface

From our untouched, provisioned angular app we will create:
* a new ProductComponent
* a new ProductService

```bash
$ ng g component product
CREATE src/app/product/product.component.scss (0 bytes)
CREATE src/app/product/product.component.html (22 bytes)
CREATE src/app/product/product.component.spec.ts (566 bytes)
CREATE src/app/product/product.component.ts (207 bytes)
UPDATE src/app/app.module.ts (479 bytes)
$ ng g service product
CREATE src/app/product.service.spec.ts (362 bytes)
CREATE src/app/product.service.ts (136 bytes)
$
```

First we will introduce our `HttpClient` to the `ProductService`:

```typescript
export class ProductService {
  constructor(private http: HttpClient) { }
}
```

We do't have a Schema.org library as yet (which we currently rely on for the domain) so let's create our representations:

```typescript
type ObjectAttribute = {
    value: string;
    fullTypeName: string;
};

export type Product = {
    brandList: ObjectAttribute[];
    skuList: ObjectAttribute[];
    productIDList: ObjectAttribute[];
    weightList: ObjectAttribute[];
    fullTypeName: string;
    imageList: ObjectAttribute[];
};
```
