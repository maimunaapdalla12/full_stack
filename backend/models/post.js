import mongoose from "mongoose"
import validator from "validator";
const { Schema } = mongoose

const PostSchema = new Schema ({
    title:{
        type : String ,
        required: true,

    },
    content:{
        type: String,
        required : true,
        validate:  [value => value.length < 500,
            'content should be up to up 500 charcters log']
    },
    
        image:{
            type: String,
            default:null

        },
        author:{
            type: Schema.Types.ObjectId,
            ref:'User',
            required: true

            
        }
    
})

const Post = mongoose.model('post', PostSchema);
export default Post;

