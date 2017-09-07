import React from 'react';
import { StyleSheet, Text, View, Dimensions, Picker, StatusBar } from 'react-native';
import diceSets from './diceSets.js';
// import SquareGrid from "react-native-square-grid";
// import LinearGradient from 'react-native-linear-gradient';
import { genBoard } from './boghog';
import ModalDropdown from 'react-native-modal-dropdown';
import CountDown from './CountDown';

const diceSetTitles = Object.keys(diceSets);
const {height, width} = Dimensions.get('window');
const squareSide = Math.min(height, width);
const board = genBoard(diceSets[diceSetTitles[0]]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceSetTitle: diceSetTitles[0],
      language: 'Java',
      board: genBoard(diceSets[diceSetTitles[0]]),
    };
    this._onSelectGameType = this._onSelectGameType.bind(this);
    this._onShuffleGame = this._onShuffleGame.bind(this);
  }

  _onShuffleGame() {
    console.log(this.state);
    this.setState({board: genBoard(diceSets[this.state.diceSetTitle])})
  }

  _onSelectGameType(itemIndex, itemValue) {
    console.log(itemValue, itemIndex, 'yeppp');
    this.setState({diceSetTitle: itemValue, board: genBoard(diceSets[itemValue])})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <ModalDropdown defaultIndex={0}
                         defaultValue={this.state.diceSetTitle}
                         onSelect={this._onSelectGameType} 
                         style={{borderRadius:20, backgroundColor:'white', width:250, height:40 }}
                         textStyle={{ fontSize:30, textAlign:'center', lineHeight:40}} 
                         dropdownStyle={{width:220, height: 47.5*6, marginTop:-22, marginLeft: 15}} 
                         dropdownTextStyle={{fontSize:20, textAlign:'center'}}
                         options={diceSetTitles}/>
          <Text style={styles.shuffleText} onPress={this._onShuffleGame}>Shuffle</Text>
        </View>
        <View style={styles.midSquare}>
          {this.state.board.map((row, ir) => (
            <View key={row.join('')+ir} style={[styles.row, {height: squareSide/row.length - 6}]}>
              {row.map((c, i) => (<View style={[styles.tile, {width: squareSide/row.length - 6, borderRadius: 100/row.length, transform: [{rotate:`${Math.floor(Math.random()*4)*90}deg`}]}]} key={c+i}>
                          <View colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.innerTile}>
                            <Text style={[styles.tileText, {fontSize: 200/row.length, textDecorationLine: ['Z', 'N', 'M', 'W'].indexOf(c) !== -1 ? 'underline' : 'none'}]}>{c}</Text>
                          </View>
                        </View>))}
            </View>
            ))}
        </View>
        <View style={styles.footer}>
          <CountDown
            // onPress={this.sendAgain} //default null
            text={''} //default ''
            time={10} //default 60
            buttonStyle={{padding:20}}
            textStyle={{color:'black'}} //default black
            disabledTextStyle={{color:'gray'}} //default gray
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#477',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#225',
    marginBottom: 0
  },
  footer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#225',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  gamePicker: {
    width: 200,
    height: 50,
    padding: 10,
    backgroundColor:'yellow'
  },
  shuffleText: {
    padding: 10,
    borderRadius: 20,
    height: 40,
    backgroundColor: '#3396E6',
    color: 'white',
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  top: {
    width: '100%',
    flex: 1,
    backgroundColor: 'red',
  },
  bottom: {
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  midSquare: {
    width: squareSide-10,
    height: squareSide-10,
    backgroundColor: '#477',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tile: {
    height: '100%',
    backgroundColor: 'beige',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerTile: {
    backgroundColor: 'white',
    borderRadius: 100000,
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 40,
    fontWeight: 'bold',
    color:'#3396E6',
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  }
});
