import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const DailyStakeCalculator = () => {
  const [numberOfTrades, setNumberOfTrades] = useState('');
  const [initialBalance, setInitialBalance] = useState(null);
  const [dailyProfit, setDailyProfit] = useState(20);
  const [minLossPercentage, setMinLossPercentage] = useState('');
  const [expectedBalance, setExpectedBalance] = useState(null);
  const [amountPerTrade, setAmountPerTrade] = useState(null);
  const [expectedProfit, setExpectedProfit] = useState(null);
  const [expectedLoss, setExpectedLoss] = useState(null);
  const [expectedBalanceOnLoss, setExpectedBalanceOnLoss] = useState(null);

  const navigation = useNavigation();

  const calculateStake = () => {
    if (!numberOfTrades || !initialBalance || !dailyProfit || !minLossPercentage) {
      alert('Please enter valid values');
      return;
    }

    const trades = parseInt(numberOfTrades);
    const balance = parseFloat(initialBalance);
    const minLoss = parseFloat(minLossPercentage);

    const winPercentage = 0.95; // 95% profit on win
    const lossPercentage = minLoss * 0.01; // Convert percentage to decimal for calculation

    const expectedBalanceValue = balance * dailyProfit * 0.01 + balance;
    const amountPerTradeValue = (dailyProfit * 0.01 * balance) / trades * 1.05;

    const expectedProfitValue = amountPerTradeValue * trades * winPercentage;
    const expectedLossValue = balance* lossPercentage;
    const expectedBalanceOnLossValue =  balance- expectedLossValue;

    setExpectedBalance(expectedBalanceValue.toFixed(2));
    setAmountPerTrade(amountPerTradeValue.toFixed(2));
    setExpectedProfit(expectedProfitValue.toFixed(2));
    setExpectedLoss(expectedLossValue.toFixed(2));
    setExpectedBalanceOnLoss(expectedBalanceOnLossValue.toFixed(2));
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={require('../assets/money.jpg')} blurRadius={10} style={styles.bgImage}>
        <View style={styles.overlay} />
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="white" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Daily Calculator</Text>
        </View>
        <ScrollView style={{ paddingBottom: 10 }}>
          <View style={styles.body}>
            <View style={styles.inputContainer}>
              <View style={styles.inputItem}>
                <Text style={styles.inputHeader}>Initial Balance</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={initialBalance}
                  onChangeText={(text) => setInitialBalance(text)}
                  placeholderTextColor={'white'}
                />
              </View>

              <View style={styles.inputItem}>
                <Text style={styles.inputHeader}>Daily Profit Percentage</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={dailyProfit}
                  onChangeText={(text) => setDailyProfit(parseFloat(text))}
                  placeholderTextColor={'white'}
                />
              </View>

              <View style={styles.inputItem}>
                <Text style={styles.inputHeader}>Number of Trades</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={numberOfTrades}
                  onChangeText={(text) => setNumberOfTrades(text)}
                  placeholderTextColor={'white'}
                />
              </View>

              <View style={styles.inputItem}>
                <Text style={styles.inputHeader}>Min Loss Percentage</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={minLossPercentage}
                  onChangeText={(text) => setMinLossPercentage(text)}
                  placeholderTextColor={'white'}
                />
              </View>
            </View>
          </View>
          <View style={styles.lowerComponent}>
            <Text style={styles.resultText}>Amount per Trade: {amountPerTrade || '_ _ _ _'}</Text>
            <Text style={styles.resultText}>Expected Balance: {expectedBalance || '_ _ _ _'}</Text>
            <Text style={styles.resultText}>Expected Profit: {expectedProfit || '_ _ _ _'}</Text>
            <Text style={styles.resultText}>Expected Loss: {expectedLoss || '_ _ _ _'}</Text>
            <Text style={styles.resultText}>
              Expected Balance on Loss Incur: {expectedBalanceOnLoss || '_ _ _ _'}
            </Text>

            <TouchableOpacity style={styles.calculateButton} onPress={calculateStake}>
              <Text style={{ color: 'white', padding: 10, textAlign: 'center' }}>Calculate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </ScrollView>
  );
};

export default DailyStakeCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 30,
  },
  inputContainer: {
    height: '70%',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  inputHeader: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30',
    fontSize: 18,
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
    fontSize: 18,
  },
  resultText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'left',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputItem: {
    marginBottom: 30,
  },
  calculateButton: {
    alignSelf: 'center',
    borderColor: 'white',
    width: 200,
    borderRadius: 50,
    padding: 5,
    borderWidth: 1,
    marginTop: 50,
  },
  lowerComponent: {
    marginTop: 50,
    flex: 1,
  },
  icon: {},
  bgImage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to control the darkness
  },
});
