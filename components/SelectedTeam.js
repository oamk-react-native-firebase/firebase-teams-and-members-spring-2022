import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Button } from 'react-native';
import { db, MEMBERSHIPS_REF, MEMBERS_REF } from '../firebase/Config';
import { SelectedTeamMemberItem } from './SelectedTeamMemberItem';
import styles from '../style/style';

export default function Teams({route, navigation}) {

  const { team } = route.params;
  const [memberItems, setMemberItems] = useState({});

  useEffect(() => {
    db.ref(MEMBERSHIPS_REF)
      .child(team)
      .child(MEMBERS_REF).on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let memberItems = {...data};
        setMemberItems(memberItems);
    });
  }, []);

  let memberItemsKeys = Object.keys(memberItems);

  return (
    <ScrollView style={styles.container}>
      <Text style= {styles.header}>Team {team}</Text>
      <Text style= {styles.subheader}>Members ({memberItemsKeys.length})</Text>
      <View>
        {memberItemsKeys.length > 0 ? (
          memberItemsKeys.map(key => (
            <SelectedTeamMemberItem
              key={key}
              id={key}
              memberItem={memberItems[key]}
              team={team}
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