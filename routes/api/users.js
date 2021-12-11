const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const os = require('os')
var fs = require('fs')
var nodemailer = require("nodemailer");
const router = express.Router();
const bodyParser = require("body-parser");
var validator = require("email-validator");

// User Model
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const postAdd = require('../../models/postAdd');
const bookingProduct = require('../../models/postAdd');
const reviewProduct = require('../../models/postAdd');
const addFavourite = require('../../models/postAdd');

const { json } = require('body-parser');
let db = mongoose.connection;
var ObjectId = require('mongodb').ObjectID;

// @route   GET api/Users
// @desc    Get all Users
// @access  Public`
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});

// @route   GET api/Users/user/id
// @desc    Get one Users
// @access  Public`
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
});

// @route   GET api/Users/token/id
// @desc    Get one UserSession
// @access  Public`
router.get('/token/:id', (req, res) => {
    UserSession.findById(req.params.id)
        .then(user => res.json(user))
});

// @route   POST api/Users/signup
// @desc    Create An User
// @access  Public
router.post('/signup', (req, res, next) => {
    const { body } = req;
    const {
        first_name,
        last_name,
        password
    } = body;
    let {
        email
    } = body;

    if (!first_name) {
        return res.send({
            success: false,
            message: 'Error: First name cannot be blank.'
        });
    }
    if (!isNaN(first_name) || !isNaN(last_name)) {
        return res.send({
            success: false,
            message: 'Error: Name Cannot be Numeric Values.'
        });
    }

    if (!last_name) {
        return res.send({
            success: false,
            message: 'Error: Last name cannot be blank.'
        });
    }
    let mailValidation = validator.validate(email)
    if (!mailValidation) {
        return res.send({
            success: false,
            message: 'Error: Pleae Enter right format of email.'
        });
    }

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        // Save the new user
        const newUser = new User();
        newUser.first_name = first_name;
        newUser.last_name = last_name;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        });
    });
});

// @route   POST api/Users/signin
// @desc    Create An UserSession
// @access  Public
router.post('/signin', (req, res, next) => {
    const { body } = req;
    const {
        password
    } = body;
    let {
        email
    } = body;
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid Email'
            });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid Password'
            });
        }
        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id,
                userId: user._id
            });
        });
    });
});

// @route   POST api/Users/verify
// @desc    Get all tokens
// @access  Public
router.get('/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        else {
            // DO ACTION
            return res.send({
                success: true,
                message: 'Good'
            });
        }
    });
});

// @route   POST api/Users/logout
// @desc    Updates isDeledted in users
// @access  Public
router.get('/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    },
        {
            $set: {
                isDeleted: true
            }
        }, null, (err, sessions) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Good'
            });
        }
    );
});

// @route   DELETE api/Users/id
// @desc    Delete A User
// @access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});


// @route   DELETE api/Users/token/id
// @desc    Delete A Token
// @access  Public
router.delete('/token/:id', (req, res) => {
    UserSession.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/Users/postAdd
// @desc    Add Post Details
// @access  Public
router.post('/postAdd', (req, res, next) => {
    const { body } = req;
    const {
        category,
        product_title,
        product_description,
        product_condition,
        startDate,
        endDate,
        expectedPrice,
        rentValue,
        priceNegotiable,
        rentPer,
        addLocation,
        renter_name,
        renter_email,
        renter_number,
        project_image,
    } = body;

    // Save the new Add Post
    console.log("project image is ", project_image)
    let prodImage = os.homedir() + "/" + project_image
    let buff = fs.readFileSync(prodImage);
    let base64data = buff.toString('base64');

    const newPost = new postAdd();
    newPost.category = category
    newPost.product_title = product_title
    newPost.product_description = product_description
    newPost.product_condition = product_condition
    newPost.startDate = startDate
    newPost.endDate = endDate
    newPost.expectedPrice = expectedPrice
    newPost.rentValue = rentValue
    newPost.priceNegotiable = priceNegotiable
    newPost.rentPer = rentPer
    newPost.addLocation = addLocation
    newPost.renter_name = renter_name
    newPost.renter_email = renter_email
    newPost.renter_number = renter_number
    newPost.project_image = base64data

    newPost.save((err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message: 'Post Details Save'
        });
    });
});


// @route   POST api/Users/postreviews
// @desc    Add Post reviews
// @access  Public
router.post('/postreviews', (req, res, next) => {
    const { body } = req;
    const {
        id,
        reviewverName,
        reviews,
        rating
    } = body;

    let review = db.collection('reviews');

    review.updateMany(
        { "_id": id },
        {
            $push:
            {
                "reviewverName": reviewverName,
                "reviews": reviews,
                "rating": rating
            }
        },
        { upsert: true }
        , (err, posts) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            else {
                return res.send({
                    success: true,
                    message: 'Reviews data Save'
                });
            }
        }
    )
});

