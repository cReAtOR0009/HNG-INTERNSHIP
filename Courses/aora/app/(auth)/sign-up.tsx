import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from "../../components/FormField"
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router'
import {createUser, getCurrentUser} from "../../lib/appwrite"


const SignUp = () => {

  const router = useRouter()

  const [form, setForm] = useState({
      username:"",
      email:"",
      password:"",
      confirm_password:""
      })
    
  const [submitting, setIsSubmitting] = useState(false)

  const handlesetForm = (name:any, value:String) => {
    setForm(({ ...form, [name]: value }));
  };

  
  const handleSubmit = async () => {
    // await signOut()
    if (!form.username || !form.password || !form.email || !form.confirm_password) {
      return  Alert.alert("Error", "Ensure all fields are properly filled") 
    }

    if (form.password !== form.confirm_password) {
    return  Alert.alert("Error", "passwords dont match")
    }

    try {
      
      setIsSubmitting(true)
      await createUser(form.email, form.password, form.username)
      setIsSubmitting(false)
  
      router.replace("/home")

    } catch (error:any) {
         Alert.alert("Error", error.message);
          setIsSubmitting(false)
    }


  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View  className=' items-center h-full- px-4 h-[100vh]'>
           <Image source={images.logo}
              className='w-[130px] h-[84px] bg'
              resizeMode='contain'
            />
            <Text className='text-2xl text-white text-semibold mt-5 font-psemibold text-center'> Sign up to Aora</Text>
        
        <FormField
          title="Username"
          value={form.username}
          handleChangeText ={handlesetForm}
          placeholder="Your Username Here"
          styles="mt-7"
          keyboardType={"default"}
          type={"username"}
        />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText ={handlesetForm}
          placeholder="Your Email Here"
          styles="mt-5"
          keyboardType={"email-address"}
          type={"email"}
        />
         <FormField
          title="Password"
          value={form.password}
          handleChangeText ={handlesetForm}
          placeholder="your Password Here"
          styles="mt-5"
          keyboardType={"default"}
          type={"password"}
        />

<FormField
          title="Confirm_Password"
          value={form.confirm_password}
          handleChangeText ={handlesetForm}
          placeholder="type your Password Here again"
          styles="mt-5"
          keyboardType={"default"}
          type={"password"}
        />

<CustomButton  title="Sign Up" 
          handlePress={handleSubmit}
          containerStyles="mt-7 w-full text-center"
          textStyles=" "
          isLoading = {submitting}/>

       <View className='justify-center pt-5 flex-row gap-2'>
                <Text className='text-lg text-gray-100 font-pregular'>Have an account already?</Text>
                <Link href={"/sign-in"} className='text-lg font-psemibold text-secondary'>Sign In</Link>
              </View>
              </View>

      </ScrollView>

      {/* import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setProject('67a77ae9002e22542577')
    .setPlatform('com.creator.aora'); */}
    {/* // "package": "com.creatorsage.Aora" */}

        <Text>

      SignIn
        </Text>
    </SafeAreaView>
  )
}

export default SignUp