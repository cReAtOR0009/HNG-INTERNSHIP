import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../constants"
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

const RootLayout = () => {

  const {isLoading, isLoggedIn} = useGlobalContext()

  console.log("isloading from rootLayout--", isLoading, "isLoggedIn from RootLayout---", isLoggedIn)

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View className='justify-between items-center h-full- px-4 h-[95vh] bg-white-'>
          <View className='w-full  justify-center items-center'>

          <Image source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />

          <Image source={images.cards}
            className='max-w-[380px] w-full h-[300px] '
            resizeMode='contain'
          /> 

          <View className='relative mt-5 bg-white- -z-2'>
            <Text className='text-3xl text-white font-bold text-center'>
              Discover Endless possibilities with
              <Text> Aora</Text>
            </Text>

            <Image
            source={images.path}
            resizeMode='contain'
            className='absolute -bottom-2.5 -right-10 z-10 top h-[15px] w-[136px] '
            />

          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          </View>
          

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7" textStyles={'undefined'}
             isLoading={false} 
                      />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
      {/* <Text className="text-3xl text-[#34d399]">
      Creator!
      <StatusBar style='auto' />
      </Text>

      <Link href="/home" style={{color:"blue"}}>Home page</Link> */}
    </SafeAreaView>
  );
};

export default RootLayout;


// const styles = StyleSheet.create({})


// import React from 'react';
// import { Image, StyleSheet, Platform, View, Text,  } from 'react-native';
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <>
//     <View>
//       <Text>My first App2</Text>
//     </View>
//     </>
//   );
// }

