import { View, Text, FlatList,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../apis/GetApis';
import ProductsCard from '../../components/HomeScreen/ProductsCard';
import { useNavigation ,useRouter} from 'expo-router';

const Product = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getAllProducts().then((res) => {
      setProduct(res);
    }).finally(()=>setLoading(false));

  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Products",
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={product}
        numColumns={2}
        keyExtractor={(item) => item.variant_productid.toString()}
        renderItem={({ item }) => (
          <ProductsCard products={item} onPressProduct={()=>router.push(`/productDetails/${item.slug}`)} />
        )}
      />
    </View>
  );
};

export default Product;
