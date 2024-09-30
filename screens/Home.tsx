import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Platform, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Budget } from '../types';
import BudgetCard from '../components/BudgetCard';
import { Button, IconButton } from 'react-native-paper';
import { AppDispatch } from '../redux/store';
import { fetchBudgetsFromStorage } from '../redux/features/budgetSlice';
// parameter for navigation
type RootStackParamList = {
    BudgetEntry: undefined
}
type budgetState = {
    budgets: Budget[]
}
// type definition for stack navigation
type HomeScreenNavigatorProp = StackNavigationProp<RootStackParamList>;
interface HomeProps {
    navigation: HomeScreenNavigatorProp
}
const Home = ({ navigation }: HomeProps) => {
    const budgets = useSelector((state: budgetState) => state.budgets);
    // console.log(budgets)
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchBudgetsFromStorage())
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            {budgets.length > 0 ? (
                <FlatList
                    data={budgets}
                    renderItem={({ item }) => <BudgetCard {...item} />}
                />
            ) :
                <View style={styles.noBudget}>
                    <Text style={styles.noBudgetText}>Your budgets seems to be enjoying a well-deserved vacation on a beach somewhere.
                        Time to bring it back!</Text>
                </View>
            }

            <IconButton icon='plus' mode='contained'
                iconColor='#fff' containerColor='#86469C' size={40}
                style={styles.addIcon}
                onPress={() => navigation.push('BudgetEntry')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    addIcon: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    noBudget: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noBudgetText: {
        width: '90%',
        fontSize: 16,
        fontWeight: '500',
        color: '#B4B4B8'

    }
})
export default Home;