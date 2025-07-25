# Business Central

## Info

**Required Environment Variables:**

```bash
BC_ENVIRONMENT= # Name of Environment (Production or Sandbox)
BC_TENANT= # Microsoft Tenant ID
BC_COMPANY= # Microsoft Company ID
OAUTH_CLIENT= # Registered OAuth Client ID
OAUTH_SECRET= # Valid OAuth Client Secrent
```

**Import with:**

```js
const { getAccessToken, Connection, BCv2, BC } = require("businesscentral");
```

**Example usage:**

```js
const { BC } = require("businesscentral");

async function generateInventoryByCategory(category) {
  let inventory_report = [];

  const items = await BC.findItems({
    $filter: `Item_Category_Code eq '${category}'`,
  });
  for (let i = 0; i < items.length; i++) {
    const inventory = await inventoryPerItem(items[i]);
    inventory_report.push(inventory);
  }

  console.log(`Inventory Report:`, inventory_report);
  return inventory_report;
}

async function inventoryPerItem(item) {
  let available_to_sell = 0;

  let {
    No,
    Description,
    Qty_on_Sales_Order,
    Qty_on_Asm_Component,
    Blocked,
    Inventory,
  } = item;

  available_to_sell = Inventory - (Qty_on_Sales_Order + Qty_on_Asm_Component);
  if (Blocked || available_to_sell < 0) {
    available_to_sell = 0;
  }

  return {
    Item_No: No,
    Description,
    available_to_sell,
  };
}

generateInventoryByCategory("CMP: BAT: SWO");
```

## Methods

| Method                           | Route                                            | Module      | Read | Create | Update | Delete |
| -------------------------------- | ------------------------------------------------ | ----------- | :--: | :----: | :----: | :----: |
| Customers                        | `v2.0/customers`                                 | v2.0 API    |  ✅  |   ✅   |   ✅   |   ✅   |
| Customers with Financial Detail  | `v2.0/customers?$expand=customerFinancialDetail` | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Customer Map                     | `Silverware/apiGroup/v1.0/shopifyCustomerMaps`   | v2.0 API    |  ✅  |   ✅   |   ❌   |   ❌   |
| Items                            | `v2.0/items`                                     | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Item Categories                  | `v2.0/itemCategories`                            | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Sales Orders                     | `v2.0/salesOrders`                               | v2.0 API    |  ✅  |   ✅   |   ✅   |   ❌   |
| Sales Order Lines                | `v2.0/salesOrderLines`                           | v2.0 API    |  ✅  |   ✅   |   ✅   |   ❌   |
| Sales Invoices                   | `v2.0/salesInvoices`                             | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Sales Invoice Lines              | `v2.0/salesInvoiceLines`                         | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Purchase Orders                  | `v2.0/purchaseOrders`                            | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Purchase Order Lines             | `v2.0/purchaseOrderLines`                        | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Sales Shipments                  | `v2.0/salesShipments`                            | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Sales Shipment Lines             | `v2.0/salesShipmentLines`                        | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Vendors                          | `v2.0/vendors`                                   | v2.0 API    |  ✅  |   ❌   |   ❌   |   ❌   |
| Customer Card                    | `CustomerCard`                                   | Web Service |  ✅  |   ❌   |   ✅   |   ❌   |
| Item Cards                       | `ItemCard`                                       | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Quantity on Hand                 | `WHSQtyOnHand`                                   | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Sales Orders                     | `SalesOrder`                                     | Web Service |  ✅  |   ✅   |   ✅   |   ❌   |
| Sales Lines                      | `SalesLines`                                     | Web Service |  ✅  |   ✅   |   ✅   |   ❌   |
| License Plates                   | `LicensePlates`                                  | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Item Categories                  | `Item_Categories`                                | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Shopify Products                 | `Shopify_Products`                               | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Shopify Variants                 | `Shopify_Product_Variants_and_IV_Items`          | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Item References                  | `ItemReferenceEntries`                           | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Sales Prices                     | `Sales_Prices`                                   | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Item Attributes                  | `ItemAttributeMapping`                           | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Posted Sales Shipments           | `PostedSalesShipment`                            | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Posted Sales Shipment Lines      | `PostedSalesShipmenLines`                        | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Posted Sales Invoices            | `PostedSalesInvoice`                             | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Posted Sales Invoice Lines       | `PostedSalesInvoiceLines`                        | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Zip Codes                        | `Zip_Codes`                                      | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Assembly Item: Bill of Materials | `Assembly_BOM`                                   | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Avalara Transactions             | `AvalaraTransactions`                            | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Customer Shipment Addresses      | `CustShipmentAddresses`                          | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Contacts                         | `Contacts`                                       | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Query: Sales Lines               | `QuerySalesLines`                                | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Query: Sales Line Quote Key      | `SalesLineQuoteKey`                              | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |
| Query: Sales Header              | `SalesHeaderQuery`                               | Web Service |  ✅  |   ❌   |   ❌   |   ❌   |

