/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { signOut } from '../services/authService';
import { useAuth } from '../context/AuthContext';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { user } = useAuth();

  const handleLogOut = async () => {
    try {
      await signOut();
      console.log('User signed out');
      navigation.replace('Login');
    } catch (err) {
      console.error('Error in sign out:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.userEmail}>{user?.email}</Text>
      <Button
        title="Logout"
        onPress={() =>
          Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: handleLogOut,
            },
          ])
        }
      />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Go to Dashboard"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  userEmail: { fontSize: 18, marginBottom: 40 },
});
