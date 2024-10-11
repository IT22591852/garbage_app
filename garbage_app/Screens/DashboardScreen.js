import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import auth from "../Services/firebaseAuth";
import Header from './Header';
import Footer from './Footer';

export default function DashboardScreen({ navigation }) {

    const handlelogout = () => {
        signOut(auth)
        .then(() => {
            navigation.navigate('Login');
        });
    };

    const handleViewGoalProgress = () => {
        navigation.navigate('goalOnboardScreen1');
    };

    // Initialize count state variables
    const [paperCount, setPaperCount] = useState(0);
    const [plasticCount, setPlasticCount] = useState(0);
    const [glassCount, setGlassCount] = useState(0);
    const [otherCount, setOtherCount] = useState(0);

    // Function to animate counts
    useEffect(() => {
        let paper = 0, plastic = 0, glass = 0, other = 0;
        const interval = setInterval(() => {
            if (paper < 42) setPaperCount(++paper);
            if (plastic < 42) setPlasticCount(++plastic);
            if (glass < 8) setGlassCount(++glass);
            if (other < 12) setOtherCount(++other);
            if (paper >= 42 && plastic >= 42 && glass >= 8 && other >= 12) clearInterval(interval);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Header/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.recycledContainer}>
                        <View style={styles.item}>
                            <Text style={styles.countText}>{paperCount} <Text style={styles.kgText}>kg</Text></Text>
                            <Text style={styles.paperText}>Paper <Text style={styles.recycleText}>Recycled</Text></Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.countText}>{plasticCount} <Text style={styles.kgText}>kg</Text></Text>
                            <Text style={styles.plasticText}>Plastic <Text style={styles.recycleText}>Recycled</Text></Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.countText}>{glassCount} <Text style={styles.kgText}>kg</Text></Text>
                            <Text style={styles.glassText}>Glass <Text style={styles.recycleText}>Recycled</Text></Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.countText}>{otherCount} <Text style={styles.kgText}>kg</Text></Text>
                            <Text style={styles.otherText}>Other <Text style={styles.recycleText}>Recycled</Text></Text>
                        </View>
                    </View>

                    {/* New Rectangle for Weekly Goals */}
                    <View style={styles.weeklyGoalsContainer}>
                        <Text style={styles.weeklyGoalsTitle}>Weekly Goals</Text>
                        <Text style={styles.weeklyGoalText}>7kg Glass</Text>
                        <Text style={styles.weeklyGoalText}>10kg Plastic</Text>
                        <Text style={styles.weeklyGoalText}>15kg Others</Text>
                        <TouchableOpacity style={styles.viewGoalButton} onPress={handleViewGoalProgress}>
                            <Text style={styles.viewGoalButtonText}>View Goal Process</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    recycledContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    item: {
        width: '45%',
        alignItems: 'center',
        marginVertical: 10,
    },
    countText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red',
    },
    kgText: {
        fontSize: 16,
        color: 'red',
    },
    paperText: {
        fontSize: 16,
        color: '#FFA500',
        fontWeight: 'bold',
    },
    plasticText: {
        fontSize: 16,
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    glassText: {
        fontSize: 16,
        color: '#0000CD',
        fontWeight: 'bold',
    },
    otherText: {
        fontSize: 16,
        color: '#B8860B',
        fontWeight: 'bold',
    },
    recycleText: {
        fontSize: 16,
        color: 'black', 
    },
    weeklyGoalsContainer: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        marginTop: 20,
    },
    weeklyGoalsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    weeklyGoalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    viewGoalButton: {
        marginTop: 15,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    viewGoalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
