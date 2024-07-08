import axios from 'axios';

/**
 * This is a regular error logger that allows for printing error to the console
 * in development.
 * @param e Error
 */
export function ErrorLogger(e: Error) {
  // don't log in production
  if (!__DEV__) {
    return;
  }
  console.log('\n');
  console.log('*'.repeat(35));
  console.log('Error Type: ', e.name || 'Unknown Error Name');
  console.log('Message: ', e.message);
  if (e.stack) {
    console.log('*'.repeat(11) + ' Stack Trace ' + '*'.repeat(11));
    console.log(e.stack);
  }
  console.log('*'.repeat(35));
}

export function ApiErrorLogger(error: any) {
  if (!__DEV__) {
    return;
  }
  if (axios.isCancel(error)) {
    return;
  }
  console.log('\n');
  console.log('*'.repeat(35));
  console.log('*'.repeat(11), ' API ERROR ', '*'.repeat(11));
  console.log('*'.repeat(35));
  console.log('Base URL:', error.config.baseURL);
  console.log('Method:', error.config.method || 'N/A');
  console.log('Endpoint:', error.config.url);
  console.log('Headers:', error.config.headers || 'N/A');
  console.log('Status:', error.response?.status || 'N/A');
  console.log('Message:', error.message || 'N/A');
  console.log('API Response Data: ', error.response?.data);
  console.log('API Response Message: ', error.response?.data.message);
  console.log('Params:', error.config.params || 'N/A');
  console.log('Data:', error.config.data || 'N/A');
  console.log('*'.repeat(35));
}
