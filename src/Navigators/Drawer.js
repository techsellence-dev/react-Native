import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Home from './Home';
import Lambda from '../Screens//Lambda';
import CreateGroup from '../Screens/CreateGroup';
const Drawer=createDrawerNavigator();
const DrawerNavigator=()=>{
    return(
        // <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown:false}}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="New Group" component={CreateGroup} />
                <Drawer.Screen name="lambda" component={Lambda} />
            </Drawer.Navigator>
        // </NavigationContainer>
    )
}
export default DrawerNavigator;