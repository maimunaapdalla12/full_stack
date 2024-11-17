import React, { useEffect } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";

import Dialogform from './Dialogform';
import { Button } from '@/components/ui/button';
export default function Post({ post, onDelete }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{post.content}</CardDescription>
          {post.image && <img src={post.image} alt={post.title} className="mt-4 w-full h-auto" />}
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2 mt-4">
        {/* Use a div or other element to wrap Dialogform */}
        <div>
          <Dialogform 
            postToEdit={post}
           
            buttonTitle="Update" 
            // onPostUpdate={onPostUpdate} // Uncomment if handling post update
          />
        </div>
        <Button 
          onClick={() => onDelete(post._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}