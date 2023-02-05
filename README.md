# Calendar App
Calendar app made using JavaScript, HTML and CSS. Events are stored to a MongoDB database.

This app uses Node.js and it has been tested with the version 16.18.0.

# Getting Started
You will need to use command 'npm init' in the main folder you want to initiate the calendar app to.

You will also need to install all the required Node.js packages using command 'npm install {PACKAGE_NAME}'.

Required packages are:
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
