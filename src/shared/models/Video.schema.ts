import { Schema, Types } from 'mongoose';

export const VideoSchema = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        topics: 
        [
            {
                type: String,
                required: true
            }
        ],
        possibleTopics: [
            {
                topic: {
                    type: String
                },
                viewCount: {
                    type: String,
                    default: 0
                },
            }
        ],
        videoName: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
)