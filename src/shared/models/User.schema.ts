import { Schema } from 'mongoose';

export const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        interests: [
                {
                    type: String,
                    required: true
                }
        ],
        watchedVideos: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'video'
                }
        ],
        possibleInterests: [
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
    },
    {
        timestamps: true
    }
)