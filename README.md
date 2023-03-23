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

Lastly, you will need to create .env file to the main folder which contains following information:   
MONGO_URI={YOUR_MONGODB_CONNECTION_STRING}   
PORT={PORT_NUMBER}

For example:   
MONGO_URI=mongodb+srv://exampleUser:examplePassword@examplecluster.78example21.mongodb.net/exampleDB?retryWrites=true&w=majority   
PORT=3000

You can then run the application with the command: 'npm start'

The calendar app should now be running on port 3000.

You can access it by opening the web browser and navigating to 'http://localhost:3000'.

# Functionality

The app allows users to perform the following actions:

* Create a new event by clicking on a day in the calendar and filling out a form.
* Close the opened form by clicking 'Close' button
* View all events for the day in a list by clicking on the desired day.
* Mark events as done or change them back to still not ready again by checking their checkboxes and clicking the 'Mark' button.
* Delete events by checking their checkboxes on the list of events and clicking the 'Delete' button.
* Change currently browsed month by pressing the 'Back' or 'Next' arrow buttons in the upper right corner.
