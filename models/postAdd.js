const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Create Scheme
const PostAddSchema = new Schema({
    category: {
        type: String,
        default: '',
        // required: true
    },
    product_title: {
        type: String,
        default: '',
        // required: true
    },
    product_description: {
        type: String,
        default: '',
        // required: true
    },
    product_condition: {
        type: String,
        default: '',
        // required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    expectedPrice: {
        type: String,
        default: '',
        // required: true
    },
    rentValue: {
        type: String,
        default: '',
        // required: true
    },
    priceNegotiable: {
        type: String,
        default: '',
        // required: true
    },
    rentPer: {
        type: String,
        default: '',
        // required: true
    },
    addLocation: {
        type: String,
        default: '',
        // required: true
    },
    renter_name: {
        type: String,
        default: '',
        // required: true
    },
    renter_email: {
        type: String,
        default: '',
        // required: true
    },
    renter_number: {
        type: String,
        default: '',
        // required: true
    },
    project_image: {
        type: String
        // data: String,
        //  contentType: String
        // contentType: String
        // required: true
    },
    reviewverName: {
        type: String
        // data: String,
        //  contentType: String
        // contentType: String
        // required: true
    },
    reviews: {
        type: String
        // data: String,
        //  contentType: String
        // contentType: String
        // required: true
    },
    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // }
});

// Reviews Scheme
const ReviewSchema = new Schema({
    _id: {
        type: String
    },
    reviewverName: {
        type: String
    },
    reviews: {
        type: String
    }
});

// Add favourite listing Scheme
const AddFavouriteSchema = new Schema({
    _id: {
        type: String
    },
    favCard: {
        type: String
    },
});


const BookingProduct = new Schema({
    user_name: {
        type: String,
        default: '',
        // required: true
    },
    user_number: {
        type: String,
        default: '',
        // required: true
    },
    seller_email: {
        type: String,
        default: '',
        // required: true
    },
    user_message: {
        type: String,
        default: '',
        // required: true
    }

});


module.exports = addFavourite = mongoose.model('addFavourite', AddFavouriteSchema);
module.exports = reviewProduct = mongoose.model('reviewProduct', ReviewSchema);
module.exports = bookingProduct = mongoose.model('bookingproduct', BookingProduct);
module.exports = postAdd = mongoose.model('postadd', PostAddSchema);