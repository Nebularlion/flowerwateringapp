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
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'asyncStorageKey', autoload: true });

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {plantList: []};
    this.setState = this.setState.bind(this);
  }

  componentDidMount(){

    db.find().then(plants => 
      this.setState({ plantList: plants })
      ) 
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.container}>
        <FlatList
          data={this.state.plantList}
          renderItem={({item}) => <Text style={styles.item}>{item.name} {item.water} {item.humidity} {item.winterHumidity} {item.light}</Text>}
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
    this.state = { text: '', plants: [], name: '',  water: '', humidity: '', winterHumidity: '', light: '', homeRegion: ''};
  }

  buttonPressed= () =>{

    plant = {
        name: this.state.name,
        water: this.state.water,
        humidity: this.state.humidity,
        winterHumidity: this.state.winterHumidity,
        light: this.state.light,
        homeRegion: this.state.homeRegion,
    }

    console.log(plant)

    db.insert(plant, function (err, newDoc) {
      console.log(newDoc)
    });

    console.log("tallennettu")
    this.props.navigation.navigate('HomeScreen')

    }

  clearplants = () => {this.setState({ plants: [] })}

    handleName = (text) => {
      this.setState({name: text})
    }

    handleWater = (text) => {
      this.setState({water: text})
    }

    handleHumidity = (text) => {
      this.setState({humidity: text})
    }

    handleWinterHumidity = (text) => {
      this.setState({winterHumidity: text})
    }

    handleLight = (text) => {
      this.setState({light: text})
    }

    handleHomeRegion = (text) => {
      this.setState({homeRegion: text})
    }

    getPlants = () => {
        return this.state.plants;
    }

  render() {
    return (
        <View style={{
          alignItems: 'center',
          paddingTop: 10}}>
            <Text style={{
              fontFamily: 'Georgia', 
              fontSize: 18, 
              color: '#007A12',  
              fontWeight: "bold", 
              paddingBottom: 5, 
              paddingTop: 5}}>
              Name
              </Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              height: 35
              }}
              onChangeText = {this.handleName}>
            </TextInput>
            <Text 
            style={{
              fontFamily: 'Georgia', 
              fontSize: 18, color: 
              '#007A12',  fontWeight: 
              "bold", 
              paddingBottom: 5, 
              paddingTop: 5}}
              >
              Water
              </Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              height: 35
              }}
              onChangeText = {this.handleWater}>
              </TextInput>
            <Text style={{
              fontFamily: 'Georgia', 
              fontSize: 18, 
              color: '#007A12',  
              fontWeight: "bold", 
              paddingBottom: 5, 
              paddingTop: 5}}>
              Humidity
              </Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              height: 35
              }}
              onChangeText = {this.handleHumidity}>
              </TextInput>
            <Text style={{
              fontFamily: 'Georgia', 
              fontSize: 18, 
              color: '#007A12',  
              fontWeight: "bold", 
              paddingBottom: 5, 
              paddingTop: 5}}>
              Winter Humidity
              </Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              height: 35
              }}
              onChangeText = {this.handleWinterHumidity}>
              </TextInput>
            <Text style={{
              fontFamily: 'Georgia', 
              fontSize: 18, 
              color: '#007A12',  
              fontWeight: "bold", 
              paddingBottom: 5, 
              paddingTop: 5}}>
              Light
              </Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              height: 35
              }}
              onChangeText = {this.handleLight}>
              </TextInput>
            <Text style={{
              fontFamily: 'Georgia', 
              fontSize: 18, 
              color: '#007A12',  
              fontWeight: "bold", 
              paddingBottom: 5, 
              paddingTop: 5}}>
              Home Region
              </Text>
            <TextInput  
              style={{
              borderWidth: 2,
              width: 300,
              height: 35
              }}
              onChangeText = {this.handleHomeRegion}>
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
                onPress={this.buttonPressed}
                containerStyle={{ marginTop: 10 }}
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