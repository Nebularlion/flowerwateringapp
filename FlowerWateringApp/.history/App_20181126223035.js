import React from 'react';
import { Button, Text, View, TextInput, FlatList } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to AddPlant"
          onPress={() => this.props.navigation.navigate('AddPlant')}
        />
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
      <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <Text>Add plant!</Text>
        <View style={{ flex: 2, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text> {this.state.text}</Text>
          <TextInput
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
          <Button onPress={this.buttonPressed} title=" Add " />
          <Button onPress={this.clearplants} title=" Clear " />
        </View>
        <View>
          <Text style={{ fontSize: 18, color: 'blue' }}>Plant list</Text>
          <FlatList
            data={this.state.plants}
            renderItem={({ item }) => (
              <Text style={{ fontSize: 18 }}>{item.key}</Text>
            )}
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