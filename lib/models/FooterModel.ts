import { Schema, model, models } from "mongoose";
import { ContactObj } from "../../types/Footer";

const FooterSchema = new Schema<ContactObj>({
    _id: { type: String, default: 'singleton_footer_Contact_information' },
    mobile: { type: String },
    email: { type: String },
    messenger: { type: String },
    whatsapp: { type: String },
});

const Contact = models.Contact || model('Contact', FooterSchema);

export default Contact;