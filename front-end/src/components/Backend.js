const backendUrl = 'https://localhost:5003';

const controllers = {
  abortController: null
};

const fetchOptions = {
  // mode: 'cors',
  headers: {
    "Content-Type": "application/json"
  },
  signal: controllers.abortController
};

const read = async function (domain, id) {
  if (!validateParam(domain)) {
    return;
  }

  let resource = `${domain}`;

  const hasId = validateParam(id);
  if (hasId) {
    resource += `/${id}`;
  }

  let json;
  try {
    const response = await sendRequest('GET', resource);
    json = await readJson(response);
  }
  catch (e) {
    const resourceInfoString = getResourceInfoString(domain, id);
    json = createErrorJson(`Cannot read data from ${resourceInfoString}.`);
  }

  return json;
};

const update = async function (domain, id, payload) {
  if (!validateParam(domain)) {
    return;
  }

  let resource = `${domain}`;

  const hasId = validateParam(id);
  if (hasId) {
    resource += `/${id}`;
  }

  if (!payload || !Object.keys(payload)?.length) {
    return;
  }

  const dotNetPatchRequestPayload = createDotNetPatchRequestPayload(payload);

  let json;
  try {
    const response = await sendRequest('PATCH', resource, dotNetPatchRequestPayload);
    json = await readJson(response);
  }
  catch (e) {
    const resourceInfoString = getResourceInfoString(domain, id);
    json = createErrorJson(`Cannot update ${resourceInfoString}.`);
  }

  return json;
};

const validateParam = function (param) {
  const isValid =
    param
    && param.toString() === param.toString().trim();

  return isValid;
};

const sendRequest = async function (
  method,
  resource,
  payload
) {
  if (!controllers.abortController) {
    controllers.abortController = new AbortController();
  }

  fetchOptions.method = method;

  fetchOptions.body = null;
  if (payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  const response = await fetch(
    backendUrl + `/${resource}`,
    fetchOptions
  );

  return response;
}

const readJson = async function (response) {
  let json;

  if (response.ok) {
    json = await response.json();
  }
  else {
    json = { error: 'Cannot read response.' };
  }

  return json;
};

const createErrorJson = function (errorMessage) {
  const json = {
    error: errorMessage
  };

  return json;
};

const getResourceInfoString = function (domain, id) {
  let resourceInfoString = domain;

  if (validateParam(id)) {
    resourceInfoString += ` with ID ${id}`;
  }

  return resourceInfoString;
};

const createDotNetPatchRequestElement = (propName, propValue) => {
  const output = {
    'op': 'replace',
    'path': `/${propName}`,
    'value': propValue
  };

  return output;
};

const createDotNetPatchRequestPayload = (payload) => {
  const output = [];

  Object.keys(payload).forEach((k) => {
    const element = createDotNetPatchRequestElement(k, payload[k]);
    output.push(element);
  });

  return output;
};

const abortRequest = function () {
  controllers.abortController.abort();
  // controllers.abortController = new AbortController();
  controllers.abortController = null;
}

export { read, update, abortRequest };
