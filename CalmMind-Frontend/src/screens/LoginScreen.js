import React from 'react';
import {userLogin} from '../api/userApi';
import {
  View,
  Text,
  TextInput,      
  Button,         
  Alert,          
  StyleSheet,
} from 'react-native';
/*
Login using username and password
*/
function LoginScreen({navigation}){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () =>{
        try{
            const resp = await userLogin({username, password});
            Alert.alert('Success', 'Login successful');
            navigation.navigate('Home', {user:resp});
        }catch(error){
            Alert.alert('Error', error.message);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login to CalmMind</Text>
            {/* Username Input */}
            <TextInput
                style={styles.input}
                value={username}
                placeholder={"Username"}
                onChangeText= {(text) => setUsername(text)}
                autoCapitalize={"none"}
            />
            {/* Password Input */}
            <TextInput
                style={styles.input}
                value={password}
                placeholder={"Password"}
                onChangeText= {(text) => setPassword(text)}
                secureTextEntry={true}
            />
            {/* Login Button */}
            <Button
                title="Login"
                onPress={handleLogin}
            />
        </View>
    )
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  userInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
});