import { Schema, model } from 'mongoose'

const experienceSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    project: String,
    image: String,
    role: {
        type: String,
        required: true
    },
    location: String,
    from: String,
    to: String,
    bullets: [String],
    tech: [String],
    contributions: [String]
});

const educationSchema = new Schema({
    university: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    to: String,
});

const certificationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    issuer: String,
    expiry: String,
    certificateId: String
})

const projectSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    description : [String],
    github: String,
    tech: [String],
    from: String,
    to: String
})

const skillsSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    items: [String]
})

const resumeSchema = new Schema({
    name: String,
    title : String,
    location : String,
    email: String,
    phone: String,
    github: String,
    linkedin: String,
    summary : String,
    experience : [experienceSchema],
    education : [educationSchema],
    certifications : [certificationSchema],
    projects : [projectSchema],
    skills : [skillsSchema]
}, { timestamps: true })

const resume = model('Resume',resumeSchema);

export default resume;