payload = JSON.parse(context.getVariable("request.content"));

rawEntries = context.getVariable("service.entries") || {};
entries = JSON.parse(rawEntries);

serviceNames = Object.keys(payload);

serviceNames.forEach(function (serviceName) {
  environments = Object.keys(serviceName);

  if (serviceName) {
    environments.forEach(function (env) {
      dbEndpoints = entries[serviceName][env]
      if (dbEndpoints) {
        env.forEach(function (endpointToDelete) {
          index = dbEndpoints.indexOf(endpointToDelete);
          if (index !== -1) {
            dbEndpoints.splice(index, 1);
          }
        });
      }
    });
  }
});

if (!entries[serviceName]) {
  dbServiceName = entries[serviceName];

  environments = Object.keys(dbServiceName);

  endpointsToDelete = [];
  environments.forEach(function (env) {
    endpointsToDelete.concat(environments[env]);
  })

  Object.assign(entries, payload);

} else {
  serviceEntries = entries[serviceName];
  envEntries = payload[serviceName];

  Object.assign(serviceEntries, envEntries);
}
