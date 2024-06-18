import { View, Text ,Image ,TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import {Colors} from "../../constants/Colors.ts";
import { FontAwesome} from '@expo/vector-icons';

const Header = () => {
    const {user} = useUser();
  return (
    <View style={{padding:20,paddingTop:40,backgroundColor:Colors.PRIMARY,borderBottomLeftRadius:15,borderBottomRightRadius:15}}>
        <View style={{display:"flex",flexDirection:"row",alignItems:"center",gap:10}}>
            <Image source={{uri:user?.imageUrl}} style={{width:45,height:45,borderRadius:99}}/>
            <View>
                <Text style={{color:"#fff"}}>Welcome,</Text>
                <Text style={{font:19,fontFamily:"noto-black",color:"#fff"}}>{user?.fullName}</Text>
            </View>
        </View>
        <View style={{
            display:"flex",
            flexDirection:"row",
            gap:10,
            alignItems:"center",
            backgroundColor:"#fff",
            padding:10,
            marginVertical:10,
            marginTop:15,
            borderRadius:8,
        }}>
            <FontAwesome name="search" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder="Serach......" style={{fontFamily:"noto-black",fontSize:16}}/>
        </View>
    </View>
  )
}

export default Header