export interface SocialMedia {
    instagram: string,
    facebook: string,
    linkedIn: string,
}

export interface Member {
    id?: string,
    _id?: string,
    title: string,
    position: string,
    name: string,
    imageLink: string,
    socialMedia: SocialMedia
}