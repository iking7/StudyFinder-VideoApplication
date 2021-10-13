# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Project Description:

# StudyFinder-VideoApplication
End-to-end encryption in video conferences has recently become more paramount than it ever has been. With the surge of COVID-19 cases, video conferencing is being utilized across the world as a means of safe and contact-free communication. Without proper end-to-end encryption, hackers can hijack calls and eavesdrop on sensitive information. Particularly in research and in the medical field, it is important that participants’ and patients’ information is kept safe. The focus of our project is to lay the foundation for safe video calling.

The longterm goal is to create a more secure video conference platform for medical professionals to conduct check-ups, meetings, or research with patients/participants who are at home. For people who do not have easy access to transportation and for people living in high risk COVID areas, individuals need an accessible way to communicate. Additionally, client information can be used by outsiders to harm the patients/participants in numerous ways, and there aren’t any specialized video tools that benefit researchers and medical professionals.

This application is built using react.js for the interface design, 
WebRTC API to exchange real-time audio and video in the browser
through simple-peer.js for peer to peer (p2p) connections, and node
.js's express.js for the server.

# Backend Dependencies list:
Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading of resources.
express.js to start server
nodemon to refresh server when changes are made
socket.io used for real-time data connection (client and server side)
simple-peer.js for p2p connections
Material UI for front-end design enhancements (unnecessary)
react copy to clipboard to copy elements to clipboard
jquery for user input

# File Information:
/Package.json - lists out dependencies and requirements to run the application

/index.js - server file built with node and socket.io

/client/src/index.js - Main React file used to start the react app
file.

/client/src/App.js - Launches the application and loads library
content.

/client/src/components/VideoPlayer.js - Sets up the UI for the video
player, chat, and buttons.

/client/src/SocketContext.js - Holds all client side connection
logic accessible within the file without needing to rewrite code
to access user information, state of video room, etc. Also, requests
user permission to use audio and video, and gets streams for the UI.

To continue development, cd to client folder and ensure
 dependencies found in package.json are installed using npm. 