import { Schema, model, models } from 'mongoose';

const section3Schema = new Schema({
    title: { type: String },
    imageLink: { type: String },
    description: { type: String },
});

const Dishes = models.Dish || model('Dish', section3Schema);

export default Dishes;