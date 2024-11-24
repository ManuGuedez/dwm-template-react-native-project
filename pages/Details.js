import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useGetData from "../hooks/useGetData";
import { url } from "../App";
import { Image } from "expo-image";
import useDeleteData from "../hooks/useDeleteData";
import EditModal from "../components/EditModal";

export default function Details({ route, navigation }) {
  // const current_url = url + `/${route.params.planet_id}`;
  const { data, loading, error } = useGetData({ url: url + '/' + route.params.planet_id });
  const [imageLoading, setImageLoading] = useState(false);
  const deleteData = useDeleteData(url);
  const [planet, setPlanet] = useState(null);
  const [showEditPlanet, setShowEditPlanet] = useState(false);

  useEffect(() => {
    setPlanet(data);
  }, [data]);

  const handleDelete = async () => {
    const deleted = await deleteData(planet);
    if (deleted) {
      navigation.reset({
        index: 0, // Indica que el stack comenzará en la página Home
        routes: [{ name: "Home" }], // Define las páginas en el stack; aquí solo queda Home
      });
    } else {
      alert("Error al eliminar el planeta");
    }
  };

  const handleUpdatedPlanet = (updatedPlanet) => {
    setPlanet(updatedPlanet); 
    setShowEditPlanet(false);
  }

  return (
    <View style={styles.contentContainer}>
      {loading && <ActivityIndicator size="small" color="black" />}
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}

      <Text style={styles.title}>{planet?.name}</Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.generalInfoContainer}
      >
        <View>
          <Text style={[styles.generalInfoText, styles.label]}>
            Description:
          </Text>
          <Text style={styles.generalInfoText}>{planet?.description}</Text>
        </View>
        <View>
          <Text style={[styles.generalInfoText, styles.label]}>Moons:</Text>
          <Text style={styles.generalInfoText}>
            {"\t-  "}
            {planet?.moons}
          </Text>
        </View>
        <View>
          {planet?.moons !== 0 && (
            <Text style={[styles.generalInfoText, styles.label]}>
              Moon names:
            </Text>
          )}
          {planet?.moon_names?.map((moon, index) => {
            return (
              <Text key={index} style={styles.generalInfoText}>
                {"\t-  " + moon}
              </Text>
            );
          })}
        </View>
        <View>
          {imageLoading && <ActivityIndicator size="large" color="blue" />}
          <Image
            source={{ uri: planet?.image }}
            style={[styles.smallImage]}
            contentFit="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <View style={[styles.button, styles.deleteButton]}>
            <Text style={styles.text}>delete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowEditPlanet(true)}>
          <View style={[styles.button, styles.editButton]}>
            <Text style={styles.text}>edit</Text>
          </View>
        </TouchableOpacity>
      </View>
      {showEditPlanet && <EditModal planet={planet} onClose={handleUpdatedPlanet} />}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
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
    marginBottom: 10,
  },
  generalInfoContainer: {
    width: 350,
    padding: 20,
    gap: 15,
  },
  generalInfoText: {
    fontSize: 18,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  smallImage: {
    width: 300,
    height: 300,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 55,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "white",
    width: 100,
    padding: 10,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "lightpink",
  },
  editButton: {
    backgroundColor: "#607ad1",
  },
});
