import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/money.jpg')}
        blurRadius={10}
        style={styles.bgImage}
      >
        <View style={styles.overlay} />
        <Text style={styles.header}>What you should know before starting your trade</Text>
        <Text style={styles.point}># Make sure that the graph is trending in a particular direction, either up or down.</Text>
        <Text style={styles.point}># Avoid overtrading which can lead to emotional trading and loss of capital.</Text>
        <Text style={styles.point}># Set stop losses and take profits to protect your capital.</Text>
        <Text style={styles.point}># Stay positive and focused, even when things do go your way. If its possible meditate first.</Text>
        <Text style={styles.point}># Follow the trading plan and avoid making impulsive decisions</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LongTermCalculator')}
        >
          <Text style={styles.buttonText}>Long Term Calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DailyStack')}
        >
          <Text style={styles.buttonText}>Daily Calculator</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  bgImage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent:'center'
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  header:{
    fontSize:23,
    fontWeight:'bold',
    marginBottom:30
  },
  point:{
    fontSize:17,
    marginBottom:10
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to control the darkness
  },
});
