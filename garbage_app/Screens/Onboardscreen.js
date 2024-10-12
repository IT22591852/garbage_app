import React from 'react';
import { StyleSheet, View,Text, StatusBar,Image, TouchableOpacity } from 'react-native';
import {signOut,onAuthStateChanged} from 'firebase/auth';
import {auth} from "../../Services/firebaseAuth";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Onboardscreen({navigation}) {
  
    
    const handleLogout=()=>{
        signOut(auth)
        .then(()=>{
         navigation.navigate('Loginscreen');
         })
        // .catch((error)=>{
        //  console.error("Sign out error:",error)
        // })
        // onAuthStateChanged(auth,(user)=>{
        //     if(user){
        //         console.log('LOGGEDIN')
        //         console.log(user)
        //     }else
        //     {
        //         console.log('LOGGEDOUT')
        //     }
        // })
    }
    const goToDriverUI=()=>{
        navigation.navigate('Driver1');
      }
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
       <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
        <Text style={styles.welcome}>Hi,Welcome Back</Text>
        <Text style={styles.profilename}>Rock Lee</Text>
      </View>
      
      <View style={styles.middle}>
        <Text style={styles.content1}>It's Time To Collect The Trash</Text>
        <Image source={require('../../assets/images/onboardimg1.jpg')}
        style={styles.img1}/>
        <Text style={styles.content2}>Platform For Waste Management</Text>
     </View>
     <View style={styles.card}>
        <Text style={styles.content3}>Your Efforts Help To Reduce Waste And Protect The Environment</Text>
        <Icon name='truck' size={60} style={{marginLeft:10}}/>
        
        <TouchableOpacity style={styles.startbtn} onPress={goToDriverUI}>
        <Text style={styles.startbtntxt}>
           start
          </Text>
      </TouchableOpacity>
     </View>
    </View>
  );
}

const styles=StyleSheet.create({
container:{
    flex:1,
    backgroundColor:'white',
    // padding:40,
    marginTop:-14,
},
header:{
    backgroundColor:'#00FF0A',
    width:'100%',
    height:55,
    marginTop:10
},
welcome:{
    textAlign:'right',
    marginTop:-33,
    marginRight:13,
    color:'grey',
    fontSize:17,
    fontWeight:'bold'
},
profilename:{
    textAlign:'right',
    marginTop:2,
    marginRight:80,
    fontWeight:'bold',
    fontSize:15
},
middle:{
    marginTop:20
},
content1:{
   fontSize:32,
   fontWeight:'bold',
   color:'red',
   marginLeft:25,
   textAlign:'center',
//    alignSelf:'center' 
},
img1:{
    marginTop:25,
    padding:20,
    width:300,
    height:230,
    marginLeft:40,
    borderRadius:15
},
content2:{
    fontSize:32,
    fontWeight:'bold',
    textAlign:'center',
    alignSelf:'center',
    marginTop:15
},
card:{
    marginTop:15,
    marginLeft:40,
    width:300,
    height:180,
    borderColor:'black',
    borderWidth:2,
    borderRadius:5
},
content3:{
    marginTop:5,
    marginLeft:70,
    fontSize:20,
    color:'grey',
    textShadowColor:'black',
    textShadowRadius:0.5
},
startbtn:{
    backgroundColor:'#55CA5C',
    padding:4,
    borderRadius:10,
    width:100,
    height:30,
    marginLeft:180,
    marginTop:5
    // marginBottom:5,
    // marginBottom:10
},
startbtntxt:{
    color:"white",
    fontWeight:"bold",
    textAlign:'center',
    fontSize:20
},
button: {
    width: '20%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 4,
    marginLeft:10,
    marginTop:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})



