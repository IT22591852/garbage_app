import React, { useState } from "react";
import {Text,View,TextInput,StyleSheet, Button,TouchableOpacity} from "react-native";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../Services/firebaseAuth';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function RegisterScreen({navigation}) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('');
  //state for displaying the error
  const [error,setError]=useState('');

// Onclick function for register
  const handleRegister=()=>{
    setError('');
    // console.log(email,password);
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
      const user=userCredentials.user;
      console.log(user);
      navigation.navigate('Dashboard');
      //local storage asyn storage
      // AsyncStorage.setItem("user",JSON.stringify(user))
    })
    .catch((error)=>{
      // console.log(error)
      setError(error.message);
  })
  }

  const goToLogin=()=>{
    navigation.navigate('Login')
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>RegisterScreen</Text>
          <TextInput style={styles.input}
              onChangeText={setEmail} //retrive to the setemail
              placeholder="Email"
              placeholderTextColor="#aaa"/>

          <TextInput style={styles.input}
              onChangeText={setPassword} //retrive to the setpassword
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry/>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        {error && <Text style={{color:"red"}}>{error}</Text>}
        <Text onPress={goToLogin} style={{marginVertical:10}}>
          Already have an account? Login here
        </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight:"bold",
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

});
 
