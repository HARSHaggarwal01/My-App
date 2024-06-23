import { View, Text, FlatList,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllCategory } from '../../apis/GetApis';
import CategoryItem from '../../components/HomeScreen/CategoryItem';
import { useNavigation } from 'expo-router';

const Category = () => {
  const [getcategory, setCategory] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    getAllCategory().then((res) => {
        setCategory(res);
    }).finally(()=>setLoading(false));

  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Categories",
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
        data={getcategory}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem products={item} />
        )}
      />
    </View>
  );
};

export default Category;
