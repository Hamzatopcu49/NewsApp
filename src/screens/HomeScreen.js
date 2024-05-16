import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, FlatList, Modal, Button, TextInput } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { auth,firestore } from '../../firebase'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {


  const navigation = useNavigation();
  const [haberler, setHaberler] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [resimUrl, setResimUrl] = useState('');
  const [yazar, setYazar] = useState('');

  useEffect(() => {
    const haberGetir = async () => {
      try {
        const snapshot = await firestore.collection('haberler').get();
        const yeniHaberler = snapshot.docs.map(doc => doc.data());
        setHaberler(yeniHaberler);
      } catch (error) {
        console.error('Haberler getirilirken hata oluştu:', error);
      }
    };
    haberGetir();
  }, []);
  
  const haberEkle = async () => {
    try {
      await firestore.collection('haberler').add({
        baslik: baslik,
        icerik: icerik,
        resimUrl: resimUrl,
        yazar:yazar,
      });
      console.log('Haber başarıyla eklendi');
      setModalVisible(false);
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

      <FlatList
        data={haberler}
        renderItem={({ item }) => (
          <View style={styles.haber}>
            <Image source={{ uri: item.resimUrl }} style={styles.haberResim} />
            <Text style={styles.haberBaslik}>{item.baslik}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.haberListesi}
      />
    
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Çıkış</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.newsAddButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Haber Ekle</Text>
            <TextInput
              style={styles.input}
              placeholder="Başlık"
              value={baslik}
              onChangeText={setBaslik}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="İçerik"
              value={icerik}
              onChangeText={setIcerik}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Resim URL"
              value={resimUrl}
              onChangeText={setResimUrl}
            />
            <TextInput
              style={styles.input}
              placeholder="Yazar"
              value={yazar}
              onChangeText={setYazar}
            />
            <Button
              title="Kaydet"
              onPress={haberEkle}
            />
          </View>
        </View>
      </Modal>
      
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
  haberListesi: {
    paddingHorizontal: 20,
    paddingTop: 20, 
  },
  haber: {
    marginBottom: 40,
    
  },
  haberResim: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  haberBaslik: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  haberYazar: {
    fontStyle: 'italic',
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});