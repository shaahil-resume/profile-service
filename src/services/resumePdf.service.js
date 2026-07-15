import {GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import s3Client from '../config/s3.config.js';
import Document from '../models/document.model.js';

async function uploadResumePdf(fileBuffer, originalFileName) {
    const s3Key = `resumes/${Date.now()}-${originalFileName}`;
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: 'application/pdf',
    });
    await s3Client.send(command);
    return  Document.findOneAndUpdate(
        {},
        {s3Key, originalFileName},
        {upsert: true, new: true}
    );
}

async function getResumePdfUrl() {
    let resumeData = await Document.findOne({});
    console.log('resumeData', resumeData);
    if(resumeData) {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: resumeData.s3Key,
        });
        return await getSignedUrl(s3Client, command, {expiresIn: 120});
    }
    throw new Error('Unable to get resume pdf');
}

export {uploadResumePdf,getResumePdfUrl} ;