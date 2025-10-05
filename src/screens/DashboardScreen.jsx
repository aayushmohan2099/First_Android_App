// src/screens/DashboardScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = ({ route }) => {
  const { userType } = route.params || { userType: 'User' };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>"{userType}" User Logged in Successfully!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center', padding:20, backgroundColor:'#fff' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center' }
});

export default DashboardScreen;
