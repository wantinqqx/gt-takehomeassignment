# Traffic Cam & Weather Forecast App
A simple ReactJS application to display traffic conditions in Singapore along with its relative 2 hour weather forecast data in that selected area, based on the specified date and time inputted.

# Getting Started
 * Ensure that Node.js has been installed
 * Clone the repository
 * In the .env file (./.env), replace '<REACT_APP_API_KEY_HERE>' with your Google Reverse Geocode API key under REACT_APP_API_KEY and save the file.
 * To run the project, type 'npm start' on your terminal. The project will be run locally on your browser.

# Endpoints used

Traffic camera: https://api.data.gov.sg/v1/transport/traffic-images

Weather forecast: https://api.data.gov.sg/v1/environment/2-hour-weather-forecast

Google Reverse Geocode: https://maps.googleapis.com/maps/api/geocode/json 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

