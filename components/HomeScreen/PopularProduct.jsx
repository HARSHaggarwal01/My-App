import { View, Text ,StyleSheet, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from "../../constants/Colors.ts";
import {getPopularProducts} from "../../apis/GetApis.jsx";
import ProductsCard from './ProductsCard.jsx';
import { useRouter } from 'expo-router';

const PopularProduct = () => {

    const [getData,setData] = useState([]);
    const router = useRouter();
    
    useEffect(()=>{
        const fetchData = async () =>{
            const popular = await getPopularProducts();
            setData(popular);
        }

        fetchData();
    },[]);
    
  return (
    <View>
    <View style={styles.headerContainer}>
      <Text style={styles.categoryText}>Popular Products</Text>
      <Text style={styles.viewAllText} onPress={()=>router.push('/product')}>View All</Text>
    </View>
    <FlatList 
        data={getData}
        horizontal={true}
        renderItem={({item,index})=>(
            <ProductsCard products={item} key={index} onPressProduct={()=>router.push(`/productDetails/${item.slug}`)} />
        )}
    />
  </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        paddingHorizontal: 20,
    },
    categoryText: {
        fontSize: 16,
        fontFamily: 'noto-black',
    },
    viewAllText: {
        fontSize: 14,
        color: Colors.PRIMARY, 
    },
})

export default PopularProduct