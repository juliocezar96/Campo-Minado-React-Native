import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert } from 'react-native';

import Header from './src/components/Header';
import { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag,flagsUsed } from './src/functions';
import MineField from './src/components/MineField';
import Flag from './src/components/Flag';
import Field from './src/components/Field';
import params from './src/params';


export default class App extends Component{

  constructor(props){
    super(props);
    this.state = this.createState();
  }

  //calcula quantidade de minas dentro do tabuleiro e percentua a dificuldade 
  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();

    return {
      board : createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false
    }

  }

  onOpenField = (row, column) => {

    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if(lost){
      showMines(board)
      Alert.alert('Peeerdeu', 'LOL');
    }

    if(won){
      Alert.alert('Parabens', 'Ganhou');
    }

    this.setState({board, lost, won});
  }

  onSelectField = (row, column) => {

    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if(won){
      Alert.alert('Parabens', 'Ganhou')
    }

    this.setState({board, won});
  }

  render(){
    return(
      <View style={styles.container}>
       <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} 
       onNewGame={() => this.setState(this.createState())}/>
        <View style={styles.board}>
          <MineField board={this.state.board}
           onOpenField={this.onOpenField}
           onSelectField={this.onSelectField}/>
        </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'flex-end',
    
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  },
  welcome:{

  },
  instructions:{
    
  }
})
