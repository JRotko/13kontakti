import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from'expo-contacts'
import {useState} from 'react'




export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [contacts, setContacts] = useState([]);



  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })
      setContacts(data);
    }
  }



  return (
    <View style={styles.container}>
      <FlatList
          data={contacts}
          renderItem={({ item }) =>
            <Text>{item.firstName}  {item.phoneNumbers[0].number}</Text>
          }
          keyExtractor={(item, index) => index.toString()}
        />

      <Button title="Get Contacts" onPress={getContacts}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 50,
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 50
  },
});
