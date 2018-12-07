import React from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  List, 
  StyleSheet, 
  FlatList
} from 'react-native';

import { 
  FormLabel, 
  FormInput, 
  FormValidationMessage,
  Header,
  HeaderIcon,
  Input,
  Button,
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

var SQLite = require('react-native-sqlite-storage')

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Monstera adansonii', water: '7d', humidity: '60%', winterHumidity: '40%', light: 'medium'},
            {key: 'Ficus microcarpa', water: '8d', humidity: '55%', winterHumidity: '55%', light: 'high'},
            {key: 'Angraecum sesquipedale', water: '7d', humidity: '80%', winterHumidity: '70%', light: 'high'},
            {key: 'Phalaenopsis lindenii', water: '1d', humidity: '90%', winterHumidity: '70%', light: 'medium'},
            {key: 'Aerangis fastuosa', water: '1d', humidity: '90%', winterHumidity: '80%', light: 'medium'},
            {key: 'Monstera karsteniana', water: '7d', humidity: '50%', winterHumidity: '70%', light: 'low'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key} {item.water} {item.humidity} {item.winterHumidity} {item.light}</Text>}
        />
      </View>
        <Text>Home!</Text>
      </View>
    );
  }
}

class AddPlantScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '', plants: [] };
  }

  buttonPressed= () =>{this.setState({plants:[...this.state.plants, {key: this.state.text}]});}

  clearplants = () => {this.setState({ plants: [] })}

    // onChangeText={plant => this.setState({ text: plant })}
    // value={this.state.text}

  render() {
    return (
        <View style={{
          alignItems: 'center',
          paddingTop: 40}}>
            <Text style={{fontFamily: 'Georgia', fontSize: 18, color: '#007A12',  fontWeight: "bold", paddingBottom: 5, paddingTop: 5}}>Name</Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              height: 50
              }}>
            </TextInput>
            <Text style={{fontFamily: 'Georgia', fontSize: 18, color: '#007A12',  fontWeight: "bold", paddingBottom: 5, paddingTop: 5}}>Water</Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              }}>
              </TextInput>
            <Text style={{fontFamily: 'Georgia', fontSize: 18, color: '#007A12',  fontWeight: "bold", paddingBottom: 5, paddingTop: 5}}>Humidity</Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              }}>
              </TextInput>
            <Text style={{fontFamily: 'Georgia', fontSize: 18, color: '#007A12',  fontWeight: "bold", paddingBottom: 5, paddingTop: 5}}>Winter Humidity</Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              }}>
              </TextInput>
            <Text style={{fontFamily: 'Georgia', fontSize: 18, color: '#007A12',  fontWeight: "bold", paddingBottom: 5, paddingTop: 5}}>Light</Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              }}>
              </TextInput>

            <View style={{paddingTop: 50}}>
            <Button
              title="SAVE PLANT"
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#007A12",
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
              }}
                containerStyle={{ marginTop: 20 }}
                />
            </View>
        </View>

    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  inputContainer: {
    borderLeftWidth: 4,
    borderRightWidth: 4,
    height: 70
  },
  input: {
    height: 70,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15
  },
})

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const AddPlantStack = createStackNavigator({
  AddPlant: { screen: AddPlantScreen },
  Details: { screen: DetailsScreen },
});

export default createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    AddPlant: { screen: AddPlantStack },
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));