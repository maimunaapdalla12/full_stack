import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast';
import axios from 'axios';
  
export default function Dialogform({buttonTitle,postToEdit}) {
  const [title ,setTitle] = useState('');
  const [content ,setContent] = useState('');
  const [image ,setImage] = useState(null);
  const [preview ,setPreview] = useState('');
  const [loading ,setloading] = useState('');


   const isEditing = postToEdit != null;

   useEffect(() => {
   if(isEditing){
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
    setPreview(postToEdit.image);
   }    },[])
  

     const handleImageChange = (e) => {
      const file = e.target.files[0];
    
      if(file){
   
        setImage(file);
        setPreview(URL.createObjectURL(file))
        
      }

     };

const handleSubmit = async (e) => {
      e.preventDefault();
      setloading(true);
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }
    
  
      try {

       
       let  response;


       if(isEditing){
        response = await axios.post('/api/posts/UPdate-Post/'+postToEdit._id, formData, { 
          headers: { 'Content-Type': 'multipart/form-data' }
        });
  
        setTitle('');
        setContent('');
        setImage(null);
        setPreview('');
        toast.success('Post updated successfully!');

       }else{
        response = await axios.post('/api/posts/create-Post', formData, { 
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setTitle('');
        setContent('');
        setImage(null);
        setPreview('');
        toast.success('Post created successfully!');
  

       }
        
        
        // Reset form fields after submission
      

    } catch (error) {

      console.error(error.response?.data?.message || 'Failed to create post');

    }
    finally{
      setloading(false);
    }
     }
  return (
    <Dialog>
    <DialogTrigger> 
      <Button> {buttonTitle? "upadete":"Create New Posts"} </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <form  onSubmit={handleSubmit} >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input  id="title"  value={title} onChange={(e) => 
                setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Input  id="content"  value={content} onChange={(e) => 
                setContent(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image</Label>
              <Input  type="file" id="image" accept="image/*" onChange=
              {handleImageChange} />
              {preview && <img src={preview} alt='preview'  
              className='mt-4 w-full h-auto'/>}
            </div>
            <DialogFooter>
            <div className="flex flex-col space-y-1.5">
              <Button> {loading ? "Registering Post..." : "submit Post"}</Button>
              
            </div>
            </DialogFooter>
          </div>

        </form>
    </DialogContent>
  </Dialog>
  
  )
}
