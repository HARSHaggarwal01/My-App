import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For star icons
import {Colors} from "../../constants/Colors";

const ProductsCard = ({ products }) => {
  const [wishlistStatus, setWishlistStatus] = useState(products?.wishlist_status || false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={15}
          color={i <= rating ? '#FFD700' : '#D3D3D3'} // Gold for filled stars, light gray for empty
        />
      );
    }
    return stars;
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // Reset animation after completion
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleWishlistToggle = () => {
    setWishlistStatus(!wishlistStatus);
    startAnimation(); // Start animation when wishlist status changes
    // You can also implement logic here to update the wishlist status on your server or store
  };

  const animatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
        <Image source={{ uri: products?.first_image }} style={styles.image} />
        <TouchableOpacity style={styles.wishlistButton} onPress={handleWishlistToggle}>
            <FontAwesome
            name={wishlistStatus ? 'heart' : 'heart-o'} // Use filled heart if wishlist status is true, otherwise outline heart
            size={20}
            color="#e91e63"
            />
        </TouchableOpacity>
        {/* <Animated.View style={[styles.saveTag, animatedStyle]}>
            <FontAwesome name="star" size={20} color="#e91e63" />
            <Text style={styles.saveText}>Save ₹{products?.discount_amount}</Text>
        </Animated.View> */}
        <Text style={styles.tag}>{products?.product_type == "new" ? "New" : "Refurbished"}</Text>
        <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                {products?.name}
                </Text>
            </View>
            <View style={styles.ratingContainer}>
                {renderStars(products?.rating)}
            </View>
            <View style={{ marginTop: 4 }}>
                <Text style={styles.reviews}>{products?.total_review} reviews</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{products?.offer_price}</Text>
                    <Text style={styles.originalPrice}>₹{products?.sale_price}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.stock}>{products?.stock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
                </View>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    width: 180, // Set width to ensure consistent card size
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative', // Ensure tag remains on top
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 15,
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  saveTag: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#e91e63',
  },
  textContainer: {
    marginTop: 7,
    width: '100%',
  },
  text: {
    fontFamily: 'noto-black',
    fontSize: 13,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 4,
  },
  reviews: {
    fontSize: 12,
    color: Colors.GRAY,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'flex-end',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#999',
    marginLeft: 2,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  stock: {
    fontSize: 12,
  },
  tag: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#e91e63',
    color: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 12,
    fontFamily: 'noto-black',
  },
});

export default ProductsCard;
