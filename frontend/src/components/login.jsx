
import React,{useEffect, useState} from 'react' 
import {
    Card, CardContent,CardDescription,CardHeader,CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'



const login = () => {
  
       
  const [formData,setformData]= useState({
  
    email:"",
    password:"",
  })

  const {login,user} = useUser();

  useEffect(()=>{
    if(user)navigate('/');

  },[])




  const [loading,setloading]=useState(false);
  const navigate = useNavigate()

  const handleInputChange = (event) =>{

    
      setformData({
       ...formData,
        [event.target.id]:event.target.value

      })

  }

  const hadlesubmit =async (event)=>{
    event.preventDefault();
    setloading(true);
    try {
      const {data} = await axios.post('/api/user/loginUser',formData);
      console.log(data)
      toast.success("successfully login");
      setloading(false);
      login(data,data.expiresIn)
      navigate('/')

      
    } catch (e) {
      toast.error(e.response.data);
      console.error(e);
      
    }

  }




  return (
    <div className=' w-full shadow-lg '>
    <Card >
  <CardHeader>
    <CardTitle>Login with your Info</CardTitle>
    <CardDescription>login with your email and password</CardDescription>
  </CardHeader>
  <CardContent>
  <form  onSubmit={hadlesubmit} >
          <div className="grid w-full items-center gap-4">
           
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">email</Label>
              <Input onChange={handleInputChange}  id="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">password</Label>
              <Input  onChange={handleInputChange}  id="password" placeholder="Enter your password" />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Button> {loading ? "Logining..." : "login"}</Button>
              
            </div>
          </div>
        </form>
  </CardContent>
  
</Card>
</div>

  )
}

export default login