import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import {AntDesign} from "@expo/vector-icons"
import colors from './Colors';
import TodoList from './components/TodoList';
import AddListModel from "./components/AddListModel"
import Fire from './Fire'



export default class App extends React.Component{
   state = {
     addTodoVisible: false,
     lists: [],
     user:{},
     Loading: true
     
   };

   componentDidMount(){
     firebase = new Fire((error, user) => {
         if(error){
           return alert("oh no something went wrong")
         }

         firebase.getLists(lists => {
            this.setState({lists, user}, () => {
              this.setState({Loading: false});  
            });
         });

         this.setState({ user })
     });
   }

   componentWillUnmount(){
      firebase.detach()
   }

 

  

   toggleAddTodoModel() {
     this.setState({ addTodoVisible: !this.state.addTodoVisible });
   }

   renderList = list => {
     return <TodoList list={list} updateList={this.updateList} />
   }

   addList = list => {
      firebase.addList({
         name: list.name,
         color: list.color,
         todos:[]
      })
   };

   updateList = list => {
      firebase.updateList(list)
        
   }

  render(){
    if (this.state.Loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      )
    }
     
    return (
      
     
      <View style={styles.container}>
        <Modal a
        nimationType="slide" 
        visible={this.state.addTodoVisible} 
        onRequestClose={() => this.toggleAddTodoModel()}
   >
          <AddListModel closeModel={() => this.toggleAddTodoModel()} addList={this.addList}/>
        </Modal>
       
        <View style={{flexDirection: "row",}}>
          <View style={styles.divider} />
          <Text style={styles.Title}>
            Todo <Text style={{fontWeight: "300", color: colors.blue}}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{marginVertical: 48}}>
           <TouchableOpacity style={styles.addLists} onPress={() => this.toggleAddTodoModel()}>
              <AntDesign name="plus" size={16} color={colors.blue} />
           </TouchableOpacity>

           <Text style={styles.add}>Add List</Text>
        </View>

        <View style={{height: 275, paddingLeft: 32}}>
           <FlatList 
           data={this.state.lists} 
           keyExtractor={item => item.id.toString()} 
           horizontal={true} 
           showsHorizontalScrollIndicator={false}
           renderItem={({item}) => this.renderList(item)}
           keyboardShouldPersistTaps="always"
          />
           
        </View>
      </View> 

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider:{
    backgroundColor: colors.lightblue,
    height:1,
    flex:1,
    alignSelf:"center"

  },
  Title:{
    fontSize:38,
    fontWeight:"800",
    color: colors.black,
    paddingHorizontal:64
  },
  addLists:{
    borderWidth:2,
    borderColor: colors.lightblue,
    borderRadius:4,
    padding:16,
    alignSelf:"center",
    justifyContent:"center"
  },
  add:{
    color: colors.blue,
    fontWeight:"600",
    fontSize:14,
    marginTop:8
  }
});
