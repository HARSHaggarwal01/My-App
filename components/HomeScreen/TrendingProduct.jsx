import { View, Text ,StyleSheet, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from "../../constants/Colors.ts";
import {getTrendingProduct} from "../../apis/GetApis.jsx";
import ProductsCard from './ProductsCard.jsx';
import { useRouter } from 'expo-router';

const TrendingProduct = () => {

    const [getData,setData] = useState([]);
    const router = useRouter();
    
    useEffect(()=>{
        const fetchData = async () =>{
            const trending = await getTrendingProduct();
            setData(trending);
        }

        fetchData();
    },[]);

    const processedData = getData
    .sort((a, b) => b.id - a.id) // Sort by id in descending order
    .slice(0, 6);
    
  return (
    <View>
    <View style={styles.headerContainer}>
      <Text style={styles.categoryText}>Trending Products</Text>
      <Text style={styles.viewAllText} onPress={()=>router.push('/product')}>View All</Text>
    </View>
    <FlatList 
        data={processedData}
        numColumns={2}
        renderItem={({item,index})=>(
            
            <ProductsCard products={item} key={index} onPressProduct={()=>router.push(`/productDetails/${item.slug}`)}/>
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
        marginBottom: 10,
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

export default TrendingProduct