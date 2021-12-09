import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import WheelOfFortune from 'react-native-wheel-of-fortune';
import { COLORS } from '../constants';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import SERVER_URL from '../api'

const participants = [
    '10% OFF',
    'NO LUCK',
    '20$ OFF',
    'NO LUCK',
    '30% OFF',
    'NO LUCK',
];
const SpinGame = ({navigation}) => {
  const CurrentUser = useSelector(state=> state.userReducer.user); 

  const [winnerValue, setWinnerValue] = useState(null)
  const [winnerIndex, setWinnerIndex] = useState(null)
  const [started, setStarted] = useState(false)
  const [spinNum, setSpinNum] = useState(CurrentUser.spinNum)
  const buttonPress = () => {
        setStarted(true);
        setSpinNum(spinNum-1);
        this.child._onPress();
        handleSpin();
    };
  const handleSpin=()=>{
    const url=`${SERVER_URL}/users/spingame`;
        axios.post(url, {idUser: CurrentUser._id, voucher: "61acdd42397fa9f04e1cdf29"})
        .catch((err)=>{
          console.log(err);
        })
        console.log("da vo day");
  }
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
        }}>Your turn: {spinNum}</Text>
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
              setWinnerValue(value);
              setWinnerIndex(index);
            }}
        />
        {!started && (
            <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Spin to win!</Text>
            </TouchableOpacity>
          </View>
        )}
        {winnerIndex != null && (
            <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              You win {participants[winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if(spinNum>0){
                  setWinnerIndex(null);
                  setSpinNum(spinNum-1);
                  this.child._tryAgain();
                }else{
                  ToastAndroid.showWithGravity(
                    "You have no more spins",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                }
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
                navigation.navigate('Home')
            }}
        >
            <Text style={{
                color: COLORS.primary,
                fontSize: 22,
                fontWeight: 'bold',
            }}>Back</Text>
        </TouchableOpacity>
      </View>
    )
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
