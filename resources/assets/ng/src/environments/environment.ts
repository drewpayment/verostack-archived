// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  rootUrl: 'http://verostack',
  apiUrl: 'http://verostack/',
  graphql: 'http://verostack/graphql',
  defaultTitle: 'Payment Dyanmics',
  headless: '5764D6B5E7A5575B22201D646C5695ECB6AEF498A467B01D4D2167637D8F81A1',
  // Geocoding API Key
  geocodingApi: 'AIzaSyACQIjgGrlpl1-DtmI6CP6-6_7qrtx_rh0',
  // Geocoding API URL 
  geocoding: 'https://maps.googleapis.com/maps/api/geocode/json?address='
};
