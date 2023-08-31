# Calendar App
This is a simple calendar application that allows users to create, view, edit, and delete events. It was created using Node.js, Express, and MongoDB on the backend, and HTML, CSS, and JavaScript on the frontend.

# Getting Started
After having the files on your computer,
you will have to run the command 'npm install' in the application's root folder which will install the all the required dependencies.

Those dependencies are:
1. express
2. mongoose
3. body-parser
4. cors
5. dotenv
6. express-openid-connect

You will need your own MongoDB cluster to make this application work.
As this application uses Auth0 login with express-openid-connect library, you will also need an Auth0 account and to follow the instructions from here to create Web Application in Auth0 dashboard:

https://github.com/auth0/express-openid-connect

Lastly, you will need to create .env file to the main folder which contains following information:   
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING     
PORT=PORT_NUMBER     
AUTH_REQUIRED=true      
AUTH0_LOGOUT=true     
BASE_URL=https://YOUR_APPLICATION_ROOT_URL         
CLIENT_ID=YOUR_AUTH0_CLIENT_ID             
ISSUER_BASE_URL=https://YOUR_AUTH0_DOMAIN           
SECRET=SOME_LONG_RANDOM_VALUE           

For example:   
MONGO_URI=mongodb+srv://exampleUser:examplePassword@examplecluster.78example21.mongodb.net/exampleDB?retryWrites=true&w=majority   
PORT=3000    
AUTH_REQUIRED=true    
AUTH0_LOGOUT=true      
BASE_URL=http://localhost:3000
CLIENT_ID=3Fdkdexampleclientidos884s    
ISSUER_BASE_URL=https://examplebaseurl.auth0.com
SECRET=kdkaoexamplesecretstring

You can then run the application with the command: 'npm start'

The calendar app should now be running on the port you choosed.

# Functionality

The app allows users to perform the following actions:

* Create a new event by clicking on a day in the calendar and filling out a form.
* Close the opened form by clicking 'Close' button
* View all events for the day in a list by clicking on the desired day.
* Mark events as done or change them back to still not ready again by checking their checkboxes and clicking the 'Mark' button.
* Delete events by checking their checkboxes on the list of events and clicking the 'Delete' button.
* Change currently browsed month by pressing the 'Back' or 'Next' arrow buttons in the upper right corner.
