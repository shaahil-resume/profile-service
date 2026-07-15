import express from 'express'
import resume from '../models/resume.model.js'
import { client } from '../config/redis.config.js'
import {uploadResumePdf,getResumePdfUrl} from '../services/resumePdf.service.js'
import multer from 'multer';

const router = express.Router();


const addToArray = async (fieldName, data) => {
    const updated = await resume.findOneAndUpdate(
        {},
        { $push: { [fieldName]: data } },
        { new: true }
    )
    await client.del('resume:shaahil')
    return updated
}

router.get('/', async (req, res) => {
    try{
        let profileData = await client.get(`resume:shaahil`);
        if (!profileData) {
            console.log("there is no profile data.");
            console.log("loading the data from db ");
            profileData = await resume.findOne({});
            await client.setEx(`resume:shaahil`,3600,JSON.stringify(profileData));
        }else{
            console.log('loading from redis');
            profileData = JSON.parse(profileData)
        }
        return res.json(profileData);
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.put('/', async (req, res) => {
  try{
   const reqBody = req.body;
   const updatedData = await resume.findOneAndUpdate({},
      {$set: reqBody},
      {new: true}
   );
      await client.del('resume:shaahil');
      return res.json(updatedData);
  }catch(err){
      console.error(err);
      res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/experience', async (req, res) => {
    try {
        const updated = await addToArray('experience',req.body);
        return res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/education', async (req, res) => {
    try {
        const updated = await addToArray('education',req.body);
        return res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/projects', async (req, res) => {
    try {
        const updated = await addToArray('projects',req.body);
        return res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/certification', async (req, res) => {
    try {
        const updated = await addToArray('certification',req.body);
        return res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})


router.post('/skills', async (req, res) => {
    try {
        const updated = await addToArray('skills',req.body);
        return res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})

const upload = multer({ storage: multer.memoryStorage() });

router.post('/resume-pdf', upload.single('file'),
    async (req, res) => {
    try{
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
        const updated = await uploadResumePdf(req.file.buffer,req.file.originalname)
        return res.status(201).json(updated);
    }catch(err){
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.get('/getResumePdf', async (req, res) => {
    try{
        console.log('getResumePdf')
        const url = await getResumePdfUrl();
        return res.json(url);
    }catch(err){
        console.error(err);
        if (err.message === 'Unable to get resume pdf') {
            return res.status(404).json({ message: 'No resume uploaded yet' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;