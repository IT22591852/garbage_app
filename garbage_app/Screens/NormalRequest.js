import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons'; // For icons
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { doc, addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import {db} from '../Services/firebaseAuth';

const wasteTypesList = [
  { label: 'Plastic', value: 'plastic' },
  { label: 'Paper', value: 'paper' },
  { label: 'Glass', value: 'glass' },
  { label: 'Other', value: 'other' },
];

const CustomCheckBox = ({ label, checked, onChange }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Text style={styles.checkMark}>✓</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const NormalRequest = () => {
  const navigation = useNavigation(); 

  const goToSpecialRequest = () => {
    navigation.navigate('SpecialRequest');
  };

  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    wasteTypes: {},
    note: '',
    date: new Date(),
    time: new Date(),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('date');

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

  const handleWasteTypeChange = (type) => {
    setFormData((prevData) => {
      const newWasteTypes = { ...prevData.wasteTypes };

      if (newWasteTypes[type]) {
        // Remove the waste type if it's already selected (uncheck scenario)
        delete newWasteTypes[type];
      } else {
        // Add the waste type with an initial kilos value if it's being checked
        newWasteTypes[type] = { kilos: '' };
      }

      return {
        ...prevData,
        wasteTypes: newWasteTypes,
      };
    });
  };

  const handleKilosChange = (type, kilos) => {
    setFormData((prevData) => ({
      ...prevData,
      wasteTypes: {
        ...prevData.wasteTypes,
        [type]: { ...prevData.wasteTypes[type], kilos },
      },
    }));
  };

  const submit = () => {
    addDoc(collection(db, "regular"), {
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      wasteTypes: formData.wasteTypes,
      note: formData.note,
      date: formData.date,
      time: formData.time,
    })
    .then((docRef) => {
      // Pass the generated document ID, pickup date, and time to Order.js
      navigation.navigate('Order', {
        id: docRef.id,
        date: formData.date,
        time: formData.time,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {/* Tab Bar */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabText}>Regular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabInactive} onPress={goToSpecialRequest}>
            <Text style={styles.tabTextInactive}>Special</Text>
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

        {/* Render kilo input fields conditionally */}
        {wasteTypesList.map((waste) => (
          formData.wasteTypes[waste.value] && (
            <TextInput
              key={`kilos-${waste.value}`}
              placeholder="Kg"
              keyboardType="numeric"
              value={formData.wasteTypes[waste.value]?.kilos || ''}
              onChangeText={(kilos) => handleKilosChange(waste.value, kilos)}
              style={styles.kilosInput}
            />
          )
        ))}

        <TextInput
          placeholder="Note"
          placeholderTextColor="#a0c7a4"
          value={formData.note}
          onChangeText={(text) => setFormData({ ...formData, note: text })}
          style={styles.input}
        />

        {/* Date Picker */}
        <TouchableOpacity onPress={() => showMode('date')} style={styles.datePickerButton}>
          <FontAwesome name="calendar" size={24} color="black" />
          <Text style={styles.datePickerText}>Schedule a Date & Time</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={mode === 'date' ? formData.date : formData.time}
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
        <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Lighter background
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
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
    backgroundColor: '#fff', // White background for inputs
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333', // Darker label color
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#1dbd4f',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#1dbd4f',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  kilosInput: {
    borderWidth: 1,
    borderColor: '#4caf50',
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  datePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#1dbd4f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkMark: {
    color: 'white',
    fontSize: 16,
  },
});

export default NormalRequest;
