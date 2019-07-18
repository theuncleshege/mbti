# MBTI

One of our core tools to understand team dynamics is the Perspective Tool. Perspective is a 7 minute test that determines each team member's Myers-Briggs Type Indicator or MBTI (<https://www.mindfulnessmuse.com/individual-differences/understanding-myers-briggs-type-indicator>). Using this information, and understanding the personality breakdown of each team member, allows for a much better understanding of why a team is having a particular problem.

This is a Full Stack Simple Myers-Briggs Type Indicator Perspective Test application. It has been built with service-oriented architecture and is broken down into 3 major parts namely:

- The Client - a `react` app which is what users see in the browser
- The API - a `laravel` app which is responsible for storing to and pulling data from the database
- The DB - a `mysql` server which is the database engine
- The Webserver -  an `nginx` server responsible for routing requests to either the `client` or the `api` depending on the url


There are two ways of running this application locally;

- Using Docker **(This is the preferred and recommended method)**
- Running each part of the application (client, api and db) separately

## 1. Using Docker (Recommended)

- Clone the repository
- Open your `terminal/command prompt/powershell` window and navigate to the `mbti` folder
- Then run `yarn start`
- Open your browser and navigate to `http://localhost` to see the running application

**_Please note that port `80` must be free on your system for this to work. The port number is configurable inside the `docker-compose.yml` file._**

## 2. Running Separately

- Clone the repository
- Start your database engine. The application has been tested with `mysql` but `postgres` should work too.
- Open your `terminal/command prompt/powershell` window and navigate to the `mbti` folder
- Navigate further into the `api` folder and run the following commands:
    > `cp .env.example .env` (Please remember to fill in your database environment variables in the `.env` file)
    > `composer install`
    > `php artisan migrate:fresh --seed`
- Then run `php artisan serve` to start the API server.
- (Optional) Open your browser and navigate to `http://localhost:8000` to see the running Laravel Demo App
- Open another `terminal/command prompt/powershell` window and navigate to the `mbti` folder
- Then navigate further into the `client` folder and run `yarn` or `npm install`
- Then run `yarn start` or `npm start` to start the client
- Open your browser and navigate to `http://localhost:3000` to see the running application

To run unit tests, please navigate into any of the `api` or `client` folders and run `vendor/bin/phpunit` or `yarn test --watchAll=false` respectively. Kindly make sure that you have run `composer install` and `yarn` inside the `api` and `client` folders respectively first before trying to run unit tests.

## Thank you