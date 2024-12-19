# Learning Management System(LMS)
-Started backend development
-Routing
-Error utilities
-Authentication and error middlewares
-User controllers
    -Register
    -Login
    -Logout
    -View user profile
    -Forgot password
    -Reset password (using noemailer)

-Course controllers
    -View all courses 
    -Get courses by id (If logged in)
    -Create courses (Only ADMIN)
    -Update courses (Only ADMIN)
    -Delete courses (Only ADMIN)
    -Add lectures (Only ADMIN)

-Payment
    -Generate payment key
    -Enable transactions
    -Integrate Razorpay API

# Features
-For STUDENT
    -User
        -Register
        -Login/Logout
        -Reset Password(Using nodemailer)
        -View Profile
        -Update Profile
    
    -Course
        -List Courses    
        -Buy Courses
    
    -Payment
        -Subscribe


-For ADMIN
    -User
        -Register
        -Login/Logout
        -Reset Password(Using nodemailer)
        -Profile
        -Update Profile
    
    -Course
        -List
        -View
        -Create
        -Edit
        -Delete
    
    -Payment
        -View Payments
        