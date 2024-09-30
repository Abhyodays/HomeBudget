import React from 'react';
import { View ,Text,StyleSheet, Platform, Dimensions} from 'react-native';
import { Budget } from '../types';

const budgetCard =(props:Budget)=> {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.name}</Text>
            <View>
            <Text style={styles.subtitle}>Planned Amount: {props.plannedAmount}</Text>
            <Text style={styles.subtitle}>Actual Amount: {props.actualAmount}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        minHeight: 50,
        backgroundColor:'#F3CCF3',
        borderRadius:20,
        padding: 10,
        paddingLeft:20,
        margin: 5,

    },
    title:{
        fontSize: 24,
        fontWeight:'500',
    },
    subtitle:{
        color:'grey'
    }
})

export default budgetCard;