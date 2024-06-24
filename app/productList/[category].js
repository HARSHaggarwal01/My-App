import { View, Text, FlatList ,Image,ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getAllCategory, getAllProducts } from '../../apis/GetApis';
import CategoryItem from '../../components/HomeScreen/CategoryItem';
import ProductCard from '../../components/HomeScreen/ProductsCard';
import {useRouter} from "expo-router";

const CategoryList = () => {
  const { category, name ,brandId} = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [getCategory, setCategoryList] = useState([]);
  const [getProduct, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)

    if(!brandId){
      getAllCategory(category).then((res) => {setCategoryList(res);}).finally(() => setLoading(false));

      getAllProducts(category).then((res) => {setProduct(res);}).finally(() => setLoading(false));

    }else{
      getAllProducts(null,brandId).then((res) => {setProduct(res);}).finally(() => setLoading(false));
    }

  }, [category]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: name,
    });
  }, [navigation, name]);

  const renderCategory = ({ item }) => <CategoryItem category={item} onPressCategory={() => router.push({
    pathname: `/productList/${item.id}`,
    params: { name: item.name }
  })}/>;

  const renderProduct = ({ item }) => <ProductCard products={item}  onPressProduct={()=>router.push(`/productDetails/${item.slug}`)}/>;

  const ListHeaderComponent = () => (
    <>
      {getCategory.length > 0 && Array.isArray(getCategory) && (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>
            Sub Categories
          </Text>
          <FlatList
            data={getCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            style={{ marginVertical: 10 }}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategory}
          />
        </>
      )}
      {Array.isArray(getProduct) && getProduct.length > 0 && (
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 20 ,marginBottom:10}}>
          Products
        </Text>
      )}
    </>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    Array.isArray(getProduct) && getProduct.length > 0  ? (
      <FlatList
          data={getProduct}
          numColumns={2}
          keyExtractor={(item) => item.variant_productid.toString()}
          renderItem={renderProduct}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          
      />
    ) : (
        <Image source={require('../../assets/images/no-product-found.jpeg')} style={{width:'100%',height:'50%',marginTop:100}}/>
    )
  
  );
};

export default CategoryList;
