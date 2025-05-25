import { Schema, model, models } from 'mongoose';

const section2Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    imageLink: { type: String, required: true },
});

const Milkshakes = models.Milkshake || model('Milkshake', section2Schema);

export default Milkshakes;