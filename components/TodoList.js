import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native"
import colors from "../Colors";
import TodoModel from "./TodoModel";

export default class TodoList extends React.Component  {
    state={
        showlistVisible: false
    }
    
    toggleListModel(){
        this.setState({showlistVisible: !this.state.showlistVisible})
    }
    
    render(){
        const list = this.props.list


        const completedCount = list.todos.filter(todo => todo.completed).length;
        const RemainingCount = list.todos.length - completedCount;
   
           

            return(
             <View>
                 <Modal animationType="slide" 
                 visible={this.state.showlistVisible} 
                 onRequestClose={() => this.toggleListModel()}>


                   <TodoModel 
                   list={list} 
                   closeModel={() => this.toggleListModel()}
                   updateList={this.props.updateList} 

                   /> 
                   </Modal>

                 <TouchableOpacity style={[styles.listContainer, {backgroundColor: list.color}]} 
                 onPress={() => this.toggleListModel()}>

                <Text style={styles.listTitler} numberOfLines={1}>
                 {list.name}
                 </Text>

            <View>

                 <View style={{alignItems:"center"}}>
                   <Text style={styles.count}>{RemainingCount}</Text>
                   <Text style={styles.Subtitle}>Remaining</Text>
                 </View>
                 
                 <View style={{alignItems:"center"}}>
                     <Text style={styles.count}>{completedCount}</Text>
                     <Text style={styles.Subtitle}>Completed</Text>
                 
                 </View>
            </View>
            </TouchableOpacity>
             </View>
            

       );
    };
}

const styles=StyleSheet.create({
    listContainer:{
        paddingVertical: 32,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:"center",
        width:200
   },
   listTitler:{
       fontSize:24,
       fontWeight:"700",
       color: colors.white,
       marginBottom:18
   },
   count:{
       fontSize:48,
       fontWeight:"200",
       color: colors.white
   },
   Subtitle:{
    fontSize:12,
    fontWeight:"700",
    color: colors.white
   }
});
