import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      'InstrumentationKey=e059790f-7dd7-44b8-aa7a-c377433b053d;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/',
    enableAutoRouteTracking: true,
    extensions: [reactPlugin],
  },
});
appInsights.loadAppInsights();

export { reactPlugin, appInsights };
