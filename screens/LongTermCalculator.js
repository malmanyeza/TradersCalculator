import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const LongTermCalculator = () => {
  const [estimatedBalance, setEstimatedBalance] = useState(null);
  const [initialBalance, setInitialBalance] = useState(50);
  const [profitPercentage, setProfitPercentage] = useState(20);
  const [desiredAmount, setDesiredAmount] = useState(null);
  const [noOfDays, setNoOfDays] = useState(null);
  const [calculationType, setCalculationType] = useState('amount'); // 'amount' or 'days'

  const navigation = useNavigation();

  const calculateEstimatedBalance = () => {
    if (!profitPercentage || !initialBalance || (!noOfDays && !desiredAmount)) {
      alert('Please enter valid values');
      return;
    }

    if (calculationType === 'amount') {
      const balance = initialBalance * (1 + profitPercentage / 100) ** noOfDays;
      setEstimatedBalance(balance.toFixed(2));
    } else if (calculationType === 'days') {
      const days = Math.log(desiredAmount / initialBalance) / Math.log(1 + profitPercentage / 100);
      setNoOfDays(Math.ceil(days));
    }
  };

  const handleCalculationTypeToggle = (type) => {
    setCalculationType(type);
    setEstimatedBalance(null);
    setNoOfDays(null);
    setDesiredAmount(null);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/money.jpg')} blurRadius={10} style={styles.bgImage}>
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="white" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Long Term Calculator</Text>
        </View>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleCircle, calculationType === 'amount' && styles.activeCircle]}
            onPress={() => handleCalculationTypeToggle('amount')}
          >
            <Text style={styles.toggleText}>Amount Calculation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleCircle, calculationType === 'days' && styles.activeCircle]}
            onPress={() => handleCalculationTypeToggle('days')}
          >
            <Text style={styles.toggleText}>Days Calculation</Text>
          </TouchableOpacity>
        </View>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <View style={styles.outerBody}>
          <View style={styles.body}>
            <View style={styles.inputContainer}>
              <View style={styles.inputItem}>
                <Text style={styles.inputHeader}>Initial Balance</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={initialBalance.toString()}
                  onChangeText={(text) => setInitialBalance(text)}
                  placeholderTextColor={'white'}
                />
              </View>

              <View style={styles.inputItem}>
                <Text style={styles.inputHeader}>Profit Percentage</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={profitPercentage}
                  onChangeText={(text) => setProfitPercentage(parseFloat(text))}
                  placeholderTextColor={'white'}
                />
              </View>

              <View style={styles.inputItem}>
                <Text style={styles.inputHeader}>
                  {calculationType === 'amount' ? 'Number of days' : 'Desired amount'}
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={calculationType === 'amount' ? noOfDays : desiredAmount}
                  onChangeText={(text) =>
                    calculationType === 'amount' ? setNoOfDays(text) : setDesiredAmount(text)
                  }
                  placeholderTextColor={'white'}
                />
              </View>
            </View>
          </View>
          <View style={styles.lowerComponent}>
            <Text style={styles.resultText}>
              {calculationType === 'amount'
                ? `The estimated accumulated balance will be : ${estimatedBalance || '_ _ _ _'}`
                : `The estimated number of days will be : ${noOfDays || '_ _ _ _'}`}
            </Text>

            <TouchableOpacity style={styles.calculateButton} onPress={calculateEstimatedBalance}>
              <Text style={{ color: 'white', padding: 10, textAlign: 'center' }}>Calculate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LongTermCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'

  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf:'flex-start'
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    alignSelf:'center',
    marginLeft:30
  },
  inputContainer: {

    alignItems: 'center',
    marginTop: 20,
    justifyContent:'space-between'
  },
  inputHeader: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:'30',
    fontSize:18
  },
  input: {
    marginTop: 8,
    height: 40,
    width: 200,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    fontSize:18
  },
  resultText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'left',
    fontSize:16
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
    
  },
  body:{
    justifyContent:'center',
    alignItems:'center'
  },
  inputItem:{
    marginBottom:30
  },
  calculateButton:{
    alignSelf:'center',
    borderColor:'white',
    width:200,
    borderRadius:50,
    marginTop:50,
    padding:5,
    borderWidth:1,
    marginBottom:'30'
  },
  lowerComponent:{
   marginBottom:'50'
  },
  icon:{
  },
  bgImage:{
    flex:1,
    paddingHorizontal: 20,
    paddingTop:50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to control the darkness
  },
  outerBody:{
    justifyContent:'space-evenly',
    flex:1
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  toggleCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  toggleText: {
    color: 'white',
  },
});
