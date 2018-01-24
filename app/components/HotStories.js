import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import * as firebase from 'firebase';
import Stories from './Stories';

export default class HotStories extends Component {
    state = {
        location: null,
        geoCode: null,
        errorMessage: null,
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location});
    };
    _getCity = async (location) => {
        let geoCode = await Location.reverseGeocodeAsync(location.coords);
        this.setState({ geocode: geoCode[0]});
        return geoCode[0];
    };

    render() {
        let text = 'Waiting..';
        const { geocode, location } = this.state;
        if (!location){
            return <View><Text>Loading</Text></View>;
        }

        return <Stories location={location} orderBy='votes' />;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
