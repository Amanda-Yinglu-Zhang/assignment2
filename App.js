import React , { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import firebase from './firebase';

const todos = [
  {
  
//     title: 'Igore me',
//   },
//   {

//     title: 'I am not working',
//   },

];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title }</Text>
    </View>
  );
}

export default class App extends Component {
  todosDatabase = firebase.database().ref('title');
  state = { todos : {
  title: 'titles.title'} , selectedId: 'titles.id'}
  //read
  componentDidMount() {
   this.todosDatabase.on('value', todos => {
     const todosJSON = todos.val();
    this.setState({todos: todosJSON === null ? {} : todosJSON }) ;
   })
   this.todosDatabase.push({ title:'do your homework'})
  }
  //create
  create(){
  this.todosDatabase
  .push({title:'do your homework'})
}
delete(){
  if(this.state.selectedId === 'hello world'){
    return;
  }
  this.todosDatabase.child(this.state.selectedId)
  .set(null)
  this.setState({selectedId: 'hello world'})
 }

  render (){
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Button title="Create" onPress={()=>this.create()}></Button>
       <Button title="Delete" onPress={()=>this.delete()}></Button>
       {
       Object.keys(this.state.todos).map( (todosId, index ) =>
        <TouchableOpacity key={index} onPress={()=>this.setState({selectedId: todosId})}
        style={[
          styles.item,
          { backgroundColor: '#f9c2ff' },
        ]}>
          
<Text>{`${JSON.stringify(this.state.todos[todosId])}`}</Text>
        </TouchableOpacity>
       )

     }
     
       
     
      <FlatList
        data={todos}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      </ScrollView>
    </SafeAreaView>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
 

});
