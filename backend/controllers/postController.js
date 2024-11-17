
import cloudinary from '../config/cloudinary.js';
import Post from '../models/post.js';

 // Ensure the path is correct

export const createPost = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const { title, content } = req.body;

    let result;
    if (req.file) {
      const encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: 'image',
        transformation: [
          { width: 500, height: 500, crop: 'limit' },

        ],
        encoding:'base64'

      });

    }

    const post = new Post({
      title:title,
      content:content,
      image: result?.url || null,
      author: currentUser,
    });
     
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    console.log("Error creating post", error);
    res.status(400).send(error);
  }
};


export const getUserPost = async (req, res) => {

  try {
    const Posts = await Post.find({author:req.user.id})
    .populate({ 
      path:'author',
      model:'User',
      select: 'userName'
    
    }).sort({createdAt:-1});

    res.status(200).json(Posts);


    
  } catch (error) {
    res.status(400).json(error.message);
    
  }

}



export const deletePosts = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(200).json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const updatePost = async (req, res, next) => {
  try {
    let updatefields = {
      title: req.body.title,
      content: req.body.content
    };
    // console.log(updatefields);
    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: 'image',
        transformation: [
          { width: 500, height: 500, crop: 'limit' }
        ]
      });
      updatefields.image = result.url;
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updatefields, { new: true });
    if (!post) return next(new Error('Post not found'));

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
