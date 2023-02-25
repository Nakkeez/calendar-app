# Calendar App
Calendar app made using JavaScript, HTML and CSS. Events are stored to a MongoDB database.

This app uses Node.js and it has been tested with the version 16.18.0.

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