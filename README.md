# Calendar App
This is a simple calendar application that allows users to create, view, edit, and delete events. The server was created using Node.js, Express, and MongoDB, while user interface was made with HTML, CSS, and JavaScript.

# Getting Started
To install all the required dependencies, run the command 'npm install' in the application's root folder.

You will need your own MongoDB cluster to use this application.

As this application uses Auth0 login with express-openid-connect library, you will also need an Auth0 account. Follow the instructions from here to create the Web Application in Auth0 dashboard:

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

The application can then be run with command: 'npm start'

The calendar app should now be running on the port you choosed and can be accessed through web browser!

# Functionality

The application allows users to perform the following actions:

* Create an account and sign in to the application in order to use it.

![Sign In Form](./images/login.png "Sign In Form")

* Browse all events on the calendar or upcoming events in the timeline.
* Change currently browsed month by pressing the 'Back' or 'Next' arrow buttons in the upper right corner.
* Logout from the application using the 'Logout' button in upper right corner.

![Calendar"](./images/calendar.png "Calendar")

* Create a new event by clicking on a day in the calendar and filling out a form.
* Close the opened form by clicking 'Close' button

![New Event Form](./images/new-event-form.png "New Event Form")

* View all events for the day in a list by clicking on the desired day.
* Mark events as done or not done by checking their checkboxes from the list of events and clicking the 'Mark' button.
* Delete events by checking their checkboxes on the list of events and clicking the 'Delete' button.

![Events Form](./images/add-event-form.png "Events Form")