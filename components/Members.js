import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, TextInput, Alert } from 'react-native';
import { db, MEMBERS_REF } from '../firebase/Config';
import { MemberItem } from './MemberItem';
import styles from '../style/style';

export default function Members({navigation}) {
  
  const [memberItems, setMemberItems] = useState({});
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    db.ref(MEMBERS_REF).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let memberItems = {...data};
      setMemberItems(memberItems);
    });
  }, []);

  function addMember() {
    let newNickname = nickname.trim().toLowerCase();
    db.ref(MEMBERS_REF).child(newNickname).once('value', querySnapShot => {
      if (querySnapShot.val() === null) {
        db.ref(MEMBERS_REF).child(newNickname).set({
          firstname: firstname,
          lastname: lastname,
          nickname: newNickname
        });
        clearState();
      }
      else {
        Alert.alert('Nickname ' + nickname + ' is not free. ' +
          'Pick another nickname.');  
      }
    });
  }

  const clearState = () => {
    setFirstname('');
    setLastname('');
    setNickname('');
  };

  const handlePress = () => {
    if (!firstname) {
      Alert.alert('Firstname is required');
    }
    if (!lastname) {
      Alert.alert('Lastname is required');
    }
    else if (!nickname) {
      Alert.alert('Nickname is required.');
    } else {
      addMember();
      clearState();
    }
  };

  let memberItemsKeys = Object.keys(memberItems);

  return (
    <ScrollView style={styles.container}>
      <Text style= {styles.header}>Manage members</Text>
      <Text style= {styles.subheader}>Members ({memberItemsKeys.length})</Text>
      <View style={styles.newMemberItem}>
        <TextInput
          placeholder="First name*"
          value={firstname}
          style={styles.name}
          onChangeText={(firstname) => setFirstname(firstname)}
        />
        <TextInput
          placeholder="Last name*"
          value={lastname}
          style={styles.name}
          onChangeText={(lastname) => setLastname(lastname)}
        />
        <TextInput
          placeholder="Nickname*"
          value={nickname}
          style={styles.nickname}
          onChangeText={(nickname) => setNickname(nickname)}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button title="OK" onPress={handlePress} />
      </View>
      <View>
        {memberItemsKeys.length > 0 ? (
          memberItemsKeys.map(key => (
            <MemberItem
              key={key}
              id={key}
              memberItem={memberItems[key]}
            />
          ))
        ) : (
          <Text style={styles.infoText}>There are no members</Text>
        )}
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title="Manage Teams" 
          onPress={() => navigation.navigate('Teams')} />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title="Memberships" 
          onPress={() => navigation.navigate('Memberships')} />
      </View>
    </ScrollView>
  );
}