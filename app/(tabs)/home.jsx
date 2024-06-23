import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/HomeScreen/Header';
import Slider from '../../components/HomeScreen/Slider';
import Category from '../../components/HomeScreen/Category';
import PopularProduct from '../../components/HomeScreen/PopularProduct';
import Brand from '../../components/HomeScreen/Brand';
import TrendingProduct from '../../components/HomeScreen/TrendingProduct';

const Home = () => {
  const sections = [
    { key: 'slider', component: <Slider /> },
    { key: 'category', component: <Category /> },
    { key: 'popularProduct', component: <PopularProduct /> },
    { key: 'brand', component: <Brand /> },
    { key: 'tredningProduct', component: <TrendingProduct /> },
  ];

  const renderItem = ({ item }) => <View style={styles.section}>{item.component}</View>;

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 50, 
  },
  section: {
    marginBottom: 10, 
  },
});

export default Home;
