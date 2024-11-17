import React, { useEffect, useState } from 'react';
import Dialogform from './Dialogform.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import Post from './post.jsx';

export default function Posts() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const readUserPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/posts/get-user-Posts');
        setPostData(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch posts');
        console.log('Fetch posts error', error.response?.data);
        setLoading(false);
      }
    };
    readUserPosts();
  }, []);

const handleDelete = async(postID)=>{
    if(!confirm("are you sure")) return;
    const previousPosts =[...postData];
    const updatePosts = postData.filter(post => post._id != postID) 
    setPostData(updatePosts)

      try {

          const { data } = await axios.delete(`/api/posts/delete-Posts/${postID}`);
           setLoading (true);

      }  catch (error) {
          //  setPostData(previousPosts)
            toast.error(response.data.message || 'Failed to fetch posts');
            console.log('Fetch posts error', error.response?.data);
           setLoading(false);
                  }


}



  return (
    <div>
      <Dialogform
      
      
      
      />

      {loading && <h1>Loading...</h1>}

      <div className='grid grid-cols-3 gap-4'>
        {postData.map(post => (
          <Post 
          key={post._id}
          post={post}
          onDelete={handleDelete}
        />
        ))}
      </div>
      
    </div>
  );
}
