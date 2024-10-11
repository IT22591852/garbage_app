import React from 'react';
import { View } from 'react-native'; // Import View from react-native
import Header from './Header';
import Footer from './Footer';

export default function Home({navigation}){
  return (
    <>
        <Header></Header>
        <Footer></Footer>
    </>

  );
}
