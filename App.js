import React, { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

import Flag from './src/components/Flag';
import Field from './src/components/Field';
import params from './src/params';


export default class App extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Iniciando o Mines!</Text>
        <Text style={styles.instructions}>Tamanho da grade: 
          {params.getRowsAmount()}x{params.getColumnsAmount()}
        </Text>

        <Flag />
        <Flag bigger/>

        <Field />
        <Field opened />
        <Field opened nearMines={1} />
        <Field opened nearMines={2} />
        <Field opened nearMines={3} />
        <Field opened nearMines={6} />
        <Field mined />
        <Field mined opened />
        <Field mined opened  exploded/>
        <Field flagged/>
        <Field flagged opened/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    justifyContent:'space-around',
    alignItems:'center',
    
  },
  welcome:{

  },
  instructions:{
    
  }
})
