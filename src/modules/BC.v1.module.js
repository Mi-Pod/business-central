const { getBC, patchBC, postBC, deleteBC, putBC } = require("../api/BC.api");
const { getAccessToken } = require("../config/OAuth");

// Items: Item Cards
exports.findItems = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `ItemCard`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};
exports.getItemByNumber = async (item_no, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `ItemCard(no='${item_no}')`,
  };
  try {
    let res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
};
exports.updateItemByNumber = async (item_no, data, etag = null, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `ItemCard(no='${item_no}')`,
  };
  try {
    if(!etag){
      const rec = await getBC(endpoint, {}, token);
      etag = rec["@odata.etag"];
    }
    let res = await putBC(endpoint, etag, data, token);
    return res;
  } catch (error) {
    return error;
  }
};
exports.getInvoiceByNumber = async (invoice_no, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesInvoice(No='${invoice_no}')`,
  };
  try {
    let res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
};
exports.getCustomerByNumber = async (customer_no, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `CustomerCard(No='${customer_no}')`,
  };
  try {
    let res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
};

// Items: Item Categories
exports.findItemCategories = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Item_Categories`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Items: Item References
exports.findItemReferenceEntries = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `ItemReferenceEntries`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Items: Item Attributes
exports.findItemAttributes = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `ItemAttributeMapping`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Items: Sales Prices
exports.findSalesPrices = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Sales_Prices`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Items: Quantity by Location
exports.findQuantities = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `WHSQtyOnHand`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Items: Assembly Bill-of-Materials (Assembly BOM)
exports.findAssemblyBom = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Assembly_BOM`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};
exports.findBomParents = async (item_no, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Assembly_BOM`,
  };
  const filter = {
    $filter: `No eq '${item_no}'`,
  };
  let record_set = new Set();

  try {
    let res = await getBC(endpoint, filter, token);
    for (let i = 0; i < res.value.length; i++) {
      record_set.add(res.value[i].Parent_Item_No);
    }

    return Array.from(record_set);
  } catch (error) {
    return error;
  }
};
exports.findBomChildren = async (item_no, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Assembly_BOM`,
  };
  const filter = {
    $filter: `Parent_Item_No eq '${item_no}'`,
  };

  let record_set = new Set();

  try {
    let res = await getBC(endpoint, filter, token);
    for (let i = 0; i < res.value.length; i++) {
      record_set.add(res.value[i].No);
    }
    return Array.from(record_set);
  } catch (error) {
    return error;
  }
};

// Customer Cards
exports.findCustomerCards = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `CustomerCard`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Customer: Shipping Addresses
exports.findCustomerShipmentAddresses = async (
  filter = { $top: 10 },
  token = null
) => {
  let endpoint = {
    api: "ODataV4",
    target: `CustShipmentAddresses`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Customer: Contacts
exports.findContacts = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Contacts`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Shopify: Products
exports.findShopifyProducts = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Products`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.createShopifyProduct = async (data, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Products`,
  };

  try {
    let res = await postBC(endpoint, data, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.getShopifyProduct = async (code, params = {}, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Products(Code='${code}')`,
  };

  try {
    let res = await getBC(endpoint, params, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.updateShopifyProduct = async (code, data, etag = null, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Products(Code='${code}')`,
  };

  try {
    if (!etag) {
      let rec = await getBC(endpoint, {}, token);
      etag = rec["@odata.etag"];
    }

    let res = await putBC(endpoint, etag, data, token);
    return res;
  } catch (error) {
    return error;
  }
};

// Shopify: Variants
exports.findShopifyVariants = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.createShopifyVariant = async (input, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items`,
  };
  try {
    let res = await postBC(endpoint, input, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.createOrUpdateShopifyVariant = async (
  item_no,
  price_group,
  input,
  token = null
) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items`,
  };
  const filter = {
    $filter: `Item_No eq '${item_no}' and Price_Group eq '${price_group}'`,
  };

  const existing = await getBC(endpoint, filter, token);
  if (existing.value.length > 0) {
    const etag = existing.value[0]["@odata.etag"];
    endpoint.target = `Shopify_Product_Variants_and_IV_Items(Item_No='${item_no}',Price_Group='${price_group}')`;
    const response = await patchBC(endpoint, etag, input, token);
    return response;
  } else {
    const response = await postBC(endpoint, input, token);
  }
};

exports.getShopifyVariant = async (item_no, price_group, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items(Item_No='${item_no}',Price_Group='${price_group}')`,
  };
  try {
    let res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.deleteShopifyVariant = async (
  item_no,
  price_group,
  etag = null,
  token = null
) => {
  if (!token) {
    token = await getAccessToken();
  }
  let endpoint = {
    api: "ODataV4",
    target: `Shopify_Product_Variants_and_IV_Items(Item_No='${item_no}',Price_Group='${price_group}')`,
  };
  try {
    if (!etag) {
      let variant = await getBC(endpoint, {}, token);
      etag = variant["@odata.etag"];
    }
    let res = await deleteBC(endpoint, etag, token);
    return res;
  } catch (error) {
    return error;
  }
};

// Sales Orders
exports.findSalesOrders = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `SalesOrder`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.updateSalesOrder = async (order_no, input, token = null, etag = null) => {
  try {
    if (!etag) {
      let filter = {
        $filter: `Document_Type eq 'Order' and No eq '${order_no}'`,
      };
      let orders = await exports.findSalesOrders(filter);
      if (orders.length === 1) {
        etag = orders[0]["@odata.etag"];
      } else if (orders.length === 0) {
        console.log(`No Orders Found`);
        return false;
      }
    }
    let endpoint = {
      api: "ODataV4",
      target: `SalesOrder(Document_Type='Order',No='${order_no}')`,
    };
    let res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
};
exports.findSalesLines = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `SalesLines`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Sales Shipments
exports.findPostedSalesShipments = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesShipment`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};
exports.findPostedSalesShipmentLines = async (
  filter = { $top: 10 },
  token = null
) => {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesShipmenLines`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// License Plates
exports.findLicensePlates = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `LicensePlates`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Sales Invoices
exports.findPostedSalesInvoices = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesInvoice`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};
exports.findPostedSalesInvoiceLines = async (
  filter = { $top: 10 },
  token = null
) => {
  let endpoint = {
    api: "ODataV4",
    target: `PostedSalesInvoiceLines`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Sales Document Queries - Order Sync
exports.findQuerySalesLines = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `QuerySalesLines`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};
exports.findSalesLineQuoteKeys = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `SalesLineQuoteKey`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.createSalesLineQuoteKey = async (input, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `SalesLineQuoteKey`,
  };
  try {
    let res = await postBC(endpoint, input, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.findSalesHeaderQuery = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `SalesHeaderQuery`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Zip Codes
exports.findZipCodes = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `Zip_Codes`,
  };
  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

// Avalara Transactions
exports.findAvalaraTransactions = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `AvalaraTransactions`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};
// Customer Licenses
exports.findCustomerLicenses = async (filter = { $top: 10 }, token = null) => {
  let endpoint = {
    api: "ODataV4",
    target: `CustomerLicenses`,
  };

  try {
    let res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.getSalesLineId = async (type, no, line_no) => {
  const filter = {
    $filter: `DocumentType eq '${type}' and DocumentNo eq '${no}' and LineNo eq ${line_no}`,
  };
  let response = await exports.findQuerySalesLines(filter);
  const system_id = response[0].SystemId;
  return system_id;
};


