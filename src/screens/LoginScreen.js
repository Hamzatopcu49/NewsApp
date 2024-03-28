import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior='padding'>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
        placeholder='Kullanıcı Adı'/>
        <TextInput style={styles.input}
        placeholder='Şifre'/>
      </View>
      <View style={styles.buttonContanier}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,styles.outlineButton]}>
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
    marginTop: '5',
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
    marginTop: 5,
  },
  outlineButtonText:{
    color: '#0782F9',
    fontSize: 17,
    fontWeight: '700',
  },
})