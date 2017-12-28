COSC2440-Software Architecture: Design and Implementation

Group Name: SADIWhite

Members: Nguyen Hoang Minh: s3634696,
	 Tran Huu Quang: s3651520,
	 Quach Phuong Toan: s3634953,
	 Jeon So Yeun: s3622567

Assignment 2

I. Overview
* This is the extended version of the previous assignment (assignment 1) with improvements and more sensational functions.

* In this assignment, we used Spring Hibernate, SpringMVC, Spring Security to build a Educational Website.
* Link to the website: "http://45.55.90.193" or "http://sadi-white.kieronqtran.me".
* In order to start using this website, user needs to Log In using his/her Email and Password.
* If user does not have an account, he/she can Sign Up to create one.
* After Logging In, user can see his/her User Profile.
* For users with the role: "ROLE_ADMIN", he/she can Manage the tests (Create a new test and Delete a test).
* For users with the role: "ROLE_USER", he/she can Take the test.
* User can Log Out when ever he/she wants.
* After Signing Up, user will receive an welcome email coming from "SADIWhite@gmail.com"
* The Cookies is going to make sure that users stay logged in when open a new tab (This is an improvement compared to the previous version in which sessionStorage was used).

II. Functioning
* In the Log In step, after entering their Email and Password and clicking the "Log In" button, those 2 fields will be sent to the server which will create a token (using the OAuth2 technique) and send back to the user/admin.
	- Predefined Accounts:
		+ Email: adamSmith@gmail.com
		+ Password: 123456
		+ Roles: ROLE_ADMIN, ROLE_USER

		+ Email: user@localhost
		+ Password: user
		+ Role: ROLE_USER

* Using the token given to them, users/admins can get their Information from the server. Moreover, when ever users/admins make any request, that token will be sent to the server together with it.
The token will expire after 5 minutes and then it will be refreshed with a new one.

* Without Logging In, users will be redirected to the Log In page if they try to go to pages by typing into the URL.

* For the Test Taking phrase, every test has a count-down time limitation. When the times runs out, the test will be stoped and the result will be automatically submited. If user finishes the test before the time runs out, he/she can choose to submit their result. After the result is submited, user will be redirected back to the User Account Page, in which he/she can see all the records of the results of the tests that he/she has taken.

* Admins can delete tests and create new tests. For the Test creating phrase, the admins can create as many questions as they want to put inside the test.

* Admins can update the tests. For example, Add Questions to tests, Change the Correct Answer and Remove Questions from the test.

* Both Admins and Users can see top 10 Results, ordered by the highest mark on top.

* Admins can see all the Results.

* Admins can see all the Accounts and Delete them.

III. Technologies Used
* JSON Web Token (JWT)
* OAuth2
* Hibernate
* SpringMVC
* React, Redux
* PostgreSQL
* Docker
* DigitalOcean
* Cookies
* (A lot of help from one of the team member)
* (Our Imagination)

IV. Work Division
* Test Creating, Test Taking, Test Editing, Test Deleting and Count down the time                            	| 	Quach Phuong Toan and Jeon So Yeun
* Log In, Log Out, Get User's info, Get All Results, Get All Accounts, Delete Accounts and Update Profile 	    | 	Nguyen Hoang Minh and Tran Huu Quang
* Deploying the Server                                                                               			|	Tran Huu Quang
* Great help				                                                                                    | 	Tran Huu Quang


### If only we could find meeting rooms at school easily and conveniently, this product would be more completed. ###