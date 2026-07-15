import { Schema, model } from 'mongoose'

const documentSchema = new Schema({
    originalFileName:{
        type: String,
        required: true
    },
    s3Key:{
        type: String,
        required: true
    },
    uploadedAt:{
        type: Date,
        default: Date.now
    }
});

const Document = model('Document',documentSchema);

export default Document;