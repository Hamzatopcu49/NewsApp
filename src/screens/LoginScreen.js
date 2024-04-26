import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate('Home');
      }
    });
  },[]);

  const handleSignUp = () =>{
    auth.createUserWithEmailAndPassword(userName,password).then(userCredentials=>{
      const user = userCredentials.user;
      console.log('Kullanıcı',user.userName);
    }).catch((error) => alert(error.message));
  };

  const handleLogin = () =>{
    auth.signInWithEmailAndPassword(userName,password).then(userCredentials=>{
      const user = userCredentials.user;
      console.log('Kullanıcı giriş yaptı',user.userName);
    }).catch((error)=>alert(error.message));
  };
  

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
        placeholder='Kulanıcı Adı'
        value={userName}
        onChangeText={(text) => setUserName(text)}/>
        <TextInput style={styles.input}
        placeholder='Şifre' secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}/>
      </View>
      <View style={styles.buttonContanier}>
        <TouchableOpacity 
           onPress={handleLogin} 
           style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleSignUp} 
          style={[styles.button,styles.outlineButton]}>
          <Text style={styles.outlineButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer:{
    width: '80%',
  },
  input:{
    backgroundColor: 'white',
    paddingHorizontal: '15',
    paddingVertical: '10',
    marginTop: 10,
    borderRadius: 10,
  },
  buttonContanier:{
    width: '60%',
    marginTop: 40,
  },
  button:{
    backgroundColor: '#0782F9',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText:{
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  outlineButton:{
    backgroundColor: 'white',
    marginTop: 10,
  },
  outlineButtonText:{
    color: '#0782F9',
    fontSize: 17,
    fontWeight: '700',
  },
})