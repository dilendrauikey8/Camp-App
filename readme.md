# Camp-App

> A Node.js Web application project.



## Features

* Authentication:
  
  * User login with username and password


* Authorization:

  * One cannot manage posts and view user profile without being authenticated

  * One cannot edit or delete posts and comments created by other users

  * Admin can manage all posts and comments

* Manage campground posts with basic functionalities:

  * Create, edit and delete posts and comments

  * Upload campground photos

  * Display campground location on Google Maps
  
  * Search existing campgrounds

* Flash messages responding to users' interaction with the app



### Custom Enhancements

* Update campground photos when editing campgrounds

* Update personal information on profile page





## Getting Started
### Instructions to run the website on a local machine

- Ensure that you have a Functional Text Editor(Atom, SublimeText, VSCode, etc) on your System.

<details>
<summary>Installation</summary>

	- Run the command "$ npm i" to install all the dependencies present in package.json.

</details> 



<details>
<summary>Additional Work</summary>

	- Create a .env file.
	- Create an account on Cloudinary to upload images and MapBox for using Geocoding API.
	- Store CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET and MAPBOX_TOKEN using credentials of your account in .env file.


</details>

<details>
<summary>Run Server</summary>

	- $ nodemon app.js  OR  $ node app.js.
    - $ mongod  (for database)



</details>
	
Now run in your search bar [localhost:3000](#)   
<!-- ## Demo

after Running above commands

Home page:-

<h3>Login Page:</h3>

![alt text](https://i.imgur.com/qy0Zbqe.png)

<h3>After clicking view page</h3>

![alt text](https://i.imgur.com/UJScyNQ.png)

<h3>Student Status Page</h3>

![alt text](https://i.imgur.com/XWEcye6.png)

<h3>Application Email</h3>

![alt text](https://i.imgur.com/2IRIUwx.png)

<h3>CSV File Processing Format</h3>

![alt text](https://i.imgur.com/yeE3Qbp.png)

<h3>Approval Page for Hostel</h3>

![alt text](https://i.imgur.com/F8WbGea.png)

<h3>Search functionality</h3>

![alt text](https://i.imgur.com/r3U3E2N.png)

<h3>Approval Email</h3>

![alt text](https://i.imgur.com/2HerMAy.png)

<h3>Rejection Email</h3>

![alt text](https://i.imgur.com/VyHXBxW.png)

<h3>https://i.imgur.com/mp5nkPv.png<h3>

![alt text](https://i.imgur.com/mp5nkPv.png)

<h3>Registration page for Labs and BTPs</h3>

![alt text](https://i.imgur.com/fUUyIoC.jpg)

<h3>Accounts get activated only after approval from HOD</h3>

![alt text](https://i.imgur.com/arJO10k.png)

<h3>Account requests Page (HOD)</h3>

![alt text](https://i.imgur.com/UvBXLvg.png)
 -->
