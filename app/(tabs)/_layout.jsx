import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo ,FontAwesome,Ionicons} from '@expo/vector-icons';
import {Colors} from "../../constants/Colors.ts";

const _layouts = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor:Colors.PRIMARY,
      headerShown:false
    }}>
        <Tabs.Screen name="home" options={{
          tabBarLabel:"Home",
          tabBarIcon:({color})=><Entypo name="home" size={24} color={color} />
        }} />
        <Tabs.Screen name="explore" options={{
          tabBarLabel:"Explore",
          tabBarIcon:({color})=><FontAwesome name="search" size={24} color={color} />
        }}/>
        <Tabs.Screen name="profile" options={{
          tabBarLabel:"Profile",
          tabBarIcon:({color})=><Ionicons name="people" size={24} color={color} />
        }} />
    </Tabs>
  )
}

export default _layouts