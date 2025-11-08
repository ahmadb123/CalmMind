import {registerUser} from '../api/userApi';

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
export default function RegisterScreen({navigation}){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [attachmentStyle, setAttachmentStyle] = useState('ANXIOUS');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () =>{
        if(!username || !email || !password){
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if(password.length < 6 || !password.length ){
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        setLoading(true);
        try{
            const userData = {
                username,
                email,
                password,
                attachmentStyle,    
            }
            const response = await registerUser(userData);
            Alert.alert('Success', 'User registered successfully!', [
                {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),  // ← Fixed: Use navigation directly
                },
            ]);

        }catch(error){
            Alert.alert('Error', error.message);
        }finally{
            setLoading(false);
        }
    };

    return(
        <>
            <TextInput
                style={styles.input}
                value={username}
                placeholder={"Username"}
                onChangeText= {(text) => setUsername(text)}
                autoCapitalize={"none"}
            />
            <TextInput
                style={styles.input}
                value={email}
                placeholder={"Email"}
                onChangeText= {(text) => setEmail(text)}
                autoCapitalize={"none"}
                keyboardType={"email-address"}
            />
            <TextInput
                style={styles.input}
                value={password}
                placeholder={"Password"}
                onChangeText= {(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <TextInput 
                style={styles.input}
                value={attachmentStyle}
                placeholder={"Attachment Style (e.g., ANXIOUS, AVOIDANT)"}
                onChangeText= {(text) => setAttachmentStyle(text)}
                autoCapitalize={"none"}
            />
            <Button 
                title={loading ? 'Registering...' : 'Register'}
                onPress={handleRegister}
                disabled={loading}
            />
            <Button 
                title="Already have an account? Login"
                onPress={() => navigation.navigate('Login')}
            />
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

