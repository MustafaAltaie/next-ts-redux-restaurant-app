import { Schema, model, models } from 'mongoose';

const socialMediaSchema = new Schema({
    instagram: { type: String },
    facebook: { type: String },
    linkedIn: { type: String },
}, { _id: false });

const memberSchema = new Schema({
    title: { type: String, required: true },
    position: { type: String, required: true },
    name: { type: String, required: true },
    imageLink: { type: String, required: true },
    socialMedia: { type: socialMediaSchema },
}, { timestamps: true });

const Member = models.Member || model('Member', memberSchema);

export default Member;