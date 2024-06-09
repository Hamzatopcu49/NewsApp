import { StyleSheet, Text, View, TouchableOpacity, Pressable, Image, FlatList, Modal, Button, TextInput } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { auth,firestore } from '../../firebase'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {

  const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200';
  const navigation = useNavigation();
  const [haberler, setHaberler] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [resimUrl, setResimUrl] = useState('');
  const [yazar, setYazar] = useState('');
  const [kategori, setKategori] = useState('');
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const haberGetir = async () => {
      try {
        const snapshot = await firestore.collection('haberler').get();
        const yeniHaberler = snapshot.docs.map(doc => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setHaberler(yeniHaberler);
      } catch (error) {
        console.error('Haberler getirilirken hata oluştu:', error);
      }
    };haberGetir();

    const unsubscribe = navigation.addListener('focus', () => {
      haberGetir();
    });return unsubscribe;
  }, [navigation]);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);
  
  const haberEkle = async () => {
    try {
      await firestore.collection('haberler').add({
        baslik: baslik,
        icerik: icerik,
        resimUrl: resimUrl,
        yazar:yazar,
        kategori:kategori,
      });
      console.log('Haber başarıyla eklendi');
        setModalVisible(false);
        navigation.navigate('HomeScreen', { refresh: true });
        setBaslik('');
        setIcerik('');
        setResimUrl('');
        setYazar('');
        setKategori('');
    } catch (error) {
      console.error('Haber eklenirken hata oluştu:', error);
    }
  };

  const handleSignOut= () =>{
    auth.signOut().catch(error =>alert(error.message));
  };
  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const filteredHaberler = selectedKategori
    ? haberler.filter(haber => haber.kategori === selectedKategori)
    : haberler;

    const handleHaberDetay = (haber) => {
      navigation.navigate('Detail', { haber });
    };

    const renderHaber = ({ item }) => (
      <TouchableOpacity onPress={() => handleHaberDetay(item)}>
       <View style={styles.haber}>
        <Image
        source={{ uri: item.resimUrl || DEFAULT_IMAGE_URL }}
        style={styles.haberResim}
        />
       <Text style={styles.haberBaslik}>{item.baslik}</Text>
      </View>
   </TouchableOpacity>
    );
    const kategoriler = ['Tümü', 'Teknoloji', 'Spor', 'Ekonomi', 'Saglik', 'Egitim'];
    const renderKategori = ({ item }) => (
      <TouchableOpacity
        onPress={() => setSelectedKategori(item === 'Tümü' ? null : item)}
        style={[styles.kategoriButton, selectedKategori === item ? styles.selectedKategori : null]}
      >
        <Text style={styles.kategoriButtonText}>{item}</Text>
      </TouchableOpacity>
    );
  return (

    <View style={styles.container}>

      <FlatList
        data={kategoriler}
        renderItem={renderKategori}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.kategoriListesi}
      />
      <FlatList
        data={filteredHaberler}
        renderItem={renderHaber}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.haberListesi}
      />
    
    <TouchableOpacity
        onPress={user ? handleSignOut : handleSignIn}
        style={[styles.authButton, { backgroundColor: user ? 'red' : 'green' }]}
      >
        <Text style={styles.authButtonText}>{user ? 'Çıkış Yap' : 'Giriş Yap'}</Text>
      </TouchableOpacity>

      {user && (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.newsAddButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      )}

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
              style={[styles.input, { height: 150 }]}
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
            <TextInput
              style={styles.input}
              placeholder="Kategori"
              value={kategori}
              onChangeText={setKategori}
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
  authButton: {
    position: 'absolute',
    top: 33,
    right: 10,
    padding: 10,
    borderRadius: 40,
  },
  authButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
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
  kategoriListesi: {
    minHeight: 150,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15,
  },
  kategoriButton: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'black',
    marginTop: 60,
    maxHeight:50,
    alignItems: 'center', 
},
  selectedKategori: {
    backgroundColor: 'gray',
  },
  kategoriButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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