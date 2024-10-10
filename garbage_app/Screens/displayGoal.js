import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from "react-native";
import axios from 'axios';

export default function displayGoal({ route, navigation }) {
    const { goalId } = route.params; // Get the goalId passed from the previous screen
    const [goal, setGoal] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [glassWastage, setGlassWastage] = useState('');
    const [plasticWastage, setPlasticWastage] = useState('');
    const [otherWastage, setOtherWastage] = useState('');

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await axios.get(`http://172.20.10.2:5000/goals/${goalId}`);
                setGoal(response.data);
                // Set initial values for updating
                setGlassWastage(response.data.glassWastage.toString());
                setPlasticWastage(response.data.plasticWastage.toString());
                setOtherWastage(response.data.otherWastage.toString());
            } catch (error) {
                console.error('Error fetching goal:', error.message);
            }
        };

        fetchGoal();
    }, [goalId]);

    const handleUpdate = () => {
        setModalVisible(true); // Show modal to update goal
    };

    const updateGoal = async () => {
        try {
            await axios.put(`http://172.20.10.2:5000/goals/${goalId}`, {
                glassWastage: parseFloat(glassWastage),
                plasticWastage: parseFloat(plasticWastage),
                otherWastage: parseFloat(otherWastage),
            });
            setModalVisible(false); // Close the modal after update
            // Optionally fetch the updated goal again
            const response = await axios.get(`http://172.20.10.2:5000/goals/${goalId}`);
            setGoal(response.data); // Update state with new goal data
        } catch (error) {
            console.error('Error updating goal:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://172.20.10.2:5000/goals/${goalId}`);
            navigation.navigate('weeklyGoalScreen'); // Navigate back to goal screen
        } catch (error) {
            console.error('Error deleting goal:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {goal ? (
                <>
                    <Text style={styles.title}>Goal Details</Text>
                    <Text>Glass Wastage: {goal.glassWastage}</Text>
                    <Text>Plastic Wastage: {goal.plasticWastage}</Text>
                    <Text>Other Wastage: {goal.otherWastage}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Update Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleDelete}>
                            <Text style={styles.buttonText}>Delete Goal</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Modal for updating the goal */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Update Goal</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Glass Wastage"
                                    value={glassWastage}
                                    keyboardType="numeric"
                                    onChangeText={setGlassWastage}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Plastic Wastage"
                                    value={plasticWastage}
                                    keyboardType="numeric"
                                    onChangeText={setPlasticWastage}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Other Wastage"
                                    value={otherWastage}
                                    keyboardType="numeric"
                                    onChangeText={setOtherWastage}
                                />
                                <Button title="Update" onPress={updateGoal} />
                                <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                            </View>
                        </View>
                    </Modal>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#32CD32',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5, // For Android shadow
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
});
8