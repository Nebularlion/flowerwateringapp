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
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin', name: 'jii'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <View style={{width: 50, height: 250 }} />
        <Text>Add plant!</Text>
        <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text> {this.state.text}</Text>
          <TextInput
            mode = 'outlined'
            label="Plant name"
            style={{
              fontSize: 18,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={plant => this.setState({ text: plant })}
            value={this.state.text}
          />
        </View>
        <View> 
            <Button mode="contained" color="blue"
          onPress={this.buttonPressed} title=" Add " />
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