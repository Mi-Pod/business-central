const { getBC, patchBC, postBC, deleteBC, putBC } = require("../api/BC.api");
const { getAccessToken } = require("../config/OAuth");

// Endpoint Exploration

exports.getEndpoints = async (api) => {
  const endpoint = {
    api,
  };
  const endpoints = await getBC(endpoint);
  return endpoints.value;
};

exports.listAllEndpoints = async () => {
  const apis = [
    "Silverware/apiGroup/v1.0",
    "Silverware/SmartConnectQueries/v1.0",
    "v2.0",
  ];
  for (let api of apis) {
    console.log(`== API: ${api} ==`);
    const endpoints = await exports.getEndpoints(api);
    for (let i = 0; i < endpoints.length; i++) {
      const { name, kind, url } = endpoints[i];
      console.log(`(${kind}) ${name}: ${url}`);
    }
  }
};

// Purchase Receipts
exports.getPurchaseReceipts = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "purchaseReceipts",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};


exports.getPurchaseReceiptById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `purchaseReceipts(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}

exports.getPurchaseReceiptLinesById = async (id, params = {}, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `purchaseReceipts(${id})/purchaseReceiptLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
}
// salespeoplePurchasers
exports.getSalespeoplePurchasers = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "salespeoplePurchasers",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getSalespersonById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salespeoplePurchasers(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res.value;
};


// Customers

exports.getCustomers = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "customers",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.createCustomer = async (input, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "customers",
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res;
  } catch (err) {
    return err;
  }
};

