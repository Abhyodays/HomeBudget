import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import BudgetEntry from './screens/BudgetEntry';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './redux/store';
import { useEffect } from 'react';
import { fetchBudgetsFromStorage } from './redux/features/budgetSlice';


const budgetStack = createStackNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <budgetStack.Navigator
      screenOptions={{headerStyle:{
        backgroundColor:'#86469C',
      },
      headerTintColor:'#fff'}}>
        <budgetStack.Screen name='Home' component={Home} options={{title:'Budget Entry Listings'}}/>
        <budgetStack.Screen name='BudgetEntry' component={BudgetEntry} options={{title:'Budget Entry'}} />
      </budgetStack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


