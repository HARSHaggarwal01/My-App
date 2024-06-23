import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect,useState } from 'react';
import { Colors } from '../../constants/Colors';
import { getAllCategory } from '../../apis/GetApis';
import CategoryItem from './CategoryItem';
import { useRouter } from "expo-router";

const Category = () => {
    const [getCategory,setCategory]=useState([]);
    const router = useRouter();
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const data = await getAllCategory();
              if (data) { 
                setCategory(data);
              }
            } catch (error) {
              console.error('Error fetching Category data:', error);
            }
          };
        fetchData();

    },[]);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.categoryText}>Category</Text>
        <Text style={styles.viewAllText} onPress={(()=>router.push('/categoryList/Category'))}>View All</Text>
      </View>
      <FlatList 
        data={getCategory}
        showsHorizontalScrollIndicator={true}
        style={{margin:10}}
        numColumns={4}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item})=>(  
          <CategoryItem category={item} onPressCategory={() => router.push({
            pathname: `/productList/${item.id}`,
            params: { name: item.name }
          })} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginTop: 10,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'noto-black',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.PRIMARY, 
  },
});

export default Category;
