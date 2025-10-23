import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Title, FAB, Searchbar } from "react-native-paper";
import MedicationCard from "../components/MedicationCard";
import AdBanner from "../components/AdBanner";
import { colors, spacing, typography } from "../styles";
import {
  getMedications,
  updateMedication,
  deleteMedication,
} from "../services/StorageService";

export default function MedicationsScreen() {
  const navigation = useNavigation();
  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedications();
  }, []);

  useEffect(() => {
    filterMedications();
  }, [medications, searchQuery]);

  const loadMedications = async () => {
    try {
      const meds = await getMedications();
      setMedications(meds);
    } catch (error) {
      console.error("Error loading medications:", error);
      Alert.alert("Error", "No se pudieron cargar los medicamentos");
    } finally {
      setLoading(false);
    }
  };

  const filterMedications = () => {
    if (!searchQuery.trim()) {
      setFilteredMedications(medications);
    } else {
      const filtered = medications.filter(
        (med) =>
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.dosage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMedications(filtered);
    }
  };

  const handleTakeMedication = async (medicationId) => {
    try {
      const updatedMedications = medications.map((med) => {
        if (med.id === medicationId) {
          return {
            ...med,
            status: "taken",
            lastTaken: new Date().toISOString(),
          };
        }
        return med;
      });

      await updateMedication(medicationId, {
        status: "taken",
        lastTaken: new Date().toISOString(),
      });
      setMedications(updatedMedications);

      Alert.alert("¡Excelente!", "Medicamento marcado como tomado");
    } catch (error) {
      console.error("Error taking medication:", error);
      Alert.alert("Error", "No se pudo actualizar el medicamento");
    }
  };

  const handleEditMedication = (medicationId) => {
    // Navegar a pantalla de edición
    navigation.navigate("EditMedication", { medicationId });
  };

  const handleDeleteMedication = (medicationId) => {
    Alert.alert(
      "Eliminar Medicamento",
      "¿Estás seguro de que quieres eliminar este medicamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMedication(medicationId);
              setMedications(
                medications.filter((med) => med.id !== medicationId)
              );
              Alert.alert("Eliminado", "Medicamento eliminado correctamente");
            } catch (error) {
              console.error("Error deleting medication:", error);
              Alert.alert("Error", "No se pudo eliminar el medicamento");
            }
          },
        },
      ]
    );
  };

  const renderMedication = ({ item }) => (
    <MedicationCard
      medication={item}
      onTakeMedication={handleTakeMedication}
      onEdit={handleEditMedication}
      onDelete={handleDeleteMedication}
    />
  );

  const getEmptyState = () => (
    <View style={styles.emptyState}>
      <Title style={styles.emptyTitle}>
        No tienes medicamentos registrados
      </Title>
      <Title style={styles.emptySubtitle}>
        Presiona el botón + para agregar tu primer medicamento
      </Title>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Mis Medicamentos</Title>
        <Searchbar
          placeholder="Buscar medicamentos..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Title>Cargando medicamentos...</Title>
        </View>
      ) : (
        <FlatList
          data={filteredMedications}
          renderItem={renderMedication}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={getEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("AddMedication")}
        label="Agregar Medicamento"
      />

      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.black,
    marginBottom: spacing.md,
  },
  searchbar: {
    backgroundColor: colors.white,
    elevation: 2,
  },
  listContainer: {
    padding: spacing.sm,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.gray,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.gray,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: spacing.md,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});
