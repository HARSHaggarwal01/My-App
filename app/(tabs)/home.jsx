import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../components/HomeScreen/Header';
import Slider from '../../components/HomeScreen/Slider';
import Category from '../../components/HomeScreen/Category';
import PopularProduct from '../../components/HomeScreen/PopularProduct';

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Slider />
        <Category />
        <PopularProduct />
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 50, // Ensures space at the bottom when scrolling
  },
});

export default Home;
