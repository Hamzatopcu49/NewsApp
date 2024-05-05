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
        resimUrl: 'https://example.com/resim.jpg',
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
      <NewsAddButton />
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    backgroundColor: '#0782F9',
    padding: 15,
    alignItems:'center',
    borderRadius: 100,
    width: '20%',
    marginTop: 20,
  },
  buttonText:{
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
});