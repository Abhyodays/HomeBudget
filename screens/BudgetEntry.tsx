import React, { useEffect, useState } from 'react';
import { View,Text, StyleSheet, Alert } from 'react-native';
import { Budget } from '../types';
import { TextInput,Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import {useDispatch} from 'react-redux'
import { addBudget, storeBudgetsInStorage } from '../redux/features/budgetSlice';
import { AppDispatch } from '../redux/store';

type RootStackParamList={
    Home:undefined
}

type BudgetScreenNavigationProp = StackNavigationProp<RootStackParamList>

interface BudgetEntryProps{
    navigation:BudgetScreenNavigationProp
}
interface budgetInputs{
    name:string,
    plannedAmount:string,
    actualAmount:string
}


// regular expression for decimal point number
const regex = /^[0-9]*\.?[0-9]{0,2}$/;

const BudgetEntry = ({navigation}:BudgetEntryProps)=>{
    const [values, setValues] = useState<budgetInputs>({name:'',plannedAmount:'',actualAmount:''});
    const dispatch = useDispatch<AppDispatch>();

    // method to verify input values
    const isInvalidValues = ():boolean=>{
        const {name, plannedAmount, actualAmount} = values;
        let convertedPlannedAmount = parseFloat(plannedAmount);
        let convertedActualAmount = parseFloat(actualAmount)
        return (name.length===0 || isNaN(convertedPlannedAmount) || isNaN(convertedActualAmount)) 
    }
    //add values to store
    const handleSubmit = ()=>{
        const {name, plannedAmount, actualAmount} = values;
        if(isInvalidValues()) return;
        const convertedValues:Budget = {name,plannedAmount:parseFloat(plannedAmount), actualAmount:parseFloat(actualAmount)};
        // sending values as payload
        dispatch(addBudget(convertedValues));
        try{
            dispatch(storeBudgetsInStorage());
        }
        catch(error){
            console.error(error)
        }
        Alert.alert('Budget added successfully.')
        //clean values
        setValues({name:'',plannedAmount:'',actualAmount:''})
    }

    return (
        <View style={styles.container}>
        <TextInput style={styles.input} label={"Name"} value={values.name} onChangeText={(text)=> setValues({...values, name:text})} mode='outlined'/>
        <TextInput style={styles.input} label={"Planned Amount"} value={values.plannedAmount.toString()} 
        onChangeText={(text)=>{
            if (regex.test(text)) {
                setValues({...values, plannedAmount:text});
            }
        }} 
        keyboardType='decimal-pad' mode='outlined'/>
        <TextInput style={styles.input} label={"Actual Amount"} value={values.actualAmount.toString()} 
        onChangeText={(text)=>{
            if (regex.test(text)) {
                setValues({...values, actualAmount:text});
            }
        }}  
        keyboardType='numeric' mode='outlined'/>
        <View style={styles.btnContainer}>
            <Button mode='contained' onPress={() => navigation.goBack()}>Show items</Button>
            <Button mode='contained'
            disabled={isInvalidValues()} onPress={handleSubmit}>Save</Button>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        gap:10
    },
    input:{
        width:'95%'
    },
    btnContainer:{
        flexDirection:'row',
        position:'absolute',
        bottom:20,
        justifyContent:'space-around',
        width:'100%'
    }
})

export default BudgetEntry;