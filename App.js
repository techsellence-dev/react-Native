import React,{useState,useEffect} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/Screens/SignIn';
import SignUp from './src/Screens/SignUp';
import ConfirmSignIn from './src/Screens/ConfirmSignUp';
import ForgotPassword from './src/Screens/ForgotPasword';
import NewPassword from './src/Screens/NewPassword';
import Main from './src/Screens/Main'
import { Auth, Hub } from 'aws-amplify';
import 'react-native-gesture-handler';
import Style from './src/Styles/Style';
const Stack=createNativeStackNavigator();
const App=()=>{
  const [user,setUser]=useState(undefined);

  const checkUser=async()=>{
    try {
      const response=await Auth.currentAuthenticatedUser({bypassCache:true});
      setUser(response)
    } catch (error) {
       setUser(null)
    }
  }

  useEffect(()=>{
    checkUser();
  },[])

  useEffect(()=>{
    const listner=(data)=>{
      if(data.payload.event==='signIn' || data.payload.event==='signOut' ){
        checkUser();
      }
    }
    Hub.listen('auth',listner);
    return () => Hub.remove('auth',listner);
  },[])
  if(user===undefined){
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={30} color="blue"/>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} >
        { user ? (
          <>
            <Stack.Screen name="Main" component={Main} />
          </>
        ):
        (<>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="confirmEmail" component={ConfirmSignIn} />
          <Stack.Screen name="forgetpassword" component={ForgotPassword} />
          <Stack.Screen name="newPassword" component={NewPassword} />
        </>)
      }
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;