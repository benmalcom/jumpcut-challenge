## Jumpcut Code Challenge

This project is a react-based project setup from scratch using webpack(v4).

Project structure has a main `src/` folder containing the business logic of the application,
also with `__tests__` folder. Also I implemented tiny unit tests for some components' basic rendering and the sequencers.

#### Running The Code
* Clone project into any directory
* Run `npm install` in project directory to install dependencies
* Run `npm run dev` to start up the webpack dev server, a mini web server by webpack to serve applications
* For tests, a basic unit test with jest/enzyme is implemented, run `npm test`

#### Deployment
In case of deployment, the package.json file's `prestart` hook bundles the application into a `build/` folder
and ready to be statically served by the express server.

#### Assumptions/Decisions
* I used `reactstrap` in the frontend to add some bootstrap styling
* In the frontend, I added a `reset` button which resets the current sequence generators to it's beginning.
also, I added a reset function to each (piped)sequencers and to the generator, also the accumulator function was modified a little for this.