// @route   POST api/Users/findreviews
// @desc    Find Post Reviews
// @access  Public
router.post('/findreviews', (req, res, next) => {
    db.collection('reviews').findOne({ "_id": req.body.id }, (err, posts) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else {
            if (posts) {
                return res.send({
                    success: true,
                    message: 'Reviews Data Save',
                    reviews: posts
                });
            }
            else {
                return res.send({
                    success: false,
                    message: 'Reviews not found',
                });
            }
        }
    });
});

// @route   POST api/Users/addfavourite
// @desc    add Favourite listing in addFavourite
// @access  Public
router.post('/addfavourite', (req, res, next) => {
    const { body } = req;
    const {
        userID,
        favCard
    } = body;
    let addFavourite = db.collection('addFavourite');
    console.log("favourite  card is ", req.body.favCard)
    if (favCard) {
        addFavourite.updateMany(
            { "_id": req.body.userID },
            {
                $push:
                {
                    "favCard": req.body.favCard,
                }
            },
            { upsert: true }
            , (err, posts) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                else {
                    return res.send({
                        success: true,
                        message: 'Favourite Data insert Successfuly'
                    });
                }
            }
        )
    }
    else {
        return ({
            success: false,
            message: 'Error: Server error'
        })
    }
});

// @route   POST api/Users/findreviews
// @desc    Find Post Reviews
// @access  Public
router.post('/findfavlisting', (req, res, next) => {
    console.log("id ", req.body.id)
    db.collection('addFavourite').findOne({ "_id": req.body.id }, (err, favcard) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else {
            if (favcard) {
                return res.send({
                    success: true,
                    message: 'Data get successfully',
                    favCard: favcard
                });
            }
            else {
                return res.send({
                    success: false,
                    message: 'Favourite listing not found',
                });
            }
        }
    });
});



// @route   GET api/Users/listing
// @desc    Get all Post add Details
// @access  Public`
router.get('/listing', (req, res) => {
    postAdd.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});


// @route   POST api/Users/searchPost
// @desc    Search Post Details
// @access  Public
router.post('/searchpost', (req, res, next) => {
    postAdd.find({ category: req.body.projectCategory }, (err, posts) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message: 'Post Details Fing',
            PostResult: posts
        });
    });
});
// @route   POST api/Users/searchPost
// @desc    Search Post Details
// @access  Public
router.post('/searchpostwithlocation', (req, res, next) => {
    postAdd.find({ $and: [{ category: req.body.searchData.projectCategory }, { addLocation: req.body.searchData.location }] }, (err, posts) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message: 'Post Details Fing',
            PostResult: posts
        });
    });
});

// @route   POST api/Users/searchPost
// @desc    Search Post Details
// @access  Public
router.post('/searchpost', (req, res, next) => {
    postAdd.find({ category: req.body.projectCategory }, (err, posts) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            message: 'Post Details Fing',
            PostResult: posts
        });
    });
});

// @route   POST api/Users/bookingproduct
// @desc    Booking product By Mail
// @access  Public
router.post('/bookingproduct', (req, res, next) => {
    const { body } = req;
    const { user_name, user_number, seller_email, user_message } = body

    var transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: 'gmail',
        auth: {
            user: 'hasnainsaleem2233@gmail.com',
            pass: 'newsagency123'
        }
    });

    var mailOptions = {
        from: 'hasnainsaleem2233@gmail.com',
        to: `${seller_email}`,
        subject: 'Sending Email using Node.js',
        text: `The user Name is : ${user_name} 
            The user Phone Number is : ${user_number}
            The user Message is : ${user_message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.send({
                success: false,
                message: `Error: ${error}`
            });
        } else {
            return res.send({
                success: true,
                message: `Email sent: ${info.response}`,
            });

        }
    });
});

// @route   DELETE api/Users/id
// @desc    Delete a specific favourite card
// @access  Public
router.post('/deletefavcard', (req, res) => {
    const { body } = req;
    let { userId, cardId } = body
    console.log("user id is = ", userId)
    console.log("Card id is = ", cardId)
    let delrecord = db.collection('addFavourite');
    delrecord.update(
        { _id: userId },
        { $pull: { favCard: { _id: cardId } } },
        { multi: true }, (err, posts) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Favourite card not deleted successfully!"
                })
            }
            else {
                return res.send({
                    success: true,
                    message: "Favourite card deleted successfully!"
                })
            }
        })
});


module.exports = router;