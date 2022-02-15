import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button, Alert } from 'react-native';
import { db, TEAMS_REF, MEMBERS_REF, MEMBERSHIPS_REF } from '../firebase/Config';
import styles from '../style/style';
import { Picker } from '@react-native-picker/picker';
// import { Picker } from 'react-native';
import uuid from 'react-uuid';

export default function Memberships({navigation}) {

  const [teamItems, setTeamItems] = useState({});
  const [selectedTeamNickname, setSelectedTeamNickname] = useState('');
  const [memberItems, setMemberItems] = useState({});
  const [selectedMemberNickname, setSelectedMemberNickname] = useState('');
  const [membershipItems, setMembershipItems] = useState({});

  useEffect(() => {
    db.ref(TEAMS_REF).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let teamItems = {...data};
      setTeamItems(teamItems);
    });
    db.ref(MEMBERS_REF).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let memberItems = {...data};
      setMemberItems(memberItems);
    });
    db.ref(MEMBERSHIPS_REF).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let membershipItems = {...data};
      setMembershipItems(membershipItems);
    });
  }, []);

  function addMemberToTeam() {
    if (selectedTeamNickname !== "" && selectedMemberNickname !== "") {
      db.ref(
        MEMBERSHIPS_REF + "/" +
        selectedTeamNickname + "/" +
        MEMBERS_REF + "/" +
        selectedMemberNickname).once('value', querySnapShot => {
        if (querySnapShot.val() === null) {
          db.ref(MEMBERSHIPS_REF + "/" +
            selectedTeamNickname + "/" +
            MEMBERS_REF + "/" +
            selectedMemberNickname)
            .set({
              active: true,
              joined: getCurrentDate()
            });
        }
        else {
          Alert.alert(
            'Member ' + selectedMemberNickname + 
            ' is already a member of team ' + selectedTeamNickname);
        }
      });
    }
    else {
      Alert.alert('Select team and member');
    }
  }

  function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return dd + '.' + mm + '.' + yyyy;
  }

  let teamItemsKeys = Object.keys(teamItems);
  let memberItemsKeys = Object.keys(memberItems);
  let membershipItemsKeys = Object.keys(membershipItems);
  
  return (
    <ScrollView style={styles.container}>
      <Text style= {styles.header}>Memberships</Text>
      <Text style= {styles.subheader}>Teams ({teamItemsKeys.length})</Text>
      {teamItemsKeys.length > 0 && (
        <Picker
          style={styles.picker}
          selectedValue={selectedTeamNickname}
          onValueChange={(itemValue) => setSelectedTeamNickname(itemValue)}>
          <Picker.Item key={0} label="Select team..." value="" />
          {teamItemsKeys.map((key, index) => (
            <Picker.Item 
              key={index}
              label={
                teamItems[key].nickname + " (" + 
                teamItems[key].description + ")"
              }
              value={teamItems[key].nickname} />
          ))
          }
        </Picker>
      )}
      <Text style= {styles.subheader}>Members ({memberItemsKeys.length})</Text>
      <View>
        {memberItemsKeys.length > 0 && (
          <Picker
            style={styles.picker}
            selectedValue={selectedMemberNickname}
            onValueChange={(itemValue) => setSelectedMemberNickname(itemValue)}>
            <Picker.Item key={0} label="Select member..." value="" />
            {memberItemsKeys.map((key, index) => (
              <Picker.Item 
                key={index}
                label={
                  memberItems[key].nickname + " (" + 
                  memberItems[key].firstname + " " +
                  memberItems[key].lastname + ")"}
                value={memberItems[key].nickname}/>
            ))
          }
        </Picker>
        )}
      </View>
      <Text style= {styles.subheader}>Memberships</Text>
      <View>
        {membershipItemsKeys.length > 0 ? (
          membershipItemsKeys.map((team, teamIndex) => (
            <View key={uuid()}>
              <Text style={styles.teamHeader} key={uuid()}>{team}</Text>
              {Object.keys(membershipItems[team].members).map((member, memberIndex) => (
                <View key={uuid()}>
                  <Text style={styles.member} key={uuid()}>
                    {member} (joined: {membershipItems[team].members[member].joined}, 
                    active: {membershipItems[team].members[member].active ? "Yes" : "No" } )
                  </Text>
                </View>
              ))
              }
            </View>
          ))
        ) : (
          <Text style={styles.infoText}>There are no memberships</Text>
        )}
      </View>
      {(teamItemsKeys.length > 0 && memberItemsKeys.length > 0) && 
        <View style={styles.buttonStyle}>
          <Button
            title="Add member to team" 
            onPress={() => addMemberToTeam()} />
        </View>
      }
      <View style={styles.buttonStyle}>
        <Button
          title="Manage teams" 
          onPress={() => navigation.navigate('Teams')} />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title="Manage members" 
          onPress={() => navigation.navigate('Members')} />
      </View>
    </ScrollView>
  );
}