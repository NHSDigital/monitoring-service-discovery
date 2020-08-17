payload = JSON.parse(context.getVariable("request.content"));
rawEntries = context.getVariable("service.entries") || {};

entries = JSON.parse(rawEntries);

serviceName = Object.keys(payload)[0];

if (!entries[serviceName]) {
  Object.assign(entries, payload);

} else {
  serviceEntries = entries[serviceName];
  envEntries = payload[serviceName];

  Object.assign(serviceEntries, envEntries);
}

context.setVariable("service.entries", JSON.stringify(entries));
