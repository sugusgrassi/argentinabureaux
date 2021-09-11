import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()
const {
    SECRET
  } = process.env;

// if a user wants to like a post, 
// clicks the button => auth middleware (next) => like controller ...
// The middlewares can be used in the routes

const auth = async (req, res, next) => {

    try {
        //checks if the user token is valid
        console.log(req.headers)
        // Authorization in the frontend to Titlecase
        // authorization in the backend to lowercase
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // Not google auth

        let decodedData; // To get the data from the token itself
        
        if(token && isCustomAuth) {
            // get user id
            decodedData = jwt.verify(token, SECRET);
            req.userId = decodedData?.id;
        } else {
            // google's token, no SECRET
            decodedData = jwt.decode(token);
            // sub: specific id for google user
            req.userId = decodedData?.sub;
        }
        // to pass the action to the next thing
        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;