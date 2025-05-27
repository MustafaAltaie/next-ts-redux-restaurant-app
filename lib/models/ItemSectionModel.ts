import { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    imageLink: { type: String, required: true },
    category: { type: String, required: true },
}, { timestamps: true });

const Item = models.Item || model('Item', ItemSchema);

export default Item;