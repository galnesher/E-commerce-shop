# Ecommerce Shop
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://gals-e-commerce.herokuapp.com/)
---
>Implented MERN Stack CRUD Operations with React, Node.js, MongoDB and Express.

>Admin User : admin@gmail.com

>Admin Password : 123123

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Contact](#contact)

## General info
The 'Ecommerce Shop' is a web application that demonstrates an ecommerce website.
For the client side i used 'React' , and for the backend/server side i used 'ExpressJS and MongoDB.
The client side communicates with the server through HTTP requests. 

### Flow
1. The user views the React web app with a browser.
2. The React front end communicates with the Express back end via RESTful APIs.
3. The back-end Express application uses the Mongo database for storing and retrieving data.
4. Back-end results are communicated back to the the front end.
5. Authentication user role for make Purchase or admin actions.
6. The React front-end stored the results in Redux store.
7. Front-end results are rendered in a human readable format to the user.


## Features
<br>

<b>Client Features</b>
| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Create a User | &#10004; | Register Action|
| Verification Mail | &#10004; | Integrate email verification when registering |
| List Products | &#10004; | Ability of List Products |
| Add To Cart | &#10004; |The client can add products to the shopping cart|
| Remove From Cart | &#10004; |The client can remove products from the shopping cart|
| Checkout | &#10004; |The client can make a purchase|


<br>

<b>Users Features</b>
| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| User Login | &#10004; | Login Action|
| Checkout | &#10004; |The user can make a purchase |
| MyOrders | &#10004; |The user can see the orders he has made in the past|
| Update on the status of the orders | &#10004; |The user can be updated on the status of his orders - "Active" or "Sent"|



<br>

<b>Admin Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Dashboard | &#10004; | Ability to see Total Revenu |
| Dashboard | &#10004; | Ability to see Total Orders |
| Dashboard | &#10004; | Ability to see Total Users |
| Dashboard | &#10004; | Ability to see chart of monthly order number and monthly income |
| List Orders | &#10004; | Ability to see all orders and active orders |
| Update Orders | &#10004; | Ability to update orders status from "Active" to "Sent" |
| List Users | &#10004; | Ability to see the all Users |
| List Contact | &#10004; | Ability to see all clients cantact  |
| List Subscribe | &#10004; | Ability to see all mail subscribes |
| Upload Products Category | &#10004; | Ability to upload new products category |
| Upload Product | &#10004; | Ability to upload new product |
| Delete Product | &#10004; | Ability to delete product by product ID |


<br>


## Technologies
Client-side | Server-side
--- | ---
react: ^17.0.1| bcryptjs: ^2.4.3
react-dom: ^17.0.1|dotenv: ^8.2.0
react-modal: ^3.11.2| express: ^4.17.1
react-chartjs-2: ^2.11.1|compression:^1.7.4
react-lazy-load-image-component: ^1.5.1|nodemailer:^6.4.17
react-redux: ^7.2.2 |joi: ^17.2.1
react-dom: ^16.2.0 | express: ^4.14.0
react-reveal: ^1.2.2| jsonwebtoken: ^8.5.1
react-router-dom: ^5.2.0 | mongoose: ^5.10.7
redux: ^4.0.5 |
redux-thunk: ^2.3.0 |

## Screenshots
#### Home Page :
![Home page](https://res.cloudinary.com/gal-nesher/image/upload/v1629289990/cnhua4w9sqfauricr6x1.png)

#### Admin pages:
![Home page](https://res.cloudinary.com/gal-nesher/image/upload/v1629290130/i7lfpsaluofhv00khw90.png)
![Admin Dashboard](https://res.cloudinary.com/gal-nesher/image/upload/v1629289976/z3wohreizltdkmpoz2r3.png)
![Orders](https://res.cloudinary.com/gal-nesher/image/upload/v1629289976/zfupsfrhndhcxrcttmqy.png)



## Setup
---
### Demo Live: https://gals-e-commerce.herokuapp.com/
<br>

Clone this repo to your desktop and run npm install to install all the dependencies.
### Server Side :
After you clone this repo to your desktop, go to its root directory and run npm install to install its dependencies.
>cd server <br>
>npm install<br>

Once the dependencies are installed, you can run npm start to start the application. You will then be able to access it at localhost:5000
>npm run start

### Client Side :
After you clone this repo to your desktop, go to its root directory and run npm install to install its dependencies.
>cd client <br>
>npm install<br>

Once the dependencies are installed, you can run npm start to start the application. You will then be able to access it at localhost:3000
>npm start


## Contact
Created by [Gal Nesher](https://www.linkedin.com/in/gal-nesher-153a881a3/) - feel free to contact me!
