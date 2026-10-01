import mongoose, { Schema } from "mongoose";


export interface IEvent {
    title: string;
    slug: string;
    category: string;
    publishedStatus: boolean;
    coverImage: string;
    date: Date;
    shortDescription: string;
    longDescription: string;
    
}

const eventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["event", "news", "achievement"],
    },
    publishedStatus: {
        type: Boolean,
        default: false,
    },
    coverImage: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    shortDescription: {
        type: String,
      
    },
    longDescription: {
        type: String,
        
    },

}, { timestamps: true });

export const Event = mongoose.model<IEvent>("Event", eventSchema);