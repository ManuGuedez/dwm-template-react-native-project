import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import useGetData from "../hooks/useGetData";
import { url } from "../App";
import { useIsFocused } from "@react-navigation/native";
import { getPathDataFromState } from "expo-router/build/fork/getPathFromState";


export default function HomePage({navigation, route}) {
  const { getData, data, loading, error } = useGetData({ url });
  const isIOS = Platform.OS === 'ios';
  const isAndroid = Platform.OS === 'android';
  const isFocused = useIsFocused();
  const [sortPlanets, setSortPlanets] = useState(false);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getData();
      setSortPlanets(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (data) {
      setPlanets(data);
    }
  }, [data]);

  const handleOrdenar = () => {
    planets.sort((a, b) => b.moons - a.moons)
    setSortPlanets(true) // cambio de estado para que se renderice
  }

  const handleAddPlanet = () => {
    navigation.navigate("AddPlanet")
  }

  const platformTextStyles = () => {
    if (isIOS) {
      return [styles.text, styles.iosText];
    } else if (isAndroid) {
      return [styles.text, styles.androidText];
    }
    return styles.text
  }

  const platformAddMessage = () => {
    if (isIOS) {
      return "Crear planeta";
    } else if (isAndroid) {
      return "Agregar planeta";
    }
    return "Add planet"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planets 🪐</Text>
      <View style={ isIOS ? [styles.buttonsContainer, styles.iosLayout] : styles.buttonsContainer}>
        <TouchableOpacity onPress={handleAddPlanet}>
          <View style={[styles.button, isIOS ? styles.iosButton : isAndroid ? styles.button : styles.button]}>
            <Text style={platformTextStyles()}>{platformAddMessage()}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOrdenar}>
          <View style={[styles.button]}>
            <Text style={platformTextStyles()}>Ordenar planetas</Text>
          </View>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="small" color="black" />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
      <ScrollView style={styles.scroll}>
        {Array.isArray(planets) &&
          planets.map((planet) => <Card key={planet.id} info={planet}/>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    backgroundColor: "lightblue",
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 15,
  },
  scroll: {
    gap: 10
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30
  },
  iosLayout: {
    flexDirection: "row-reverse" 
  },
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "white",
    padding: 10
  },
  text:{
    fontSize: 18,
    fontWeight: "bold"
  },
  iosButton: {
    backgroundColor: "lightgreen"
  },
  iosText:{
    color: "black"
  },
  androidText: {
    color: "#607ad1"
  }
});
