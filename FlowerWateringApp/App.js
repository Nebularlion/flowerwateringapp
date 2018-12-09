import React from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  StyleSheet, 
  FlatList,
  AsyncStorage,
  Picker,
} from 'react-native';

import { 
  Button,
} from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {plantList: []};
  }

  componentDidMount = () => AsyncStorage.getItem('plants').then((value) => {
    console.log(value);
    this.setState({ plantList: JSON.parse(value) });
  } )

   
  deleteButtonClick (item) {
    console.log("DELETE")
    console.log(item)
    var tempPlants = this.state.plantList;
    var index = tempPlants.indexOf(item)

    if(index !== -1){
      tempPlants.splice(index, 1)
      AsyncStorage.clear();
      AsyncStorage.setItem('plants', JSON.stringify(tempPlants)); 
      this.setState({ plantList: tempPlants })
    }
    
  };


  renderPlant(plant){
    return(
      <View>
        <Text style={ styles.listText} >Name: {plant.name} </Text>
        <Text style={ styles.listText}>Water: {plant.water}</Text>
        <Text style={ styles.listText}>Target humidity:  {plant.humidity} %</Text>
        <Text style={ styles.listText}>Light:  {plant.light}</Text>
        <Text style={ styles.listText}>Current weather: {plant.currWeather}</Text>
        <Text style={ styles.listText}>Current temperature: {plant.currentTemp} °C</Text>
        <Text style={ styles.listText}>Current humidity: {plant.currentHum} %</Text>
        <Button style={ styles.deleteButton} onPress={ () => this.deleteButtonClick(plant) } title="Delete"/>
      </View>
    );
  }
  render() {
    
    AsyncStorage.getItem('plants').then((value) => {
      this.setState({ plantList: JSON.parse(value) });
    } )

    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{  }}>
          <FlatList 
            style={{ 
            flex: 1,
            flexDirection: 'row',
            borderBottomColor:  'black',
            borderBottomWidth: 0,
            borderTopWidth: 0,
            height: 19.21,
           }}
            data={this.state.plantList}
            renderItem={({item}) => this.renderPlant(item)}
            keyExtractor={item => item.name}
          />  
        </View>
      </View>
    );
  }
}

class AddPlantScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '', plants: [], name: '',  water: '', humidity: '', light: '', homeRegion: ''};
  }

  buttonPressed = () => {



    plant = {
        name: this.state.name,
        water: this.state.water,
        humidity: this.state.humidity,
        light: this.state.light,
        homeRegion: this.state.homeRegion,
    }

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + plant.homeRegion + '')
          .then((response) => response.json()) 
          .then((responseData) => { 
                console.log("fetching");
                plant.currentTemp = parseFloat(responseData.main.temp) - 273.15;
                plant.currentHum = responseData.main.humidity;
                plant.currWeather = responseData.weather[0].main;
                var savedPlants = AsyncStorage.getItem('plants');

            

                savedPlants = [...savedPlants, plant]
                 
                AsyncStorage.clear();
                AsyncStorage.setItem('plants', JSON.stringify(savedPlants)); 
                console.log(plant);
          });
    this.props.navigation.navigate('HomeScreen');
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
    const {value} = this.state;

    return (
        <View style={{
          alignItems: 'center',
          paddingTop: 10}}>
            <Text style={ styles.text }>
              Name
            </Text>
            <TextInput  
              style={styles.textInput}
              onChangeText = {this.handleName}>
            </TextInput>
            <Text style={ styles.text }>
              Water
              </Text>
              <Picker
              selectedValue={this.handleWater}
              style={{ height: 50, width: 300, borderWidth: 2, borderColor: 'grey'}}
              onValueChange={(itemValue) => this.setState({water: itemValue})}>
            <Picker.Item label="Daily" value="Daily" />
            <Picker.Item label="Twice per week" value="Twice per week" />
            <Picker.Item label="Weekly" value="Weekly" />
            <Picker.Item label="Monthly" value="Monthly" />
            </Picker>
            <Text style={ styles.text }>
              Target humidity
            </Text>
            <TextInput  
              style={styles.textInput}
              onChangeText = {this.handleHumidity}>
            </TextInput>
            <Text style={ styles.text }>
              Light
            </Text>
            <Picker
              selectedValue={this.handleLight}
              style={{ height: 50, width: 300, borderWidth: 2, borderColor: 'grey' }}
              onValueChange={(itemValue) => this.setState({light: itemValue})}>
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
            </Picker>
            <Text style={ styles.text }>
              Home Region
              </Text>
            <TextInput  
              style={styles.textInput}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Georgia', 
    fontSize: 18, color: '#007A12',  
    fontWeight: "bold", 
    paddingBottom: 5, 
    paddingTop: 5
  },
  textInput: {
    borderWidth: 2,
    width: 300,
    height: 35
  },
  listText: {
    fontFamily: 'Georgia',
    fontSize: 15,
    paddingBottom: 1,
    paddingTop: 1
  },
  deleteButton: {
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
});

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
});

const AddPlantStack = createStackNavigator({
  AddPlant: { screen: AddPlantScreen },
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