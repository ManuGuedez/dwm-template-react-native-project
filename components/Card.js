import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

export default function Card({ info }) {
  const navigation = useNavigation();
  const [imageLoading, setImageLoading] = useState(false);

  const handleGoDetails = () => {
    const planet_id = info.id;
    navigation.navigate("Details", { planet_id });
  };

  return (
    <TouchableOpacity onPress={handleGoDetails}>
      <View style={[styles.cardContainer, styles.smallCardContianer]}>
        <View>
          <Text style={styles.title}>{info.name}</Text>
        </View>
        <View>
          {/* {imageLoading && <ActivityIndicator size="small" color="white" />} */}
          <Image
            source={{ uri: info?.image }}
            style={styles.image}
            contentFit="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "black",
    borderRadius: 15,
    padding: 10,
    gap: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  button: {
    backgroundColor: "#c2cffa",
    borderRadius: 5,
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  smallCardContianer: {
    width: 220,
    height: "ajust-content",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});
