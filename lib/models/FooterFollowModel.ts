import { Schema, models, model } from "mongoose";
import { FooterFollow } from "../../types/FooterFollow";

const FooterFollowSchema = new Schema<FooterFollow>({
    _id: { type: String, default: 'singleton_footer_follow_links' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    pinterest: { type: String, default: '' },
    tiktok: { type: String, default: '' },
});

const FollowLink = models.FollowLink || model('FollowLink', FooterFollowSchema);

export default FollowLink;