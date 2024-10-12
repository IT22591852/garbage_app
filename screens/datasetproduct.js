import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const datasetproduct = () => {
    const navigation = useNavigation();

  // Sample products data instead of fetching from Firebase
  const [products, setProducts] = useState([
    {
      id: '1',
      product: 'Recycled Plastic Pellets',
      unitPrice: '$50/kg',
      requirement: '100kg',
      imageUri: 'https://example.com/sample1.jpg', // Replace with valid image URL or local image path
    },
    {
      id: '2',
      product: 'Plastic Waste',
      unitPrice: '$30/kg',
      requirement: '500kg',
      imageUri: 'https://example.com/sample2.jpg',
    },
    {
      id: '3',
      product: 'Recycled Bottles',
      unitPrice: '$10/pack',
      requirement: '200 packs',
      imageUri: 'https://example.com/sample3.jpg',
    },
  ]);

  // Handle image error by setting a fallback image for the specific product
  const handleImageError = (productId) => {
    const fallbackImage = require("../assets/recycled-plastics.jpg"); // Fallback image path

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, imageUri: Image.resolveAssetSource(fallbackImage).uri }
          : product
      )
    );
};
  return (
    <SafeAreaView style={styles.container}>
    {/* Top Header */}
    <View style={styles.header}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.headerText}>Ashokan Kuganathan</Text>
      <TouchableOpacity style={styles.LogoutButton} onPress={() => console.log('Logout')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>

    {/* Navigation Tabs */}
    <View style={styles.navTabs}>
      <TouchableOpacity onPress={() => navigation.navigate("AccountScreen")}>
        <Text style={styles.navTab}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Security")}>
        <Text style={styles.navTab}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UpdateCardScreen")}>
        <Text style={styles.navTab}>Payment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
        <Text style={styles.navTab}>Transaction</Text>
      </TouchableOpacity>
    </View>

    {/* Add Product Button
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("NewProduct");
        }}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View> */}

    {/* Products List */}
    <ScrollView style={styles.productsList}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <Image
            source={{ uri: product.imageUri }}
            style={styles.productImage}
            onError={() => handleImageError(product.id)}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.product}</Text>
            <Text style={styles.productPrice}>{product.unitPrice}</Text>
            <Text style={styles.productQuantity}>{product.requirement}</Text>
          </View>
          <View style={styles.productActions}>
            {/* <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  "Confirm Delete",
                  "Are you sure you want to delete this product?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Delete canceled"),
                      style: "cancel",
                    },
                    {
                      text: "Delete",
                      onPress: () => {
                        setProducts((prevProducts) =>
                          prevProducts.filter((p) => p.id !== product.id)
                        );
                      },
                      style: "destructive",
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                navigation.navigate("NewProduct", {
                  productId: product.id,
                  productDetails: product,
                });
              }}
            >
              <Text style={styles.buttonText}>get</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>

    {/* Bottom Navigation */}
    <View style={styles.bottomNavigation}>
      <TouchableOpacity onPress={() => navigation.navigate("AdminProductsScreen")}>
        <Image source={require("../assets/home.png")} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require("../assets/calendar.png")} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Collection")}>
        <Image source={require("../assets/cargo-truck-g.png")} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require("../assets/alarm.png")} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AccountScreen")}>
        <Image source={require("../assets/profile.png")} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
  
};

export default datasetproduct

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      backgroundColor: "#027148",
    },
    logo: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "right",
      marginRight: 10,
    },
    navTabs: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: "#e0e0e0",
    },
    navTab: {
      fontSize: 16,
      fontWeight: "500",
      color: "#333",
    },
    productsList: {
      flex: 1,
      paddingHorizontal: 10,
    },
    productCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 3,
    },
    productImage: {
      width: "100%",
      height: 150,
      borderRadius: 10,
    },
    productInfo: {
      marginTop: 10,
    },
    productTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    productPrice: {
      fontSize: 16,
      color: "#888",
    },
    productQuantity: {
      fontSize: 14,
      color: "#888",
    },
    productActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    deleteButton: {
      backgroundColor: "#FF6347",
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: "center",
      marginRight: 5,
    },
    LogoutButton: {
      backgroundColor: "#FF6347",
      padding: 12,
      borderRadius: 10,
      alignItems: "center",
      marginLeft: 55,
    },
    addButton: {
      backgroundColor: "#027148",
      padding: 20,
      borderRadius: 12,
      alignItems: "center",
      margin: 10,
    },
    addButtonText: {
      color: "#ffffff",
      fontWeight: "bold",
    },
    editButton: {
      backgroundColor: "#027148",
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    bottomNavigation: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
      backgroundColor: "#93E9BE",
    },
    navIcon: {
      width: 30,
      height: 30,
    },
  });