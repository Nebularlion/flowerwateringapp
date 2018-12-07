import React from 'react';
import { 
  Button, 
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
  HeaderIcon
} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

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
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          />
        <View style={{justifyContent: 'center'}}>
          <View style={{width: 50, height: 250 }} />
          <Text>Add plant!</Text>
          <View>
          <FormLabel>Add plant</FormLabel>
          <FormInput onChangeText={plant => this.setState({ text: plant })}/>
          <FormValidationMessage>{'This field is required'}</FormValidationMessage>
          </View>
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