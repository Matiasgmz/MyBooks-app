import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack' ;
import Category from './components/Category';
import Home from './components/Home';
import SearchBook from './components/SearchBook';
import BooksByCategory from './components/BooksByCategory';

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Categorie" component={Category} />
      <Stack.Screen name="BookByCategorie" component={BooksByCategory} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>

        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
          component={Home}
        />

        <Tab.Screen
 
          name="Catégorie"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" color={color} size={size} />
            ),
          }}
          component={StackNavigator}
        />


        <Tab.Screen
          name="Recherche"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" color={color} size={size} />
            ),
          }}
          component={SearchBook}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
