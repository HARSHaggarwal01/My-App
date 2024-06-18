import { View, Text, Image, StyleSheet ,TouchableOpacity} from 'react-native';
import React from 'react';

const CategoryItem = ({ category }) => {

    const splitName = category.name.split(' ');
    const name = splitName.length > 1 
        ? `${splitName[0]}\n${splitName.slice(1).join(' ')}`
        : category.name;
  
  return (
    <TouchableOpacity style={styles.container} onPress={()=>alert(category.name)}>
      <Image source={{ uri: category.image }} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20, 
  },
  text: {
    marginTop: 5,
    fontSize: 10,
    textAlign:"center",
    fontFamily: 'noto-black', 
  },
});

export default CategoryItem;
