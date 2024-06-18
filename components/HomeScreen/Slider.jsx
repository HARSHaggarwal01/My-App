import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { getSlider } from '../../apis/GetApis'; // Ensure this path is correct

const Slider = () => {
  const [getData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSlider();
        if (data) { 
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text style={styles.headerText}>#Special For You</Text>

      <FlatList
        data={getData}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{paddingLeft:20}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'noto-black',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingLeft:20,
    paddingTop:20,
    marginBottom:5
  },
  image: {
    width: 300,
    height: 150,
    marginBottom: 10,
    borderRadius: 15,
    marginRight:20,
    resizeMode:"cover"
  },
});

export default Slider;
