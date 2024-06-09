import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';
import { firestore, auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
  const { haber } = route.params;
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [currentHaber, setCurrentHaber] = useState(haber);
  const [editBaslik, setEditBaslik] = useState(haber.baslik);
  const [editIcerik, setEditIcerik] = useState(haber.icerik);
  const [editResimUrl, setEditResimUrl] = useState(haber.resimUrl);
  const [editKategori, setKategori] = useState(haber.kategori);
  const [editYazar, setEditYazar] = useState(haber.yazar);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setCurrentHaber(haber);
  }, [haber]);

  const deleteHaber = async () => {
    try {
      await firestore.collection('haberler').doc(haber.id).delete();
      Alert.alert('Başarılı', 'Haber başarıyla silindi.');
      navigation.navigate('HomeScreen', { refresh: true });
    } catch (error) {
      console.error('Haber silinirken hata oluştu:', error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Emin misiniz?',
      'Bu haberi silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Sil', onPress: deleteHaber },
      ],
      { cancelable: false }
    );
  };

  const updateHaber = async () => {
    try {
      await firestore.collection('haberler').doc(haber.id).update({
        baslik: editBaslik,
        icerik: editIcerik,
        resimUrl: editResimUrl,
        yazar: editYazar,
        kategori: editKategori,
      });
      Alert.alert('Başarılı', 'Haber başarıyla güncellendi.');
      setCurrentHaber({
        ...currentHaber,
        baslik: editBaslik,
        icerik: editIcerik,
        resimUrl: editResimUrl,
        yazar: editYazar,
        kategori: editKategori,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Haber güncellenirken hata oluştu:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: currentHaber.resimUrl || 'https://via.placeholder.com/200' }}
        style={styles.image}
      />
      <Text style={styles.title}>{currentHaber.baslik}</Text>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.content}>{currentHaber.icerik}</Text>
      </ScrollView>
      <View style={styles.authorContainer}>
        <Text style={styles.author}>Yazar: {currentHaber.yazar}</Text>
        {user && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Düzenle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={confirmDelete}>
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditing}
        onRequestClose={() => setIsEditing(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Haber Düzenle</Text>
            <TextInput
              style={styles.input}
              placeholder="Başlık"
              value={editBaslik}
              onChangeText={setEditBaslik}
            />
            <TextInput
              style={[styles.input, { height: 150 }]}
              placeholder="İçerik"
              value={editIcerik}
              onChangeText={setEditIcerik}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Resim URL"
              value={editResimUrl}
              onChangeText={setEditResimUrl}
            />
            <TextInput
              style={styles.input}
              placeholder="Kategori"
              value={editKategori}
              onChangeText={setKategori}
            />
            <TextInput
              style={styles.input}
              placeholder="Yazar"
              value={editYazar}
              onChangeText={setEditYazar}
            />
            <Button 
              title="Kaydet"
              onPress={updateHaber}
            />
            <Button
              title="İptal"
              onPress={() => setIsEditing(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    flex: 1,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#0782F9',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
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

export default DetailScreen;
