import mongoose from 'mongoose';

const AddProduct = new mongoose.Schema(
    {
        title: {
            type: String,
        },

        price: {
            type: Number,
            required: true,
        },
        images: [
            {
                type: String,
            required: true,
            },
        ],
        rating: {
            type: Number,
            required: true,

        },
        description: {
            type: String,
            required: true,

        },
    },
    {
        timestamps: true,
    }
);


const AddProducts = mongoose.model('AddProducts', AddProduct);

export default AddProducts;