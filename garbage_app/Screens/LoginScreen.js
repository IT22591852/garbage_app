import { useEffect, useState } from "react";
import {Text,View,TextInput,StyleSheet, Button,TouchableOpacity,Image} from "react-native";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {auth} from '../../Services/firebaseAuth';

// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function LoginScreen({navigation}) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('');
  //state for displaying the error
  const [error,setError]=useState('');

  const checkIfLoggedIn=()=>{
      onAuthStateChanged(auth,(user)=>{
           if(user){
            console.log('sdsd',user)
           navigation.navigate('Onboard')
           }
         })
  }

  useEffect(()=>{
    checkIfLoggedIn()
  },[])

  const handleLogin=()=>{
    setError('');
    // console.log(email,password);
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
      const user=userCredentials.user;
      console.log(user);
      navigation.navigate('Onboard')
      //local storage asyn storage
      // AsyncStorage.setItem("user",JSON.stringify(user))
    })
    .catch((error)=>{
      // console.log(error)
      setError(error.message);
  })
  }

  const goToRegister=()=>{
    navigation.navigate('Registerscreen')
  }

  return (
    
    <View style={styles.container}>
       <Image source={require('../../assets/images/recycle-log.png')}
        style={styles.img1}/> 
  <Text style={styles.title}>Login</Text>
  <TextInput style={styles.input}
  onChangeText={setEmail}
  placeholder="Email"
  placeholderTextColor="#aaa"/>
  <TextInput style={styles.input}
  onChangeText={setPassword}
   placeholder="Password"
   placeholderTextColor="#aaa"
   secureTextEntry/>
   <TouchableOpacity style={styles.button} onPress={handleLogin}>
       <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
  {error && <Text style={{color:"red"}}>{error}</Text>}
   <Text onPress={goToRegister} style={{marginVertical:10}}>
    Create an account? Register here
   </Text>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  img1: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
  registerText: {
    color: '#007BFF',
    marginVertical: 10,
    fontSize: 16,
  },
});
 