## Updates

### v0.3.0 - Automated NPM Releases

### v0.0.7 - Shopify Variants
- **Added Methods:**
  - get Shopify Variant (WS)
  - create Shopify Variant (WS)
  - delete Shopify Variant (WS)

### v0.0.6 - Sales Quotes and Assembly Items
- **Added Methods:**
  - get Sales Quotes (v2)
  - get one Sales Quote (v2)
  - Create Sales Quote (v2)
  - Update Sales Quote (v2)
  - get Sales Quote Lines (v2)
  - get one Sales Quote Line (v2)
  - Create Sales Quote Line (v2)
  - Update Sales Quote Line (v2)


### v0.0.5 - Minor Updates

### v0.0.4 - Create & Update Methods (v2 & web services)

- **Changed Method(s):**

  - (WS) old: `getItems()` => new: `findItems()`
  - validate() => Connection.validate()

- **Added GET Methods for:**

  - (WS) Zip Codes
  - (WS) Assembly Item: Bill of Materials
  - (WS) Avalara Transactions
  - (WS) Customer Shipment Addresses
  - (WS) Contacts

- **Added Method(s):**
  - [x] updateSO (WS)
  - [x] createCustomer (bcv2)
  - [x] updateCustomer (bcv2)
  - [x] createShipToAddress (bcv2)
  - [x] updateCustomerCard (bcv2)
  - [x] createMapRecord (bcv2)
  - [x] createDMSRecord (bcv2)
  - [x] patchSalesLine (bcv2)
  - [x] patchSalesOrder (bcv2)
  - [x] createSalesOrder (bcv2)
  - [x] updateSalesLine (bcv2)
  - [x] updateSalesOrderLines (bcv2)
  - [x] updateSalesHeader (bcv2)
  - [x] openOrder (bcv2)
  - [x] releaseOrder (bcv2)

### v0.0.3 - Improved Validation, Expanded Endpoints for BC Web Services

**Added Feature(s):**

- `Validate()` uses 3 isolated functions to test connectivity, all exported from the validation file
- Installed `axios` for Web Services

**Added Web Service Endpoints for:**

- Item Cards (getItems)
- Quantity by Location (findQuantities)
- Sales Orders (SalesOrder)
- License Plates (findLicensePlates)
- Item Categories (findItemCategories)
- Shopify Products (findShopifyProducts)
- Shopify Variants (findShopifyVariants)
- Item References (findItemReferenceEntries)
- Sales Prices (findSalesPrices)
- Item Attributes (findItemAttributes)
- Posted Sales Shipments (findPostedSalesShipments)
- Posted Sales Shipment Lines (findPostedSalesShipmentLines)
- Customer Cards (findCustomerCards)
- Posted Sales Invoices (findPostedSalesInvoices)
- Posted Sales Invoice Lines (findPostedSalesInvoiceLines)
- Query: Sales Lines (findQuerySalesLines)
- Query: Sales Line Quote Key (findSalesLineQuoteKeys)
- Query: Sales Header (findSalesHeaderQuery)

### v0.0.2 - Completed Validation, Init Web Service Connectivity

**Added Feature(s):**

- Test connection with BC Web Services & V2 API, and Microsoft OAuth Token
- Initial BC Web Services connection (Item Cards)

### v0.0.1 - OAuth Token Credentials

**Added Feature(s):**

- Register OAuth Tokens with Microsoft Web Services
