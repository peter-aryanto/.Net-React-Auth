const backendUrl = 'https://localhost:5003';

const controllers = {
  abortController: null
};

const fetchOptions = {
  mode: 'cors',
  // headers: {
  //   'ContentType': 'application/json'
  // }
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
    setupAbortController();
    const response = await fetch(backendUrl + `/${resource}`, fetchOptions);

    json = await readJson(response);
  }
  catch (e) {
    const resourceInfoString = getResourceInfoString(domain, id);
    json = createErrorJson(`Cannot read data from ${resourceInfoString}.`);
  }

  return json;
};

const validateParam = function (param) {
  const isValid =
    param
    && param.toString() === param.toString().trim();

  return isValid;
};

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

const setupAbortController = function () {
  controllers.abortController = new AbortController();
  return controllers.abortController;
};

const abortRequest = function () {
  controllers.abortController.abort();
}

export { read, abortRequest };
