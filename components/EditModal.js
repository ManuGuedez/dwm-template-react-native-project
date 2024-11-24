import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { url } from "../App";
import useEditData from "../hooks/useEditData";

const EditModal = ({ onClose, planet }) => {
  const editData = useEditData(url);
  const [updatedPlanet, setUpdatedPlanet] = useState({});

  useEffect(() => {
    const moon_names = planet.moon_names.join(", ");
    const moons = planet.moons.toString();
    setUpdatedPlanet({ ...planet, moon_names, moons });
  }, []);

  const handleChange = (key, value) => {
    setUpdatedPlanet((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditPlanet = async () => {
    updatedPlanet.moons = parseInt(updatedPlanet.moons);
    if (updatedPlanet.moon_names.length > 0) {
      updatedPlanet.moon_names = updatedPlanet.moon_names.split(", ");
    } else {
      updatedPlanet.moon_names = [];
    }
    const edited = await editData(updatedPlanet);
    if (edited) {
      onClose(edited);
    } else {
      alert("Error al editar el planeta");
    }
  };

  return (
    <Modal transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPressOut={() => onClose(planet)}
        />
        <View style={styles.modalContent}>
          <Text style={styles.title}>Editar planeta</Text>
          <View />
          <Text style={styles.text}>Nombre del planeta: </Text>
          <TextInput
            style={styles.inputArea}
            onChangeText={(value) => handleChange("name", value)}
            placeholder="Nombre del planeta..."
            value={updatedPlanet.name}
          />
          <Text style={styles.text}>Url de la imagen: </Text>
          <TextInput
            style={styles.inputArea}
            onChangeText={(value) => handleChange("image", value)}
            placeholder="Image url..."
            keyboardType="url"
            value={updatedPlanet.image}
          />
          <Text style={styles.text}>Description: </Text>
          <TextInput
            style={styles.inputArea}
            onChangeText={(value) => handleChange("description", value)}
            placeholder="Descripción..."
            value={updatedPlanet.description}
          />
          <Text style={styles.text}>Moons amount: </Text>
          <TextInput
            style={styles.inputArea}
            onChangeText={(value) => handleChange("moons", value)}
            placeholder="moons amount..."
            keyboardType="numeric"
            value={updatedPlanet.moons}
          />
          <Text style={styles.text}>Moons: </Text>
          <TextInput
            style={styles.inputArea}
            onChangeText={(value) => handleChange("moon_names", value)}
            placeholder="moons..."
            keyboardType="default"
            value={updatedPlanet.moon_names}
          />
          <View>
            <TouchableOpacity style={styles.button} onPress={handleEditPlanet}>
              <Text style={styles.backButtonText}>Confirmar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    height: "ajust-content",
    alignItems: "center",
    padding: 30,
    gap: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: "rgb(30, 30, 109)",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
    backgroundColor: "#607ad1",
    padding: 15,
    marginTop: 20,
  },
});

export default EditModal;
