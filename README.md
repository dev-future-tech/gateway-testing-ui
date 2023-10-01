# Gateway Testing UI

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

# Scenerio 1 - Basic Pproduct Listing

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

