import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign';
import { db, MEMBERSHIPS_REF, TEAMS_REF } from '../firebase/Config';
import styles from '../style/style';

export const TeamItem = ({teamItem: {name, nickname }, id, navigation}) => {

  const onSelect = () => {
    navigation.navigate('SelectedTeam', {team: nickname});
  }
  
  const onRemove = () => {
    db.ref(TEAMS_REF + [id]).remove();
    db.ref(MEMBERSHIPS_REF).child(id).remove();
  };
  
  return (
    <View style={styles.teamItem}>
      <Text style={[styles.team]}>
      {name} ({nickname})</Text>
      <Pressable>
        <AntDesign name={'team'} size={26} onPress={onSelect} />
      </Pressable>
      <Pressable>
        <Entypo name={'trash'} size={26} onPress={onRemove} />
      </Pressable>
    </View>
  );
}