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

# Be aware about it beause in mongoose

1. find() method return empty array
2. findOne() method return null

# lowercase all the fields in the details because they may cerate problems

# In Mongoose, when you compare IDs, you need to remember that the \_id is an ObjectId, not a plain string. You can’t compare them directly with === because ObjectIds are objects, not strings.

1. Correct ways to compare Mongoose IDs:
   Using .equals() method

   example :
   const id1 = mongoose.Types.ObjectId('63e5e64f1234567890abcdef');
   const id2 = mongoose.Types.ObjectId('63e5e64f1234567890abcdef');

   if (id1.equals(id2)) {
   console.log('IDs are equal');
   } else {
   console.log('IDs are not equal');
   }

# in find() request in Mongoose, const feed = await User.find();

1. It returns all the data in the Database

# feed API ( Application programming Interface )

1.  page-1 limit 10 skip zero
2.  page-2 limit 10 skip first 10
3.  page-3 limit 10 skip first 20
4.  Here req.query gives us page and limit in an object but gives in an format like
5.  {page:'1',limit:'10'}
6.  that's why we need to convert it into int using parseInt

7.  Restrict to only atleast 50 User one time only
    limit = limit > 50 ? 50 : limit;
