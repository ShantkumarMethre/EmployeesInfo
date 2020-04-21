import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  fetchEmployees,
  getCoords,
  getEmployeeDetails,
} from '../action/employees';
import {connect} from 'react-redux';
import {Container, Fab, Card, CardItem, Body, Left, Right} from 'native-base';

class Employes extends React.Component {
  async componentDidMount() {
    // this.watchPosition();
    await this.props.fetchEmployees();
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Accessing Permission',
        message: 'App needs access to your location',
      },
    ).then(() => {
      Geolocation.getCurrentPosition(info => console.log(info));
    });
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      var currentLocation = {};
      var coord = info.coords;
      currentLocation.latitude = coord.latitude;
      currentLocation.longitude = coord.longitude;
      console.log('currentLocation is', currentLocation);
      this.props.getCoords(currentLocation);
    });

    // Geocoder.from(18.0130182, 77.0087652)
    //   .then(json => {
    //     var addressComponent = json.results[0].address_components[0];
    //     console.log('address', addressComponent);
    //   })
    //   .catch(error => console.warn(error));
  }
  handleSelection = item => {
    this.props.getEmployeeDetails(item);
    this.props.navigation.navigate('EmployeeDetails');
  };

  render() {
    return (
      <Container>
        {this.props.commonState.isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading List...</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={item => `${item.id} a`}
            extraData={this.props.employees.employeesList}
            data={this.props.employees.employeesList}
            keyboardShouldPersistTaps={'handled'}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => this.handleSelection(item)}>
                  <Card
                    style={{
                      borderColor: 'rgb(255,217,25)',
                      borderLeftWidth: 10,
                    }}>
                    <CardItem>
                      <Left>
                        <View
                          style={{
                            height: 60,
                            width: 60,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                          }}>
                          <Image
                            style={{
                              height: 60,
                              width: 60,
                              borderRadius: 30,
                              resizeMode: 'cover',
                            }}
                            source={{
                              uri: item.avatar,
                            }}
                          />
                        </View>
                      </Left>
                      <Body>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.email}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text>{item.phone}</Text>
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {this.props.commonState.isLoading ? null : (
          <Fab
            direction="up"
            containerStyle={{}}
            style={{backgroundColor: 'rgb(255,217,25)'}}
            position="bottomRight"
            onPress={() => {
              this.props.navigation.navigate('EmployesForm', {
                title: 'Create Employees',
              });
            }}>
            <Text style={{}}>+</Text>
          </Fab>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  console.log('state is...', state);
  return {
    employees: state.employees,
    commonState: state.common,
  };
};

export default connect(
  mapStateToProps,
  {fetchEmployees, getCoords, getEmployeeDetails},
)(Employes);
