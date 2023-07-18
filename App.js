import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './components/Category';
import Home from './components/Home';
import BooksByCategory from './components/BooksByCategory';
import AddBook from './components/AddBook';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();


const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categorie" component={Category} />
      <Stack.Screen name="BookByCategorie" component={BooksByCategory} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator activeColor="black"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: 'rgba(29, 161, 242, 0.2)', height: 80 }} screenOptions={{ headerShown: false }}>

        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={25} />
            ),
            tabBarLabel: '', 
          }}
          component={Home}
        />

        <Tab.Screen

          name="Catégorie"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={25} />
            ),
            tabBarLabel: '', 
          }}
          component={StackNavigator}
        />

        <Tab.Screen

          name="Ajouter"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={25} />
            ),
            tabBarLabel: '', 
          }}
          component={AddBook}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



