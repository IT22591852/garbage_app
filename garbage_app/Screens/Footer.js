import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Footer = () => {
    const navigation = useNavigation(); // Initialize useNavigation

    // Navigation functions
    const goToHome = () => {
        navigation.navigate('Home');
    };
    const goToSchedule = () => {
        navigation.navigate('Schedule');
    };
    const goToOrder = () => {
        navigation.navigate('Order');
    };
    const goToNotify = () => {
        navigation.navigate('Notify');
    };
    const goToUser = () => {
        navigation.navigate('User');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.bottomNav}>
                <FontAwesome name="home" size={30} color="green" onPress={goToHome} />
                <FontAwesome name="calendar" size={30} color="black" onPress={goToSchedule} />
                <FontAwesome name="truck" size={30} color="black" onPress={goToOrder} />
                <FontAwesome name="bell" size={30} color="black" onPress={goToNotify} />
                <FontAwesome name="user" size={30} color="black" onPress={goToUser} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 40,
    },
    bottomNav: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
});

export default Footer; 