# BC Function Templates


### POST BC `Create one`

```JS

exports.createData = async (input, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "data",
  };
  const res = await postBC(endpoint, input, token);
  return res;
};

```

### GET BC `Find many`

```JS

exports.getData = async (params = { $top: 10 }, token = null) => {
  const endpoint = {
    api: "v2.0",
    target: "data",
  };
  const res = await getBC(endpoint, params, token);
  return res.value;
};

```

### GET BC `Find one`

```JS

exports.getOneData = async (primaryKey, token = null) => {
  const params = {
    $filter: `primaryKey eq '${primaryKey}'`
  };

  const endpoint = {
    api: "v2.0",
    target: "data",
  };
  const res = await getBC(endpoint, params, token);
  if(res.value.length !== 1){
    throw new Error("Invalid query");
  }

  return res.value[0];
};

```

### GET BC `Get one by id`

```JS
async function getDataById(id, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `data(${id})`,
  };
  const res = await getBC(endpoint, {}, token);
  return res;
}

```

### PATCH BC `Update one`

```JS
async function updateCustomer(id, input, etag, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `customers(${id})`,
  };
  try {
    if(!etag){
        const data = await getBC(endpoint, {}, token);
        etag = data["@odata.etag"];
    }
    const res = await patchBC(endpoint, etag, input, token);
    return res;
  } catch (error) {
    return error;
  }
}


```

### DELETE BC `Delete one`

```JS
async function deleteDataById(id, etag, token = null) {
  const endpoint = {
    api: "v2.0",
    target: `data(${id})`,
  };
  const res = await deleteBC(endpoint, etag, token);
  return res;
}
```


