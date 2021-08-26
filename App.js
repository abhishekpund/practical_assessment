import "react-native-gesture-handler";
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeBaseProvider} from 'native-base';

import AddProduct from "./src/AddProduct";
import ProductList from "./src/ProductList";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Add Product"
              component={AddProduct}
              options={({navigation}) => ({
                headerTitleAlign: "center",
                headerTitleStyle: {color: "#FFFFFF"},
                headerStyle: {backgroundColor: "#4338ca"}
              })}
            />
            <Stack.Screen
              name="Product Lists"
              component={ProductList}
              options={({navigation}) => ({
                headerTitleAlign: "center",
                headerTitleStyle: {color: "#FFFFFF"},
                headerStyle: {backgroundColor: "#4338ca"}
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;