import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

import { createMinedBoard } from './src/functions';
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
    }

  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines!</Text>
        <Text style={styles.instructions}>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>

        <View style={styles.board}>
          <MineField board={this.state.board} />
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
