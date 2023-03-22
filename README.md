# ShoppyFast

## How to run the application?

The project is divided in two parts, Front-end and Back-end.
 
To get the application to work, you need to run the two parts in different terminals.

### Requirements
You need to have installed.
1.  `git`.
2. `npm`.
3. `Node.js`


### How to run the backend?

1. You will need a file `.env` at `your_path/ShoppyFast/backend`. A `.env` file is a file that contains environment variables that are specific to your application.

    * The application requires a MONGODB_URI variable, which is used to store the connection to a MongoDB server application. The value of the before key you could find it following this [documentation](https://www.mongodb.com/docs/atlas/driver-connection/).
    For example:
        ```
        ## I need to replace <password> with the real password
        MONGODB_URI=mongodb+srv://camilo:<password>@shoppyfast.swzzqos.mongodb.net/?retryWrites=true&w=majority
        ``` 
    * On the server, you will need a test database.
    * In the test database, you will need a collection called products with documents using the following structure.
        ```
        id : 16
        name : "Salchicha Premium"
        marca : "Ranchera"
        description : "Ranchera de la rica"
        price : 3100
        imgURL : "https://d2n7tchuu1wmsv.cloudfront.net/uploads/17047/products/159473749…"
        cantidad : 5
        ```


2. In the `./backend ` file you will find specifically two archives, `backendLinux` and `backendWindows.exe`. Both of them are aplication's compile binaries, it is used to run the backend application on each operating system ( Windows/Linux).

    *  **Linux:** To run the application on linux you will open the terminal and go to `your_path/ShoppyFast/backend` and the run 
        ```
        $ ./backendLinux
        ```
    
    * **Windows**: To run the application on Windos you will open the terminal and go to `your_path/ShoppyFast/backend` and the run 
        ```
        backendWindows.exe
        ```

With the before steps you should see:
```
Database is connected
*mongo.Database

 ┌───────────────────────────────────────────────────┐ 
 │                   Fiber v2.42.0                   │ 
 │               http://127.0.0.1:3001               │ 
 │       (bound on host 0.0.0.0 and port 3001)       │ 
 │                                                   │ 
 │ Handlers ............. 5  Processes ........... 1 │ 
 │ Prefork ....... Disabled  PID ............. 11719 │ 
 └───────────────────────────────────────────────────┘ 
```


### How to run the frontend?
1. Open the terminal and go to your_path/ShoppyFast/frontend.
2. Run `npm install` to install all the project's dependencies;
3. Run `npm run start` to start the react development server

This command will start the React development server and open the application in your default web browser. If this doesn't happen automatically, open your browser and visit the URL http://localhost:3000 to see the application.
