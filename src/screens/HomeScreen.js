import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native'
import React from 'react'
import { auth,firestore } from '../../firebase'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {

  const navigation = useNavigation();
  
  const haberEkle = async () => {
    try {
      await firestore().collection('haberler').add({
        baslik: 'Örnek Haber Başlığı',
        icerik: 'Bu örnek haber içeriğidir.',
        resimUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2F%40Galatasaray&psig=AOvVaw1W9nv2IDvI0E0K162SWjE6&ust=1715505835046000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDAhbGjhYYDFQAAAAAdAAAAABAE',
        yazar: 'Yazar Adı',
      });
      console.log('Haber başarıyla eklendi');
    } catch (error) {
      console.error('Haber eklenirken hata oluştu:', error);
    }
  };


  const handleSignOut= () =>{
    auth.signOut().then(()=>{
      navigation.navigate('Login');
    }).catch(error =>alert(error.message));
  };
  const NewsAddButton = () => {
    return (
        <TouchableOpacity 
          onPress={haberEkle} 
          style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Çıkış</Text>
      </TouchableOpacity>
      <View style={styles.newsAddButton}>
        
        <NewsAddButton />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signOutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#0782F9',
    padding: 10,
    borderRadius: 40,
  },
  newsAddButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 100,
    width: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
});