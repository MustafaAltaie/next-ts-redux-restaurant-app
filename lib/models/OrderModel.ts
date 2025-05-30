import { Schema, model, models } from 'mongoose';

const itemsType = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String },
}, { _id: false });

const orderSchema = new Schema({
    name: { type: String, required: true },
    table: { type: Number },
    message: { type: String },
    address: { type: String },
    mobile: { type: String },
    portCode: { type: Number },
    orderType: { type: String,  enum: ['diningIn', 'delivery'], required: true },
    totalQuantity: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    items: { type: [itemsType], required: true }
}, { timestamps: true });

const Order = models.Order || model('Order', orderSchema);

export default Order;