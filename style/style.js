import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 15,
    height: '20%',
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
    fontSize: 30
  },
  subheader: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 20
  },
  newTeamItem: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: -25
  },
  infoText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    width: "90%"
  },
  teamName: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '64%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 20,
    fontSize: 14,
    marginRight: 3
  },
  nickname: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '25%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 20,
    fontSize: 14,
    marginRight: 3
  },
  description: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 20,
    fontSize: 14,
  },
  newMemberItem: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  name: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '31%',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 20,
    fontSize: 14,
    marginRight: 3
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  team: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    minWidth: '70%'
  },
  member: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    minWidth: '70%'
  },
  teamHeader: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    minWidth: '80%',
    fontWeight: 'bold',
  },
  memberHeader: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
    minWidth: '80%'
  },
  picker: {
    marginTop: 10,
    marginBottom: 10
  },
  flex: {
    flexDirection: "row",
  }
});