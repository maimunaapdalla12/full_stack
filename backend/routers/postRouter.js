import express from 'express';
import { createPost ,getUserPost,deletePosts,updatePost} from '../controllers/postController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import upload from '../middleware/Upload.js';


const PostRouter = express.Router();

// Route to create a post with authentication and file upload
PostRouter.post('/create-Post', authenticate,upload.single('image'),createPost);
PostRouter.get('/get-user-Posts', authenticate,getUserPost);
PostRouter.delete('/delete-Posts/:id', authenticate,deletePosts);
PostRouter.post('/UPdate-Post/:id', upload.single('image'),authenticate,updatePost);


export default PostRouter;
