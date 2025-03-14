payload = JSON.parse(context.getVariable("request.content"));

rawEntries = context.getVariable("service.entries") || {};
entries = JSON.parse(rawEntries);

serviceNames = Object.keys(payload);

serviceNames.forEach(function (serviceName) {
  environments = Object.keys(payload[serviceName]);

  if (entries[serviceName]) {
    environments.forEach(function (env) {
      dbEndpoints = entries[serviceName][env]
      endpointsToDelete = payload[serviceName][env]
      if (dbEndpoints) {
        endpointsToDelete.forEach(function (endpointToDelete) {
          index = dbEndpoints.indexOf(endpointToDelete);
          if (index !== -1) {
            dbEndpoints.splice(index, 1);
          }
        });
      }
    });
  }
});
context.setVariable("service.entries", JSON.stringify(entries));