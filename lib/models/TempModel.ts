import { Schema, model, models } from 'mongoose';

const tempSchema = new Schema({
  name: { type: String, required: true },
});

const TempModel = models.Temp || model('Temp', tempSchema);

export default TempModel;