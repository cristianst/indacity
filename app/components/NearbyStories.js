import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

export default class NearestStories extends Component {
	render(){
		return (
			<View style={styles.container}>
				<Text>Nearby Stories</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	}
});
