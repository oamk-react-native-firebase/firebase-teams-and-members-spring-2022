import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo'
import { db, MEMBERSHIPS_REF, MEMBERS_REF } from '../firebase/Config';
import styles from '../style/style';

export const SelectedTeamMemberItem = ({memberItem: {active}, id, team}) => {

  const [activeState, setActive] = useState(active);

  const onCheck = () => {
    setActive(!activeState);
    db.ref(MEMBERSHIPS_REF).child(team).child(MEMBERS_REF).child(id).update({
      active: !activeState,
    })
  }
  
  const onRemove = () => {
    db.ref(MEMBERSHIPS_REF).child(team).child(MEMBERS_REF).child(id).remove();
  };
  
  return (
    <View style={styles.memberItem}>
      <Pressable onPress={onCheck}>
        {activeState 
          ? <MaterialIcons name={'check-box'} size={26} />
          : <MaterialIcons name={'check-box-outline-blank'} size={26} />}
      </Pressable>
      <Text style={[styles.member]}>{id}</Text>
      <Pressable>
        <Entypo name={'trash'} size={26} onPress={onRemove} />
      </Pressable>
    </View>
  );
}