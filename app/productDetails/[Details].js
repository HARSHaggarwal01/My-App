import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import { useLocalSearchParams } from 'expo-router';
import { productDetail } from "../../apis/GetApis.jsx";
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { Colors } from "../../constants/Colors.ts";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

const ProductDetails = () => {
  const { Details } = useLocalSearchParams();
  const [getProductDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [getArray, setArray] = useState([]);
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    productDetail(Details).then((res) => {
      setProductDetails(res);
    }).finally(() => {
      setLoading(false);
    });
  }, [Details]);

  const handleSelectAttribute = (variantId, attributeId) => {
    setSelectedAttributes(prevState => ({
      ...prevState,
      [variantId]: attributeId
    }));

    const index = getArray.findIndex(item => Object.keys(item)[0] === variantId.toString());

    if (index !== -1) {
      const updatedArray = [...getArray];
      updatedArray[index][variantId] = attributeId;
      setArray(updatedArray);

      const arrayOfValues = updatedArray.map(obj => Object.values(obj)[0]);

      productDetail(Details, arrayOfValues).then(res => {
        setProductDetails(res);
      }).catch(error => {
        console.error("Error fetching variant data:", error);
      });

    } else {
      const updatedItem = { [variantId]: attributeId };
      const newArray = [...getArray, updatedItem];
      setArray(newArray);

      const arrayOfValues = newArray.map(obj => Object.values(obj)[0]);

      productDetail(Details, arrayOfValues).then(res => {
        setProductDetails(res);
      }).catch(error => {
        console.error("Error fetching variant data:", error);
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={15}
          color={i <= rating ? '#FFD700' : '#D3D3D3'}
        />
      );
    }
    return stars;
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <ScrollView>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large" color="#007bff" />
        </View>
      ) : (
        <>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="return-up-back" size={30} color={Colors.GRAY} />
            </TouchableOpacity>
            <Feather name="heart" size={30} color={Colors.GRAY} />
          </View>

          {getProductDetails && getProductDetails.images && (
            <>
              <Swiper style={styles.wrapper} showsPagination={true} loop={true}>
                {getProductDetails.images.map((item, index) => (
                  <View style={styles.slide} key={index}>
                    <Image
                      source={{ uri: item }}
                      style={styles.image}
                    />
                  </View>
                ))}
              </Swiper>
              <Text style={styles.text}>{getProductDetails.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, marginLeft: 10, color: Colors.PRIMARY, fontWeight: "bold" }}>$ {getProductDetails.offer_price}</Text>
                <Text style={{ fontSize: 16, marginLeft: 10, color: Colors.RED, fontWeight: "bold", textDecorationLine: "line-through" }}>$ {getProductDetails.sale_price}</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.ratingContainer}>
                  {renderStars(getProductDetails?.rating)}
                </View>
                <View style={{ marginRight: 10 }}>
                  <Text style={styles.reviews}>{getProductDetails?.reviews.length || 0} Reviews</Text>
                </View>
              </View>
              <Text style={styles.desc}>{getProductDetails.short_description}</Text>

              {/* Variants Section */}
              {getProductDetails.variants && getProductDetails.variants.map((variant, vIndex) => (
                <View key={variant.id}>
                  <Text style={styles.variantName}>{variant.name}</Text>
                  <View style={styles.variantContainer}>
                    {variant.attribute && variant.attribute.map((attr, aIndex) => {
                      const isSelected = selectedAttributes[variant.id] === attr.id;
                      return (
                        <TouchableOpacity 
                          key={attr.id} 
                          style={[styles.attributeButton, isSelected && { backgroundColor: Colors.PRIMARY }]}
                          onPress={() => handleSelectAttribute(variant.id, attr.id)}
                        >
                          <Text style={[styles.attributeText, isSelected && { color: "#fff" }]}>
                            {attr.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}

              {/* Quantity Section */}
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityLabel}>Quantity:</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity style={styles.counterButton} onPress={handleDecreaseQuantity}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity style={styles.counterButton} onPress={handleIncreaseQuantity}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                  <View>
                    <Text> Available <Text style={{fontWeight:"bold"}}>({getProductDetails?.stock})</Text> Piece</Text>
                  </View>
                </View>
              </View>

              {/* Add to cart */}
              <View style={styles.addToCartContainer}>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add To Cart</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: '100%',
  },
  icons: {
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 10,
    width: "100%",
    marginTop: 20,
    color: "#ffffff"
  },
  text: {
    margin: 10,
    fontSize: 18,
    fontFamily: "noto-black",
  },
  desc: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
  },
  variantName: {
    fontSize: 12,
    fontWeight: "bold",
    margin: 10,
  },
  variantContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10
  },
  attributeButton: {
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: Colors.LIGHTGRAY
  },
  attributeText: {
    fontSize: 10,
    color: "#000",
    padding: 10,
    borderRadius: 12,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    gap: 3,
  },
  reviews: {
    fontSize: 12,
    color: Colors.GRAY,
    gap: 10,
  },
  quantityContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: "black"
  },
  counterButton: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  counterButtonText: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  addToCartContainer: {
    marginLeft:10,
    marginRight:10,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartButton: {
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default ProductDetails;
