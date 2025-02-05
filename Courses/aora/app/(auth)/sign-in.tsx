import { View, Text, ScrollView, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from "../../constants"
import FormField from "../../components/FormField"
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'


const SignIn = () => {
   const [form, setForm] = useState({
      email:"",
      password:""  
      })

  
      const handlesetForm = (name:any, value:String) => {
        setForm(({ ...form, [name]: value }));
      };

      const handlePress = () => {
        console.log("form------", form)
      }


  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View  className='justify-between- items-center h-full- px-4 h-[95vh]'>
           <Image source={images.logo}
              className='w-[130px] h-[84px]'
              resizeMode='contain'
            />
            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold text-center'> Log in to Aora</Text>
      
        <FormField
          title="Email"
          value={form.email}
          handleChangeText ={handlesetForm}
          placeholder="tour Email Here"
          styles="mt-7"
          keyboardType={"email-address"}
          type={"email"}
        />
         <FormField
          title="Password"
          value={form.password}
          handleChangeText ={handlesetForm}
          placeholder="your Password Here"
          styles="mt-7"
          keyboardType={"default"}
          type={"password"}
        />

        <CustomButton  title="Sign in" 
          handlePress={handlePress}
           containerStyles="w-full mt-7"
          textStyles=""
          isLoading = {false}/>

        <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>Dont have an account?</Text>
          <Link href={"/sign-up"} className='text-lg font-psemibold text-secondary'>Sign Up</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn