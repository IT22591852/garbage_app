import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const User = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    password: '************',
  });

  const [isEditable, setIsEditable] = useState(false); 
  const [isResettingPassword, setIsResettingPassword] = useState(false); // Track if password reset is active
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleEditPress = () => {
    if (isEditable) {
      console.log('Saving data:', profileData);
    }
    setIsEditable(!isEditable);
  };

  const handleResetPasswordPress = () => {
    setIsResettingPassword(true);
    // Logic to send verification code to the email
    console.log('Sending verification code to:', profileData.email);
  };

  const handleSubmitPasswordReset = () => {
    if (newPassword === confirmPassword) {
      console.log('Password reset successful');
      setProfileData({ ...profileData, password: newPassword });
      setIsResettingPassword(false);
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
        <Text style={styles.username}>{profileData.name}</Text>
      </View>

      <View style={styles.pointsSection}>
        <FontAwesome5 name="trophy" size={40} color="#FFD700" />
        <Text style={styles.pointsText}>20 Points</Text>
        <View style={styles.wasteDetails}>
          <Text>Paper 10 Kg</Text>
          <Text>Plastic 09 Kg</Text>
          <Text>Glass 07 Kg</Text>
        </View>
      </View>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Name" 
          value={profileData.name} 
          editable={isEditable}
          onChangeText={(text) => setProfileData({ ...profileData, name: text })}
        />
        <TextInput 
          style={styles.input} 
          placeholder="E-mail" 
          value={profileData.email} 
          editable={isEditable} 
          onChangeText={(text) => setProfileData({ ...profileData, email: text })}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Phone" 
          value={profileData.phone} 
          editable={isEditable} 
          onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
        />

        {/* Reset Password Section */}
        {!isResettingPassword ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={profileData.password}
              editable={false} // Not editable unless resetting
            />
            <TouchableOpacity onPress={handleResetPasswordPress}>
              <Text style={styles.resetPassword}>Reset Password</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPasswordReset}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}

        <TextInput 
          style={styles.input} 
          placeholder="Address" 
          value={profileData.address}
          editable={isEditable} 
          onChangeText={(text) => setProfileData({ ...profileData, address: text })}
        />

        <TouchableOpacity style={styles.editProfileButton} onPress={handleEditPress}>
          <Text style={styles.editProfileButtonText}>
            {isEditable ? 'Save Profile' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <FontAwesome5 name="home" size={30} color="#fff" />
        <FontAwesome5 name="calendar" size={30} color="#fff" />
        <FontAwesome5 name="shopping-cart" size={30} color="#fff" />
        <FontAwesome5 name="bell" size={30} color="#fff" />
        <FontAwesome5 name="user" size={30} color="#fff" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  header: { backgroundColor: '#32CD32', padding: 20, alignItems: 'center' },
  welcomeText: { color: '#fff', fontSize: 18 },
  username: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  pointsSection: { alignItems: 'center', marginVertical: 20 },
  pointsText: { fontSize: 18, marginVertical: 10 },
  wasteDetails: { marginTop: 10 },
  form: { paddingHorizontal: 20 },
  input: { backgroundColor: '#e6f2e6', borderRadius: 10, padding: 10, marginVertical: 10, fontSize: 16 },
  resetPassword: { color: '#32CD32', marginVertical: 10, textAlign: 'right' },
  submitButton: { backgroundColor: '#32CD32', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
  submitButtonText: { color: '#fff', fontSize: 18 },
  editProfileButton: { backgroundColor: '#32CD32', borderRadius: 10, padding: 15, alignItems: 'center', marginVertical: 20 },
  editProfileButtonText: { color: '#fff', fontSize: 18 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#32CD32', paddingVertical: 15 },
});

export default User;
