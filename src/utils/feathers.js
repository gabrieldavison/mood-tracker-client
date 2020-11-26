import feathers from "@feathersjs/client";

const client = feathers();
// const restClient = feathers.rest("http://localhost:3030");
const restClient = feathers.rest(
  "https://intense-wildwood-87360.herokuapp.com"
);
client.configure(restClient.fetch(window.fetch));
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

export default client;
