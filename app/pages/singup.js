import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import Logo from '../components/logo';


export default class Singup extends React.Component {
  state = {
    name: '',
    email: '',
    password:'',
    message:'',
  }
  createUser = () =>{
    let name = this.state.name;
    let email = this.state.email;
    let password= this.state.password;
    if(name !== "" && email !== "" && password !== "" ){
      const userRef = this.props.db.collection("users").add({
        name: name,
        email: email,
        password: password
      });
      Alert.alert('Thanks for signing up!','Registration completed');
      Actions.sketch({email:email})
    }else{
      this.setState({
        message: 'Incomplete fields'
      });
      
    }
  }
  goBack(){
    Actions.pop()
  }
	render(){
		return(
			<View style={styles.container}>
				<Logo></Logo>
        <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Name"
              placeholderTextColor =  "#9E9E9E"
              selectionColor="#fff"
              autoCapitalize = 'none'
              onSubmitEditing={()=> this.email.focus()}
              onChangeText={(text) => this.setState({name: text})}
              />
        <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#9E9E9E"
              selectionColor="#fff"
              keyboardType="email-address"
              autoCapitalize = 'none'
              onSubmitEditing={()=> this.password.focus()}
              ref={(input) => this.email = input}
              onChangeText={(text) => this.setState({email: text})}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#9E9E9E"
              autoCapitalize = 'none'                                                                        
              ref={(input) => this.password = input}
              onChangeText={(text) => this.setState({password: text})}
              />           
              <Text style={styles.error_message}>{this.state.message}</Text>
           <TouchableOpacity style={styles.button} onPress={this.createUser}>
             <Text style={styles.buttonText}>Signup</Text>
           </TouchableOpacity>    
        <View style={styles.singupTextContent}>
          <Text style={styles.singupText}>Already have an account?</Text>
          <TouchableOpacity onPress={this.goBack}><Text style={styles.singupButton}>Sign in</Text></TouchableOpacity>
        </View>
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#FAFAFA',
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  singupTextContent:{
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'flex-end',
    paddingVertical: 10,
    flexDirection: 'row'
  },
  singupText:{
    color: '#9E9E9E',
    fontsize:16
  },
  singupButton:{
    color:'#9E9E9E',
    fontSize:16,
    marginHorizontal:5
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(194,194,194,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    paddingVertical:12,
    fontSize:16,
    color:'#9E9E9E',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#66BB6A',
    borderRadius: 25,
    paddingVertical: 12,
    marginVertical: 10
  },
  buttonText: {
    fontSize:18,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  error_message:{
    color:'#C20000',
  }
});