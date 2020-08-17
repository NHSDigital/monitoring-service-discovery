entries = JSON.parse(context.getVariable("service.entries"));
services = Object.keys(entries);

aggregatedEndpoints = [];

for (var i = 0; i < services.length; ++i) {
  environments = Object.keys(entries[services[i]]);

  for (var j = 0; j < environments.length; ++j) {
    aggregatedEndpoints = aggregatedEndpoints.concat(entries[services[i]][environments[j]]);
  }
}

response = [
  {
    targets: aggregatedEndpoints
  }
];
context.setVariable("aggregatedEndpoints", JSON.stringify(response));
