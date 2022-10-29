## Pages
    - Home page
        - List latest deals
        - For authenticated users, display form to create a deal 
        - Create a navbar that contains sing in, sign up(for visitors) ,  a search bar and a filter 
    - Deal page
        - Allows user to edit/delete one of their deals
        - Display the deal, location, range (km), date of publication, type of deal
    - Profile
        - Display a information about  the person
        - Display all the deals that the person created
        - Display option for 'connected'
    - Profile edit
        - Allows to the user the edit their profile
## Route Handlers
    - '/'.
        - GET '/' Load list of latest publications
    - '/deal'
        - POST '/deal/create' Handles deals creation form submission.
        - GET '/deal/:id/edit' Load existing deal, render edit form.
        - POST '/deal/:id/edit' Handle deal edit form submission.
        - POST '/deal/:id/delete' Handle deal delete form submission.
    - '/profile'
        - GET '/profile/edit' Load authenticated user, render edit profile form.
        - POST '/profile/edit' Handle edit profile form submission.
        - POST '/profile/delete' Handle profile deletion form submission.
        - GET '/profile/:id' Load existing user, render profile page.
        - POST '/profile/:id/follow' Handle follow form submission.
        - POST '/profile/:id/unfollow' Handle unfollow form submission.
    - '/authentication
        - GET '/authentication/log-in' Render log-in page.
        - POST '/authentication/log-in' Handle log in form submission.
        - GET '/authentication/sign-up' Render sign up page. 
        - POST '/authentication/sign-up' Handle sign up form submission
        - 
        - 
## Models
    - User
        - name: String, required
        - email: String required
        - username: String required
        - passwordHashAndSalt: String, required
        - picture: String
    - Deal
        - title: String, required, max-length: 20
        - message: String, required, max-length: 300
        - author: ObjectId, ref: User, required
        - type: enum(service, object) , required
        - picture: String
        - 
    - Connect
        - follower: ObjectId, ref:user, required
        - followee: ObjectId, red:User, required
        - timestamps: true
## Other considerations
## "multer": "^1.4.5-lts.1",
## "multer-storage-cloudinary": "^4.0.0",
## Wishlist
    -Chat Window
    -Distance
    -Multiple Images