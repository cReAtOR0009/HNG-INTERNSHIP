import { icons } from '@/constants';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

// interface FormFieldProps {
//   title: string;
//   value:String;
//   handleChangeText: (text: string) => void;
// }

const FormField = ({ title, value, handleChangeText, placeholder, styles, keyboardType, type }:any) => {

  const [isSecure, setIsSecure] = useState(type==="password" ?true:false)
  console.log("isSecure---------",title, isSecure)
  const name = title.toLocaleLowerCase()

  // const isSecure = type==="password"?true:false
  return (
    <View className={`space-y-2 ${styles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center'>

      <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={(value) => handleChangeText(name, value)}
        className="flex-1 text-white font-psemibold text-base"
        keyboardType={keyboardType}
        secureTextEntry={isSecure}

      />

      {type === "password" && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Image
              source={!isSecure ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;