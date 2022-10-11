# SEI - Project Four - aromatics

## Table of contents

* Project Overview
* The Brief
* Technologies Used
* Approach Taken (featured code)
* Final Product (screenshot walkthrough)
* Wins & Challenges
* Bugs
* Future Content and Improvements
* Key Learnings


## Project Overview
Aromatics is an aromatherapy toolkit and recipe hub where users can discover the therapeutic properties and best uses of essential oils and create their own blends and recipes which they can share with the aromatics community. This is a full-stack application and was my first experience using Python, Django and PostgreSQL for the backend. This was a pair-project and was built over nine days. 

**Coding Partner**: Fasai Chunchuasuparerk ([Github](https://github.com/fasaic))

***

#### You will find the deployed app here: [aromatics.herokuapp.com](https://aromatics.herokuapp.com/)

If you would like to see all the features of aromatics, please feel free to use the following credentials to log in:

Email: user1@email.com | Password: user1123

** *All the content on Essential Oils, Base Oils and Recipes that were created by Admin has been lifted from ‘Essential Oils’ book by Neal’s Yard Remedies (2016).* **

***

### Code Installation
Clone or download the repo then do the following in Terminal:

* Install back-end dependencies: `pipenv`
* Enter Shell for project: `pipenv shell`
* Make Migrations: `python manage.py makemigrations`
* Migrate: `python manage.py migrate`
* Load Seed data for Application Categories: `python manage.py loaddata applications/seeds.json`
* Load Seed data for Remedy Categories: `python manage.py loaddata remedies/seeds.json`
* Load Seed data for Base Oils: `python manage.py loaddata bases/seeds.json`
* Load Seed data for Essential Oils: `python manage.py loaddata essentials/seeds.json`
* Load Seed data for Recipes: `python manage.py loaddata recipes/seeds.json`
* Load Seed data for Users: `python manage.py loaddata jwt_auth/seeds.json`
* Start back-end server: `python manage.py runserver`
* Change to front-end directory: `cd client`
* Install front-end dependencies: `npm`
* Start front-end server: `npm run start`

## The Brief

* Build a full-stack application by making your own backend and your own front-end
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Be deployed online so it's publicly accessible.

## Technologies Used

#### Backend:
* Python
* Django
* Django REST Framework
* PostgreSQL
* pyJWT

#### Frontend:
* JavaScript (ES6)
* React
  * react-router-dom
  * react-toastify
  * react-simple-star-rating
  * react-select
  * react-bootstrap
  * Swiper
* Axios
* HTML
* SCSS & Bootstrap

#### Development tools:
* VS code
* npm
* Insomnia
* TablePlus
* Git & Github
* Google Chrome dev tools
* Heroku (deployment)
* Trello Board (planning and timeline)
* Excalidraw (wireframing)
* Figma (design)
* Lucidraw (Entity Relationship Diagram for database architecture and flow diagram for user journey)

## Approach taken (featured code)

I first became interested in aromatherapy during the pandemic and after taking a couple of courses, I fell in love with creating blends and making my own recipes for various applications and remedies. From the start of the SEI course, I knew I wanted to create an aromatherapy app and in the weeks running up to Project 4, I started mapping out the features I wanted to include. It soon became clear to me that I wouldn’t be able to achieve everything on my own so I approached fellow classmate and Project 2 teammate, Fasai Chunchuasuparerk, and pitched her my idea. Luckily for me, she liked the idea and agreed to come on board and so the journey began!

### Planning (Day 1 & 2)

After refining our features, detailing all the user functionalities and defining our MVP, we started on the plan for the models we required and the relationships between them. We used Lucidchart to create our ERD and user journey.  

**ERD**

The only tables we didn’t implement from the below ERD were the Blends and blends_essential_oil (join table). Each essential oil has essential oils that it blends well with, rather than having a separate model and join table for these “blends well with” oils, we decided to include a field - called “blends_well_with” - directly to the Essential Oils model and have a ManyToMany relationship with itself.


## Final Project (screenshot walkthrough)
## Wins & Challenges
## Bugs
## Future Content and Improvements
## Key Learnings

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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
