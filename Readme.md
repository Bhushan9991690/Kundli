# Require of cookie-parse

In express we have to intall the npm i cookie-parser
If we want to fetch the token we are saved in our cookie
This allows your server to easily retrieve and work with cookies

# delete a entity in mongoose object

--The delete operator does not work on Mongoose documents--

1. const plainUser = user.toObject(); // Convert Mongoose document to plain object
2. delete plainUser.password; // Now this will work

# To remember the time we use

1. {timestamps:true} in schema

# Joi validation

Joi validates the request body, not the database-stored data.
