import mongoose from 'mongoose';

const AddCatagrie = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        discription: {
            type: String,  
        },
    },
    {
        timestamps: true,
    }
);


const AddCatagries = mongoose.model('AddCatagrie', AddCatagrie);

export default AddCatagries;
