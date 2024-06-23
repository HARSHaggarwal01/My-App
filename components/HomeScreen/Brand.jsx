import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { brand } from '../../apis/GetApis';
import { useRouter } from "expo-router";

const Brand = () => {
  const [getBrand, setBrand] = useState([]);
  const router = useRouter();
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await brand();
        if (data) {
          setBrand(data);
        }
      } catch (error) {
        console.error('Error fetching Brand data:', error);
      }
    };
    fetchData();
  }, []);

  const onPressCategory = (item) => {
    router.push({
      pathname: `/productList/${item.id}`,
      params: { name: item.name ,brandId:item.id}
    });
  };

  const renderBrand = ({ item }) => (
    <TouchableOpacity style={styles.container} onPress={() => onPressCategory(item)}>
      <Image source={{ uri: item?.image }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.categoryText}>Brands</Text>
      </View>
      <FlatList 
        data={getBrand}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBrand} 
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
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'noto-black',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  container: {
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 10, 
    marginBottom: 5,
    resizeMode: 'cover'
  },
  text: {
    fontSize: 14,
    fontFamily: 'noto-regular',
  },
});

export default Brand;
