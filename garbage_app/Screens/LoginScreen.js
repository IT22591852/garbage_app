import { useEffect, useState } from "react";
import {Text,View,TextInput,StyleSheet, Button,TouchableOpacity, ImageBackground} from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {auth} from '../Services/firebaseAuth';

export default function LoginScreen({navigation}) {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  const checkIfLoggedIn=()=>{
      onAuthStateChanged(auth,(user)=>{
           if(user){
           navigation.navigate('Dashboard');
           }
         });
  };

  useEffect(()=>{
    checkIfLoggedIn();
  },[]);

  const handleLogin=()=>{
    setError(''); //set error to null
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials)=>{
      const user=userCredentials.user;
      console.log(user);
      navigation.navigate('Dashboard');
    })
    .catch((error)=>{
      setError(error.message);
    });
  };

  const goToRegister=()=>{
    navigation.navigate('Register');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/eco_r.png')} // Path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput 
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#aaa"
        />

        <TextInput 
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {error && <Text style={{color:"red"}}>{error}</Text>}

        <Text onPress={goToRegister} style={styles.registerText}>
          Create an account? Register here
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 128, 0, 0.4)', // Greenish overlay to match garbage management theme
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerText: {
    marginVertical: 10,
    color: '#007BFF',
  },
});

