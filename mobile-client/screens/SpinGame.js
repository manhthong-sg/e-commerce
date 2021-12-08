import { NavigationContainer } from '@react-navigation/native';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';

import WheelOfFortune from 'react-native-wheel-of-fortune';
import { COLORS } from '../constants';

const participants = [
    '10% OFF',
    'NO LUCK',
    '20$ OFF',
    'NO LUCK',
    '30% OFF',
    'NO LUCK',
];
class SpinGame extends Component {
    constructor(props) {
    super(props);
    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      spinNum: 10,
    };
    this.child = null;
  }
  buttonPress = () => {
      this.setState({
          started: true,
          spinNum: this.state.spinNum-1,
        });
        this.child._onPress();
    };
    
    render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 30,
      borderWidth: 5,
      borderColor: '#fff',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
    //   knobSource: require('./knob.png'),
      onRef: ref => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Text style={{
            position: 'absolute',
            color: COLORS.primary,
            fontSize: 40,
            fontWeight: 'bold',
            top: 100
        }}>Spin Game</Text>
        <Text style={{
            position: 'absolute',
            color: COLORS.primary,
            // fontSize: 50,
            fontWeight: 'bold',
            top: 150
        }}>Your turn: {this.state.spinNum}</Text>
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
              this.setState({winnerValue: value, winnerIndex: index});
            }}
        />
        {!this.state.started && (
            <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Spin to win!</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
            <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              You win {participants[this.state.winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({winnerIndex: null});
                this.child._tryAgain();
            }}
            style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity 
            style={{
            position: 'absolute',
            bottom: 120,
            }}
            onPress={()=>{
                this.props.navigation.navigate('Home')
            }}
        >
            <Text style={{
                color: COLORS.primary,
                fontSize: 22,
                fontWeight: 'bold',
            }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SpinGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.brand
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 50,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
},
tryAgainButton: {
    padding: 10,
},
winnerText: {
    fontSize: 30,
    backgroundColor: 'rgba(225,255,225,250)',
},
tryAgainButton: {
    height: 50,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
