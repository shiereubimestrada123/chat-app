import { useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ShowLoader, HideLoader } from '@/store/slices/loaderSlice'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { LoginUser, RegisterUser } from "@/apicalls"
import { User } from "@/types";

export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const [login, setLogin] = useState<User>({
    email: "",
    password: "",
  });

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [tab, setTab] = useState('login')

  const handleLogin = async () => {
    try {
      dispatch(ShowLoader());
      const response = await LoginUser(login);
      dispatch(HideLoader());
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", response.data);
        navigate('/home');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error((error as Error).message);
    }
  };

  const handleRegister = async () => {
    try {
      dispatch(ShowLoader());
      const response = await RegisterUser(register);
      dispatch(HideLoader());
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("token", response.data);
        navigate('/home');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoader());
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-400">
      <Tabs defaultValue={tab} className="w-[400px]" onValueChange={(value) => setTab(value)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='register'>Register</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <Card>
            <CardContent className="pt-4 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" onChange={(e) => setLogin({ ...login, email: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setLogin({ ...login, password: e.target.value })} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='register'>
          <Card>
            <CardContent className="pt-4 space-y-2">
              <div className="space-y-1">
                <Label htmlFor="user">User</Label>
                <Input id="user" type="text" placeholder="Enter your name" onChange={(e) => setRegister({ ...register, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" onChange={(e) => setRegister({ ...register, email: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">New password</Label>
                <Input id="password" type="password" placeholder="Enter your password" onChange={(e) => setRegister({ ...register, password: e.target.value })} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRegister}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
