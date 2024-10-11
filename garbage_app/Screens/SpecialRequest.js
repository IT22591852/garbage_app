import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
 // Import image picker library
import { FontAwesome } from '@expo/vector-icons';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Waste types from the image (add all that were in the image)
const wasteTypesList = [
  { label: 'Electronic Waste', value: 'ewaste' },
  { label: 'Construction Waste', value: 'construction' },
  { label: 'Chemical Waste', value: 'chemical' },
  { label: 'Plastic Waste', value: 'plastic' },
  { label: 'Metal Waste', value: 'metal' },
  { label: 'Wood Waste', value: 'wood' },
  { label: 'Organic Waste', value: 'organic' },
  // Add all other waste types you mentioned in the image
];

const CustomCheckBox = ({ label, checked, onChange }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Text style={styles.checkMark}>✓</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const SpecialRequest = () => {
  const navigation = useNavigation(); // Initialize useNavigation

  const goToNormalRequest = () => {
    navigation.navigate('NormalRequest');
  };

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    wasteTypes: {}, // Store selected waste types
    totalKilos: '', // Store total amount in kilos
    specialInstructions: '',
    date: new Date(),
    time: new Date(), // For storing time separately
    extraWorkers: false, // Checkbox for special request
    extraVehicle: false, // New field for extra vehicle
    imageUri: '', // New field for image
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    if (mode === 'date') {
      const currentDate = selectedDate || formData.date;
      setFormData((prevData) => ({ ...prevData, date: currentDate }));
      setMode('time'); // Switch to time mode after selecting date
    } else {
      const selectedTime = selectedDate || formData.time;
      setFormData((prevData) => ({ ...prevData, time: selectedTime }));
      setShowDatePicker(false); // Close the picker after time is selected
    }
  };

  const showMode = (modeToShow) => {
    setShowDatePicker(true);
    setMode(modeToShow);
  };

  // Toggle waste type selection
  const handleWasteTypeChange = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      wasteTypes: {
        ...prevData.wasteTypes,
        [type]: !prevData.wasteTypes[type] ? true : undefined, // Add or remove waste type
      },
    }));
  };

  // Handle image picker
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access the gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setFormData((prevData) => ({ ...prevData, imageUri: result.uri }));
    }
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.phoneNumber || !formData.address) {
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Special Request Submitted:', formData);

    // Clear form after submission
    setFormData({
      email: '',
      phoneNumber: '',
      address: '',
      wasteTypes: {},
      totalKilos: '',
      specialInstructions: '',
      date: new Date(),
      time: new Date(),
      extraWorkers: false,
      extraVehicle: false,
      imageUri: '',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabInactive}>
          <Text style={styles.tabTextInactive} onPress={goToNormalRequest}>Regular</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabText}>Special</Text>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#a0c7a4"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        placeholderTextColor="#a0c7a4"
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        placeholderTextColor="#a0c7a4"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        style={styles.input}
      />

      <Text style={styles.label}>Select Waste Types:</Text>
      {wasteTypesList.map((waste) => (
        <CustomCheckBox
          key={waste.value}
          label={waste.label}
          checked={!!formData.wasteTypes[waste.value]}
          onChange={() => handleWasteTypeChange(waste.value)}
        />
      ))}

      {/* Single input field for total kilos */}
      <TextInput
        placeholder="Total Amount in Kilos"
        placeholderTextColor="#a0c7a4"
        keyboardType="numeric"
        value={formData.totalKilos}
        onChangeText={(text) => setFormData({ ...formData, totalKilos: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="Special Instructions"
        placeholderTextColor="#a0c7a4"
        value={formData.specialInstructions}
        onChangeText={(text) => setFormData({ ...formData, specialInstructions: text })}
        style={styles.input}
      />

      {/* Extra Workers Checkbox */}
      <CustomCheckBox
        label="Extra Workers Needed"
        checked={formData.extraWorkers}
        onChange={() => setFormData({ ...formData, extraWorkers: !formData.extraWorkers })}
      />

      {/* Extra Vehicle Checkbox */}
      <CustomCheckBox
        label="Extra Vehicle Needed"
        checked={formData.extraVehicle}
        onChange={() => setFormData({ ...formData, extraVehicle: !formData.extraVehicle })}
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
        <Text style={styles.imagePickerText}>Upload Image</Text>
      </TouchableOpacity>
      {formData.imageUri ? (
        <Image source={{ uri: formData.imageUri }} style={styles.uploadedImage} />
      ) : null}

      {/* Date Picker */}
      <TouchableOpacity onPress={() => showMode("date")} style={styles.datePickerButton}>
        <FontAwesome name="calendar" size={24} color="black" />
        <Text style={styles.datePickerText}>Schedule a Date & Time</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={mode === "date" ? formData.date : formData.time}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

      {/* Display selected date and time */}
      <Text style={styles.selectedDateText}>
        {`Pickup Date: ${formData.date.toLocaleDateString()}`}
      </Text>
      <Text style={styles.selectedDateText}>
        {`Pickup Time: ${formData.time.toLocaleTimeString()}`}
      </Text>

      <StatusBar style="auto" />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Lighter background
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  tabActive: {
    flex: 1,
    backgroundColor: '#1dbd4f',
    padding: 10,
    borderRadius: 10,
  },
  tabInactive: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
  },
  tabText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  tabTextInactive: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#4caf50',
    padding: 12,
    marginBottom: 20, // Increase margin between inputs
    fontSize: 16,
    color: '#333', // Darker input text color
    backgroundColor: '#fff', // White background for input fields
    borderRadius: 8, // Rounded corners
    elevation: 2, // Add shadow to inputs
  },
  label: {
    fontSize: 18, // Increase label size
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555', // Soft gray for label text
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Increased spacing between checkboxes
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2, // Thicker border
    borderColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Rounded corners for checkbox
  },
  checkboxChecked: {
    backgroundColor: '#4caf50',
  },
  checkMark: {
    color: '#fff',
    fontSize: 16, // Larger check mark
  },
  checkboxLabel: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333', // Darker label text
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0f2e9', // background for date picker
    borderRadius: 8,
    marginBottom: 20, // Space between date picker and other fields
  },
  datePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333', // Darker text
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#666', // Softer color for selected date
  },
  submitButton: {
    backgroundColor: '#4caf50', // Orange color for the submit button
    padding: 15,
    borderRadius: 10,
    elevation: 3, // Shadow effect for button
    marginTop: 30, // Extra margin at the top
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePickerButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15, // Add more spacing for better UI
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadedImage: {
    width: 120, // Larger image preview
    height: 120,
    borderRadius: 10, // Rounded image edges
    resizeMode: 'cover', // Cover the area without distortion
    marginBottom: 10,
  },
});

export default SpecialRequest;
