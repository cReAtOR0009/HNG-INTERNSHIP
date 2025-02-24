import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Controls() {
  return (
    <SafeAreaView edges={["bottom"]}>
        <View style={{padding:20, backgroundColor:"#333"}}>
            <Text>Controls</Text>
        </View>
    </SafeAreaView>
  )
}