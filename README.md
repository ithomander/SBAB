# The top 10 bus lines in Stockholm

## Description

This project is a smallscale fullstack application that finds out which bus lines in Stockholm have the most bus stops on their routes and shows the top ten. The application shows the name of the bus line as well as the name for all the bus stops. This application is using data retrieved from [Trafiklab’s](https://www.trafiklab.se/) open API.

The application is using React.js, JavaScript and Bootstrap in the frontend. In the backend the application is using Node.js and Express.js.

Further improvement of the application would include testing in backend, setting up tests in CI/CD, displaying error better and styling in frontend.

## Requirements

- Node
- API key to Trafiklab’s open API ["SL Hållplatser och Linjer 2"](https://www.trafiklab.se/api/sl-hallplatser-och-linjer-2)

## Set up

Install dependencies:\

1. In root directory run `npm install`\
2. In client, run `npm install`\
3. In server run `npm install`\

Get API key: Follow instructions on Trafiklab's webiste [here](https://www.trafiklab.se/docs/using-trafiklab/getting-api-keys/). You will need to create an account, create a new project and select the API "SL Hållplatser och Linjer 2". Add the API key to your project by adding inserting you key into the variable `API_KEY` in `server/index.js`.

## Getting started

From the root directory\
To run both client and server simultaneously: `npm run dev`\
To run only the server: `npm run server`\
To run only the client: `npm run client`\
Open [http://localhost:3000/api](http://localhost:3000/api) to view it in your browser.

## Testing

For testing [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is used. Where Jest is the test runner and React Testing Library is a Testing Library built for React that uses Jest as its test runner.

To run tests in frontend, navigate to client folder and run the following command, which will start Jest in watch mode\
`npm test`
