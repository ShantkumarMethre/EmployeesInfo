import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

class EmployeeDetails extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: 300, width: '100%'}}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: this.props.employees.selectedEmployees.currentLocation
                .latitude,
              longitude: this.props.employees.selectedEmployees.currentLocation
                .longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <MapView.Marker
              coordinate={
                this.props.employees.selectedEmployees.currentLocation
              }
              onPress={e => {}}>
              <View style={styles.mapDp}>
                <Image
                  style={styles.mapImageView}
                  source={{
                    uri: this.props.employees.selectedEmployees.avatar,
                  }}
                />
              </View>
            </MapView.Marker>
          </MapView>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.dpView}>
            <Image
              style={styles.imageView}
              source={{
                uri: this.props.employees.selectedEmployees.avatar,
              }}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'flex-start'}}>
            <View style={{flexDirection: 'row'}}>
              <Text>{this.props.employees.selectedEmployees.name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>{this.props.employees.selectedEmployees.email}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text>{this.props.employees.selectedEmployees.phone}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mapDp: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  mapImageView: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  dpView: {
    height: 160,
    width: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  imageView: {
    height: 160,
    width: 160,
    borderRadius: 80,
    resizeMode: 'cover',
  },
});

const mapStateToProps = state => {
  console.log('state is...', state);
  return {
    employees: state.employees,
    commonState: state.common,
  };
};

export default connect(
  mapStateToProps,
  {},
)(EmployeeDetails);
