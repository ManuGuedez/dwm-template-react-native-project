import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { url } from "../App";
import usePostData from "../hooks/usePostData";

export default function AddPlanet({ navigation }) {
  const [newPlanet, setNewPlanet] = useState({
    image: "",
    name: "",
    moons: "",
    moon_names: [],
    description: "",
  });
  const postData = usePostData({ url });

  const handleChange = (key, value) => {
    setNewPlanet((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreatePlanet = () => {
    if (
      !newPlanet.name.trim() ||
      !newPlanet.image.trim() ||
      !newPlanet.description.trim() ||
      !newPlanet.moons
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }
    newPlanet.moons = parseInt(newPlanet.moons);
    if (newPlanet.moon_names.length > 0) {
      console.log("moon_names: ", newPlanet.moon_names);
      newPlanet.moon_names = newPlanet.moon_names.split(", "); // lo lee en formato "nombre, nombre"
      return;
    }
    const posted = postData(newPlanet);
    if (posted) {
      navigation.reset({
        index: 0, // Indica que el stack comenzará en la página Home
        routes: [{ name: "Home" }], // Define las páginas en el stack; aquí solo queda Home
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nuevo Planeta 🪐</Text>
        <Text style={styles.text}>Nombre del planeta: </Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("name", value)}
          placeholder="Nombre del planeta..."
          value={newPlanet.name}
        />
        <Text style={styles.text}>Url de la imagen: </Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("image", value)}
          placeholder="Image url..."
          keyboardType="url"
          value={newPlanet.image}
        />
        <Text style={styles.text}>Description: </Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("description", value)}
          placeholder="Descripción..."
          multiline
          value={newPlanet.description}
        />
        <Text style={styles.text}>Moons amount: </Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("moons", value)}
          placeholder="moons amount..."
          keyboardType="numeric"
          value={newPlanet.moons}
        />
        <Text style={styles.text}>Moons: </Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={(value) => handleChange("moon_names", value)}
          placeholder="moons..."
          keyboardType="default"
          value={newPlanet.moon_names}
        />
      </View>
      <View>
        <TouchableOpacity onPress={handleCreatePlanet}>
          <View style={[styles.button]}>
            <Text style={[styles.text, { textAlign: "center" }]}>
              Create Planet
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 80,
  },
  content: {
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
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "white",
    padding: 10,
  },
  text: {
    alignSelf: "flex-start",
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    gap: 10,
  },
  inputArea: {
    backgroundColor: "pink",
    borderColor: "red",
    width: 290,
    height: 40,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 20,
  },
  button: {
    borderRadius: 10,
    width: "ajust-content",
    height: "ajust-content",
    backgroundColor: "pink",
    padding: 10,
  },
});
