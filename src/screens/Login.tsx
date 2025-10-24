/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { signIn, signOut, signUp } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Login = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }
    try {
      const user = await signUp({ email, password });
      console.log('User signed up:', user);
      navigation.replace('Home');
    } catch (err) {
      console.error('Error in sign up:', err);
    }
    finally{
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and password are required.');
      return;
    }
    try {
      const user = await signIn({ email, password });
      console.log('User signed in:', user);
      navigation.replace('Home');
    } catch (err) {
      console.error('Error in sign in:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut();
      console.log('User signed out');
    } catch (err) {
      console.error('Error in sign out:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3498db',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  signupButton: { backgroundColor: '#2ecc71' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
