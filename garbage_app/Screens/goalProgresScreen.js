import React from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { BarChart } from 'react-native-chart-kit';
import  { useNavigation } from '@react-navigation/native';

export default function goalProgresScreen({ navigation }) {

    const navigateBack = () => {
        navigation.goBack(); // Go back to previous screen
    };

    const navigateBoardScreen = () => {
        navigation.navigate('BoardScreen'); // Navigate to BoardScreen
    };

    const data = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            data: [20, 45, 28, 80]  // Example data
          }
        ]
      };
      const screenWidth = Dimensions.get('window').width;
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Text style={styles.headerText}>{"<"} Your Progress</Text>
                </TouchableOpacity>
                <Text style={styles.userWelcome}>Hi, Welcome Back</Text>
                <Text style={styles.userName}>John Doe</Text>
            </View>
            <View style={styles.middle}>
                <Text style={styles.content1}>Track Your Progress</Text>
                <BarChart
                    data={data}
                    width={screenWidth - 30} // width of the chart
                    height={220}
                    yAxisLabel="kg"
                    chartConfig={{
                        backgroundColor: '#e26a00',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
           
            {/* Footer */}
            <Text style={styles.footerText}>Reduce, Reuse, Recycle!</Text>
            <TouchableOpacity style={styles.boardButton} onPress={navigateBoardScreen}>
                <Text style={styles.boardButtonText}>Board Screen</Text>
            </TouchableOpacity>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Text style={styles.navIcon}>🏠</Text>
                <Text style={styles.navIcon}>📊</Text>
                <Text style={styles.navIcon}>🔔</Text>
                <Text style={styles.navIcon}>👤</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
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
        fontSize: 16 
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
    progressImage: { 
        width: '100%', 
        height: 300, 
        resizeMode: 'contain', 
        marginVertical: 20 
    },
    footerText: { 
        fontSize: 24, 
        textAlign: 'center', 
        marginVertical: 16 
    },
    boardButton: { 
        backgroundColor: '#D3D3D3', 
        padding: 10, 
        borderRadius: 8, 
        alignSelf: 'center' 
    },
    boardButtonText: { 
        color: '#000', 
        fontWeight: 'bold' 
    },
    bottomNav: { 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        backgroundColor: '#32CD32', 
        padding: 16 
    },
    navIcon: { 
        fontSize: 24, 
        color: 'white' 
    },
});
