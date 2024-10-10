import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, StyleSheet, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios

export default function weeklyGoalScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [glassWastage, setGlassWastage] = useState('');
    const [plasticWastage, setPlasticWastage] = useState('');
    const [otherWastage, setOtherWastage] = useState('');

    const navigateBack = () => {
        navigation.goBack();
    };

    const handleCustomGoalPress = () => {
        setModalVisible(true);
    };

    const handleAddGoal = async () => {
        if (!glassWastage || !plasticWastage || !otherWastage) {
            console.log('Please fill in all fields');
            return;
        }
    
        try {
            const response = await axios.post('http://172.20.10.2:5000/goals', {
                glassWastage: parseFloat(glassWastage),
                plasticWastage: parseFloat(plasticWastage),
                otherWastage: parseFloat(otherWastage)
            });
    
            console.log('Response data:', response.data); // Log the response data
    
            if (response.status === 201) {
                console.log('Goal added successfully:', response.data);
                // Clear form after successful submission
                setGlassWastage('');
                setPlasticWastage('');
                setOtherWastage('');
                setModalVisible(false); // Close modal after submission
                
                // Access the ID correctly
                navigation.navigate('displayGoal', { goalId: response.data.id }); 
            } else {
                console.log('Failed to add goal:', response.data);
            }
        } catch (error) {
            console.log('Error adding goal:', error.message);
        }
    };
    
    

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Text style={styles.headerText}>{"<"} Set Your Weekly Goals</Text>
                </TouchableOpacity>
                <Text style={styles.userWelcome}>Hi, Welcome Back</Text>
                <Text style={styles.userName}>John Doe</Text>
            </View>

            {/* Empty Space for Images */}
            <View style={styles.imageSpace}></View>

            {/* Goal Title and Buttons */}
            <View style={styles.goalSettings}>
                <Text style={styles.goalTitle}>Set Your Weekly Goal</Text>
                <View style={styles.goalButtons}>
                    <TouchableOpacity style={styles.goalButton}><Text>Light</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.goalButton}><Text>Moderate</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.goalButton}><Text>Heavy</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.goalButton} onPress={handleCustomGoalPress}><Text>Custom Goal</Text></TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.saveButton}><Text>Add Goal</Text></TouchableOpacity>
            </View>

            {/* Modal for the form */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Custom Goal</Text>
                        
                        {/* Glass Wastage */}
                        <Text style={styles.inputLabel}>Glass Wastage</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter glass wastage"
                            value={glassWastage}
                            onChangeText={setGlassWastage}
                            keyboardType="numeric"
                        />

                        {/* Plastic Wastage */}
                        <Text style={styles.inputLabel}>Plastic Wastage</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter plastic wastage"
                            value={plasticWastage}
                            onChangeText={setPlasticWastage}
                            keyboardType="numeric"
                        />

                        {/* Other Wastage */}
                        <Text style={styles.inputLabel}>Other Wastage</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter other wastage"
                            value={otherWastage}
                            onChangeText={setOtherWastage}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
                            <Text style={styles.addButtonText}>Add Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.navIcon}>🏠</Text>
                    <Text style={styles.navButtonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('goalProgresScreen')}>
                    <Text style={styles.navIcon}>📊</Text>
                    <Text style={styles.navButtonText}>Progress</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('NotificationsScreen')}>
                    <Text style={styles.navIcon}>🔔</Text>
                    <Text style={styles.navButtonText}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Text style={styles.navIcon}>👤</Text>
                    <Text style={styles.navButtonText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'white' 
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 16, 
        backgroundColor: '#32CD32' 
    },
    headerText: { 
        color: 'white', 
        fontSize: 20 
    },
    userWelcome: { 
        position: 'absolute', 
        top: 16, 
        right: 16, 
        color: 'white' 
    },
    userName: { 
        position: 'absolute', 
        top: 36, 
        right: 16, 
        color: 'white', 
        fontWeight: 'bold' 
    },
    imageSpace: { 
        flex: 1, 
    },
    goalSettings: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1, 
        padding: 16, 
        backgroundColor: '#DCDCDC',
        borderRadius: 10, 
        margin: 16 
    },
    goalTitle: { 
        fontSize: 24, 
        textAlign: 'center', 
        marginBottom: 16 
    },
    goalButtons: { 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 16, 
        width: '100%' 
    },
    goalButton: { 
        padding: 10, 
        backgroundColor: '#F0F0F0', 
        borderRadius: 5, 
        width: '80%', 
        marginBottom: 10, 
        alignItems: 'center'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    addButton: {
        backgroundColor: '#32CD32',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButtonText: {
        color: 'red',
        fontSize: 16,
    },
    saveButton: { 
        backgroundColor: '#D3D3D3', 
        padding: 10, 
        borderRadius: 8, 
        alignSelf: 'center', 
        marginBottom: 100 
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#32CD32',
        padding: 16,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    navButton: {
        alignItems: 'center',
    },
    navIcon: {
        fontSize: 24,
    },
    navButtonText: {
        fontSize: 12,
        color: 'white',
    },
});

