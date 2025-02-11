import React from "react";
import { View, Text, Image } from "react-native";
import { Tabs } from "expo-router";
import icon from "../../constants/icons";

const TabIcon = ({ title, icon, color, name, focused, ...props }) => {
//   console.log("name---", name);
//   console.log("props---", props);
  // console.log("focused---", focused);
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contai"
        tintColor={color}
        className="w-5 h-5"
      />

      {/* <Text
        className={`${
          focused ? "pont-psemibold" : "font-pregular"
        } text-[8px] text-red-500`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

export default function _layout() {
  return (
    <Tabs
    screenOptions={{ 
          // this below shows a default tab bar name
        tabBarShowLabel: true,
        tabBarActiveTintColor:"#FFa001",
        tabBarInactiveTintColor:"#cdcde0",
        tabBarStyle:{
            backgroundColor:"#161622",
            borderTopWidth:1,
            borderTopColor:"#232533",
            height:60
        }

      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: (props) => (
            <TabIcon {...props} icon={icon.home} name={"Home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: true,
          tabBarIcon: (props) => (
            <TabIcon {...props} icon={icon.bookmark} name={"Bookmark"} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: true,
          tabBarIcon: (props) => (
            <TabIcon {...props} icon={icon.plus} name={"Create"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: (props) => (
            <TabIcon {...props} icon={icon.profile} name={"Profile"} />
          ),
        }}
      />
      {/* <Text className={`${}`}>_layout</Text> */}
    </Tabs>
  );
}
