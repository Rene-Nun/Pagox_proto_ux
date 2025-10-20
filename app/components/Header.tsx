import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// Suponiendo que usas un paquete de íconos como lucide-react-native
// Si usas SVGs o PNGs para el ícono, se ajusta la importación.
import { User } from 'lucide-react-native'; 

const ICON_SIZE = 28;
const ICON_CONTAINER_SIZE = 40;

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 1. Elemento Izquierdo (Placeholder para balancear) */}
        <View style={styles.sideContainer} />

        {/* 2. Logo Centrado */}
        <View style={styles.centerContainer}>
          <Image
            // Asegúrate que la ruta a tu asset sea correcta
            source={require('../assets/logo_turista_principal.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* 3. Elemento Derecho (Ícono de Usuario) */}
        <View style={[styles.sideContainer, styles.rightAlign]}>
          <TouchableOpacity style={styles.iconButton}>
            <User color="#333" size={ICON_SIZE} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF', // O el color de fondo de tu app
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60, // Altura estándar para un header
  },
  sideContainer: {
    flex: 1, // Ocupa 1/3 del espacio
  },
  centerContainer: {
    flex: 2, // Ocupa 2/3 del espacio para darle más aire al logo
    alignItems: 'center', // Centra el logo horizontalmente dentro de su contenedor
  },
  rightAlign: {
    alignItems: 'flex-end', // Alinea el contenido a la derecha
  },
  logo: {
    height: 30,
    width: 120, // Ajusta el ancho según tu logo
  },
  iconButton: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
