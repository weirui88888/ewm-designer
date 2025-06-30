import TrackingSDK from 'tracking-sdk';

const SDKInstance = new TrackingSDK('ewm-designer');

SDKInstance.init({
  serverUrl: 'https://api.example.com/track',
  batchSize: 5,
  batchInterval: 5000,
});

export default SDKInstance;