exports.updateCustomer = async (customer_id, input, etag, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `customers(${customer_id})`,
  };
  try {
    const res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.updateCustomerCard = async (customer_no, input, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `customers(no='${customer_no}')`,
  };
  const customer = await getBC(endpoint, {}, token);
  let etag = customer["@odata.etag"];

  try {
    const res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.getCustomersWithFinancialDetail = async (
  params = { $top: 10 },
  token = null
) => {
  const endpoint = {
    api: "v2.0",
    target: "customers?$expand=customerFinancialDetail",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getCustomerByIdWithFinancialDetail = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `customers(${id})?$expand=customerFinancialDetail`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getCustomerById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `customers(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.deleteCustomerById = async (id, etag, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `customers(${id})`,
  };
  const res = await deleteBC(endpoint, etag, token);
  return res;
};

exports.getCustomerMaps = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "shopifyCustomerMaps",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.createCustomerMap = async (input, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "shopifyCustomerMaps",
  };
  const res = await postBC(endpoint, input, token);
  return res;
};

exports.createDmsRecord = async (input, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "dmsCustomerOptions",
  };
  const res = await postBC(endpoint, input, token);
  return res.data;
};

exports.createShipToAddress = async (input, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "shipToAddresses",
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
};

exports.updateShipToAddress = async (customer_no, code, input, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `shipToAddresses(${customer_no},${code})`,
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
};

// Items

exports.getItems = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "items",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getItemCategories = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "itemCategories",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

// Sales Orders

exports.getSalesOrders = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "salesOrders",
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.patchSalesOrder = async (system_id, input, etag = null, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesOrders(${system_id})`,
  };
  if (!etag) {
    const sales_order = await exports.getSalesOrderById(system_id, token);
    etag = sales_order["@odata.etag"];
  }
  try {
    const res = await patchBC(endpoint, etag, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
};

exports.getSalesOrderById = async (id, token = null, params = {}) => {
  const endpoint = {
    api: "v2.0",
    target: `salesOrders(${id})`,
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.getSalesHeaders = async (filter = {}, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `salesHeaders`,
  };
  try {
    const res = await getBC(endpoint, filter, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.updateSalesOrderHeader = async (
  order_no,
  token = null,
  etag = null,
  input
) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `salesHeaders(documentType='Order',no='${order_no}')`,
  };
  try {
    if (!etag) {
      const sales_header = await getBC(endpoint, {}, token);
      etag = sales_header["@odata.etag"];
    }

    const res = await patchBC(endpoint, etag, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
};

exports.createSalesOrder = async (input) => {
  const token = await getAccessToken();
  const endpoint = {
    api: "v2.0",
    target: "salesOrders",
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.openOrder = async (order_no) => {
  const token = await getAccessToken();
  const filter = {
    $filter: `no eq '${order_no}'`,
  };
  const sales_headers = await exports.getSalesHeaders(filter, token);
  let etag = null;
  if (sales_headers.data && sales_headers.data.length > 0) {
    etag = sales_headers[0]["@odata.etag"];
  }
  const inputs = [
    {
      swcSVReleaseOrder: true,
    },
    {
      swcSVReleaseOrder: false,
    },
  ];
  for (let i = 0; i < inputs.length; i++) {
    await exports.updateSalesOrderHeader(order_no, token, etag, inputs[i]);
    var delayInMilliseconds = 3000; //1 second

    setTimeout(function () {
      //your code to be executed after 1 second
    }, delayInMilliseconds);
  }
};

exports.releaseOrder = async (order_no) => {
  const token = await getAccessToken();
  const filter = {
    $filter: `no eq '${order_no}'`,
  };
  const sales_headers = await exports.getSalesHeaders(filter, token);

  let etag = null;
  if (sales_headers && sales_headers.length > 0) {
    etag = sales_headers[0]["@odata.etag"];
  }
  const inputs = [
    {
      swcSVIGENCalced: true,
      swcSVReleaseOrder: true,
    },
  ];
  for (let i = 0; i < inputs.length; i++) {
    await exports.updateSalesOrderHeader(order_no, token, etag, inputs[i]);
    var delayInMilliseconds = 3000; //1 second

    setTimeout(function () {
      //your code to be executed after 1 second
    }, delayInMilliseconds);
  }
};

exports.getSalesLines = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "salesOrderLines",
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.getSalesLinesByOrderId = async (id, token = null, params = { $top: 10 }) => {
  const endpoint = {
    api: "v2.0",
    target: `salesOrders(${id})/salesOrderLines`,
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res.value;
  } catch (error) {
    return error;
  }
};

exports.getSalesLineById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesOrderLines(${id})`,
  };
  try {
    const res = await getBC(endpoint, {}, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.deleteSalesOrderLine = async (id, etag, token = null) => {
  const endpoint = {
    name: "v2.0",
    endpoint: `salesOrderLines(${id})`,
  };
  try {
    await deleteBC(endpoint, etag, token);
    return true;
  } catch (error) {
    return false;
  }
};

exports.deleteSalesOrder = async (id, etag, token = null) => {
  const endpoint = {
    name: "v2.0",
    endpoint: `salesOrders(${id})`,
  };
  try {
    await deleteBC(endpoint, etag, token);
    return true;
  } catch (error) {
    return false;
  }
};

exports.createSalesOrderLine = async (input, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesOrderLines`,
  };
  try {
    const res = await postBC(endpoint, input, token);
    return res.data;
  } catch (error) {
    return error;
  }
};

exports.updateSalesLine = async (line_id, input, etag, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesOrderLines(${line_id})`,
  };
  if (!etag) {
    const sales_line = await getBC(endpoint, {}, token);
    etag = sales_line["@odata.etag"];
  }
  try {
    const res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
};

exports.updateSalesOrderLine = async (order_no, line_no, input, token = null) => {
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: `salesLines(documentType='Order',documentNo='${order_no}',lineNo=${line_no})`,
  };

  const salesLine = await getBC(endpoint, {}, token);
  let etag = salesLine["@odata.etag"];
  try {
    const res = await putBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
};

// Sales Invoices

exports.getSalesInvoices = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "salesInvoices",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getSalesInvoiceById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesInvoices(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getSalesInvoiceLinesById = async (
  id,
  token = null,
  params = { $top: 10 }
) => {
  const endpoint = {
    api: "v2.0",
    target: `salesInvoices(${id})/salesInvoiceLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getSalesInvoiceLineById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesInvoiceLines(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

// Sales Quotes

exports.getSalesQuotes = async (params = {}, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes`,
  };
  const res = await getBC(endpoint, params, token);

  return res.value;
};

exports.getSalesQuoteById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${id})`,
  };
  const res = await getBC(endpoint, params, token);

  return res;
};

exports.createSalesQuote = async (input, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes`,
  };
  const res = await postBC(endpoint, input, token);

  return res;
};

exports.updateSalesQuote = async (id, etag, input, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${id})`,
  };
  const res = await patchBC(endpoint, etag, input, token);

  return res;
};

// Sales Quote Lines

exports.getSalesQuoteLinesBySalesQuoteId = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${id})/salesQuoteLines`,
  };
  const res = await getBC(endpoint, {}, token);
  return res.value;
};

exports.getSalesQuoteLineById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuoteLines(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.createSalesQuoteLine = async (input, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuoteLines`,
  };
  const res = await postBC(endpoint, input, token);
  return res;
};

exports.createSalesQuoteLineBySalesQuoteId = async (
  system_id,
  input,
  token = null
) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${system_id})/salesQuoteLines`,
  };
  const res = await postBC(endpoint, input, token);
  return res;
};

exports.updateSalesQuoteLine = async (id, etag, input, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuoteLines(${id})`,
  };
  const res = await patchBC(endpoint, etag, input, token);
  return res;
};

// Purchase Orders and Receipts

exports.getPurchaseOrders = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "purchaseOrders",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getPurchaseOrderById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `purchaseOrders(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getPurchaseOrderLinesById = async (
  id,
  token = null,
  params = { $top: 10 }
) => {
  const endpoint = {
    api: "v2.0",
    target: `purchaseOrders(${id})/purchaseOrderLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

// Shipments
exports.getSalesShipments = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "salesShipments",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};
exports.getSalesShipmentById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesShipments(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};
exports.getSalesShipmentLines = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesShipmentLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};
exports.getSalesShipmentLinesById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesShipments(${id})/salesShipmentLines`,
  };
  const res = await getBC(endpoint, {}, token);
  return res.value;
};

// Vendors
exports.getVendors = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "vendors",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getSalesCreditMemos = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "salesCreditMemos",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getSalesCreditMemoById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesCreditMemos(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getSalesCreditMemoLinesByDocumentId = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesCreditMemos(${id})/salesCreditMemoLines`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};
exports.getSalesCreditMemoLines = async (params = {$top: 10}, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesCreditMemoLines`,
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

exports.getVendorById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `vendors(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getPdfSalesInvoiceById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesInvoices(${id})/pdfDocument`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getPdfQuoteById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesQuotes(${id})/pdfDocument`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getPdfCreditMemoById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `salesCreditMemos(${id})/pdfDocument`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getPdfPurchaseInvoiceById = async (id, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `purchaseInvoices(${id})/pdfDocument`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
};

exports.getCustomerByNo = async (customer_no, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: `customers`,
  };
  const params = {
    $filter: `number eq '${customer_no}'`,
  };
  try {
    const res = await getBC(endpoint, params, token);
    return res.value[0];
  } catch (error) {
    console.error(`Error getting customer:`, error.message.red);
    return null;
  }
};


