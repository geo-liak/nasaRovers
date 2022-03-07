# Purpose  
The aim of this application was to practise with React. It uses NASA's API to bring information about the rovers that have been sent to Mars and display the photos that were taken on a particular date.

## Copyright
All information displayed in this application, including the images of the rovers, have been taken from NASA. For NASA's image use policy see https://gpm.nasa.gov/image-use-policy.

# Project Information  
This application was developed using:  
• npm version 8.4.1  
• node version 16.13.1  
• json-server verion 0.17.0


# Steps to run the project

1. Clone the repository into some local folder:
```git clone https://github.com/geo-liak/nasaRovers.git```  

2. Change to the folder that was created.  

3. Install the dependencies:  
```npm install```  

4. (optional) Run the json-server:  
```json-server --watch ./src/data/combined.js --port 4001```  

5. From a separate terminal window, go to the project folder (step 2) and run:  
```npm start```

# About JSON-server
Some limited data can be seen with json-server.  
For json server to be installed, the following command must be used:
```
npm install -g json-server
```
  
To use json-server instead of NASA's API change ```DEVELOPMENT_MODE``` to true in the ```settings.js```.  
The json-server port is set to 4001. If you need to change to another port, change ```PORT``` in file ```settings.js``` and use the new port when starting the json-server in step 4.


