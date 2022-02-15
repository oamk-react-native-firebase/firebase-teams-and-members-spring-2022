import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, TextInput, Alert } from 'react-native';
import { db, TEAMS_REF } from '../firebase/Config';
import { TeamItem } from './TeamItem';
import styles from '../style/style';

export default function Teams({navigation}) {
  
  const [teamItems, setTeamItems] = useState({});
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    db.ref(TEAMS_REF).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let teamItems = {...data};
      setTeamItems(teamItems);
    });
  }, []);
  
  function addTeam() {
    let newNickname = nickname.trim().toLowerCase();
    db.ref(TEAMS_REF).child(newNickname).once('value', querySnapShot => {
      if (querySnapShot.val() === null) {
        db.ref(TEAMS_REF).child(newNickname).set({
          name: name.trim(),
          nickname: newNickname,
          description: description.trim()
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
    setName('');
    setNickname('');
    setDescription('');
  };

  const handlePress = () => {
    if (!name) {
      Alert.alert('Name is required');
    }
    else if (!nickname) {
      Alert.alert('Nickname is required.');
    } else if (!description) {
      Alert.alert('Description is required.');
    } else {
      addTeam();
      clearState();
    }
  };

  let teamItemsKeys = Object.keys(teamItems);

  return (
    <ScrollView style={styles.container}>
      <Text style= {styles.header}>Manage teams</Text>
      <Text style= {styles.subheader}>Teams ({teamItemsKeys.length})</Text>
      <View style={styles.newTeamItem}>
        <TextInput
          placeholder="Name*"
          value={name}
          style={styles.teamName}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          placeholder="Nickname*"
          value={nickname}
          style={styles.nickname}
          onChangeText={(nickname) => setNickname(nickname)}
        />
      </View>
      <View>
        <TextInput
          placeholder="Description*"
          value={description}
          style={styles.description}
          onChangeText={(description) => setDescription(description)}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button title="OK" onPress={handlePress} />
      </View>
      <View>
        {teamItemsKeys.length > 0 ? (
          teamItemsKeys.map(key => (
            <TeamItem
              key={key}
              id={key}
              teamItem={teamItems[key]}
              navigation={navigation}
            />
          ))
        ) : (
          <Text style={styles.infoText}>There are no teams</Text>
        )}
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title="Manage Members" 
          onPress={() => navigation.navigate('Members')} />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title="Memberships" 
          onPress={() => navigation.navigate('Memberships')} />
      </View>
    </ScrollView>
  );
}