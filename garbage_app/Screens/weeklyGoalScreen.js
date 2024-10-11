import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, StyleSheet, Modal,Image,ScrollView,SafeAreaView} from "react-native";
// import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";

export default function weeklyGoalScreen({ navigation }) {
    const [customModalVisible, setCustomModalVisible] = useState(false);
    const [lightModalVisible, setLightModalVisible] = useState(false);
    const [moderateModalVisible, setModerateModalVisible] = useState(false);
    const [heavyModalVisible, setHeavyModalVisible] = useState(false);

    const [glassWastage, setGlassWastage] = useState('');
    const [plasticWastage, setPlasticWastage] = useState('');
    const [otherWastage, setOtherWastage] = useState('');

    const navigateBack = () => {
        navigation.goBack();
    };

    const handleCustomGoalPress = () => {
        setCustomModalVisible(true); // Open custom modal
    };

    const handleLightGoalPress = () => {
        // Set default values for Light goal
        setGlassWastage('5');
        setPlasticWastage('7');
        setOtherWastage('10');
        setLightModalVisible(true); // Open light modal
    };
    const handleModerateGoalPress = () => {
        setGlassWastage('10');
        setPlasticWastage('15');
        setOtherWastage('20');
        setModerateModalVisible(true);
    };

    const handleHeavyGoalPress = () => {
        setGlassWastage('15');
        setPlasticWastage('20');
        setOtherWastage('25');
        setHeavyModalVisible(true);
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

            console.log('Response data:', response.data); 

            if (response.status === 201) {
                console.log('Goal added successfully:', response.data);
                setGlassWastage('');
                setPlasticWastage('');
                setOtherWastage('');
                setCustomModalVisible(false);
                setLightModalVisible(false);
                setModerateModalVisible(false);
                setHeavyModalVisible(false);

                navigation.navigate('displayGoal', { goalId: response.data.id });
            } else {
                console.log('Failed to add goal:', response.data);
            }
        } catch (error) {
            console.log('Error adding goal:', error.message);
        }
    };
    
    const handleAddGoal2 = async () => {
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

            console.log('Response data:', response.data); 

            if (response.status === 201) {
                console.log('Goal added successfully:', response.data);
                setGlassWastage('');
                setPlasticWastage('');
                setOtherWastage('');
                setCustomModalVisible(false);
                setLightModalVisible(false);
                setModerateModalVisible(false);
                setHeavyModalVisible(false);

                navigation.navigate('displayGoal2', { goalId: response.data.id });
            } else {
                console.log('Failed to add goal:', response.data);
            }
        } catch (error) {
            console.log('Error adding goal:', error.message);
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Header/>
                    <View style={styles.imageSpace}></View>

            {/* Goal Title and Buttons */}
            <View style={styles.goalSettings}>
                <Text style={styles.goalTitle}>Set Your Weekly Goal</Text>
                <View style={styles.goalButtons}>
                    <TouchableOpacity style={styles.goalButton} onPress={handleLightGoalPress}><Text>Light</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.goalButton} onPress={handleModerateGoalPress}><Text>Moderate</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.goalButton} onPress={handleHeavyGoalPress}><Text>Heavy</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.goalButton} onPress={handleCustomGoalPress}>
                        <Text>Custom Goal</Text>
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity style={styles.saveButton}><Text>Add Goal</Text></TouchableOpacity> */}
            </View>

            {/* Custom Goal Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={customModalVisible}
                onRequestClose={() => setCustomModalVisible(false)}
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
                        <TouchableOpacity onPress={() => setCustomModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Light Goal Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={lightModalVisible}
                onRequestClose={() => setLightModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Light Goal</Text>
                        
                        {/* Display default values */}
                        <Text style={styles.inputLabel}>Glass Wastage: 5kg</Text>
                        <Text style={styles.inputLabel}>Plastic Wastage: 7kg</Text>
                        <Text style={styles.inputLabel}>Other Wastage: 10kg</Text>

                        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal2}>
                            <Text style={styles.addButtonText}>Confirm Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setLightModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={moderateModalVisible}
                onRequestClose={() => setModerateModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Moderate Goal</Text>
                        
                        {/* Display default values */}
                        <Text style={styles.inputLabel}>Glass Wastage: 10kg</Text>
                        <Text style={styles.inputLabel}>Plastic Wastage: 15kg</Text>
                        <Text style={styles.inputLabel}>Other Wastage: 20kg</Text>

                        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal2}>
                            <Text style={styles.addButtonText}>Confirm Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModerateModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={heavyModalVisible}
                onRequestClose={() => setHeavyModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Heavy Goal</Text>
                        
                        {/* Display default values */}
                        <Text style={styles.inputLabel}>Glass Wastage: 15kg</Text>
                        <Text style={styles.inputLabel}>Plastic Wastage: 20kg</Text>
                        <Text style={styles.inputLabel}>Other Wastage: 25kg</Text>

                        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal2}>
                            <Text style={styles.addButtonText}>Confirm Goal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setHeavyModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                     </View>
                    </View>
                </Modal>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Add your styles here
    
    container:{
         flex: 1, 
         backgroundColor: 'white'
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
      },
    header: { flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor:"#027148" },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "right",
        marginRight: 10,
      },
    userWelcome: { position: 'absolute', top: 16, right: 16, color: 'white' },
    userName: { position: 'absolute', top: 36, right: 16, color: 'white', fontWeight: 'bold' },
    imageSpace: { flex: 1 },
    goalSettings: { justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15, backgroundColor: '#DCDCDC', borderRadius: 10, margin: 100 },
    goalTitle: { fontSize: 24, textAlign: 'center', marginBottom: 16 },
    goalButtons: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 16, width: '100%' },
    goalButton: { padding: 10, backgroundColor: '#F0F0F0', borderRadius: 5, width: '80%', marginBottom: 10, alignItems: 'center' },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContainer: { width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' },
    modalTitle: { fontSize: 20, marginBottom: 20 },
    input: { borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, width: '100%' },
    inputLabel: { marginBottom: 5, fontWeight: 'bold' },
    addButton: { padding: 10, backgroundColor: '#32CD32', borderRadius: 5, width: '100%', alignItems: 'center', marginTop: 10 },
    addButtonText: { color: 'white', fontWeight: 'bold' },
    cancelButtonText: { marginTop: 10, color: 'red', fontWeight: 'bold' },
    bottomNavigation: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "#93E9BE",
      },
    navButton: { alignItems: 'center' },
    navIcon: {
        width: 30,
        height: 30,
      },
    navButtonText: { fontSize: 12 },
    saveButton: { padding: 10, backgroundColor: '#32CD32', borderRadius: 5, alignItems: 'center', marginTop: 20, width: '100%' }
});

