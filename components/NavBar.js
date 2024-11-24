import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

const NavBar = ({ activePage }) => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.reset({
      index: 0, 
      routes: [{ name: "Home" }], 
    });
  };

  return (
    <View style={styles.navBar}>
      <View style={styles.navBarIcons}>
        <Ionicons
          name={activePage === "home" ? "home" : "home-outline"}
          size={35}
          color="#c2cffa"
          onPress={() => navigation.navigate("Home")}
        />
        <Ionicons
          name={activePage === "search" ? "search" : "search-outline"}
          size={35}
          color="#c2cffa"
          onPress={() => navigation.navigate("Search")}
        />
        <Ionicons
          name={activePage === "add" ? "add-circle" : "add-circle-outline"}
          size={35}
          color="#c2cffa"
          onPress={() => navigation.navigate("Add")}
          r
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingBottom: 30,
    backgroundColor: "#607ad1",
  },
  navBarIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default NavBar;
