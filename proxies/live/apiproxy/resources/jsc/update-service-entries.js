payload = JSON.parse(context.getVariable("request.content"));
rawEntries = context.getVariable("service.entries") || {};

entries = JSON.parse(rawEntries);

serviceName = Object.keys(payload)[0];
env = Object.keys(payload[serviceName])[0];

if (!entries[serviceName]) {
  Object.assign(entries, payload);

} else {
  serviceEndpoints = entries[serviceName][env];
  endpointEntries = payload[serviceName][env];
  endpoints = serviceEndpoints.concat(endpointEntries)
  // Remove duplicates
  endpoints = endpoints.filter((item, pos) => endpoints.indexOf(item) === pos)
  entries[serviceName][env] = endpoints
}

context.setVariable("service.entries", JSON.stringify(entries));
