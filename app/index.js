import React, { Component } from 'react';
import { createRootNavigator } from './router';
import * as firebase from 'firebase';
import {
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native';

import FadeInOut from './components/FadeInOut';

const config = {
	apiKey: 'AIzaSyAkeHSd0c0u1jMuxNFdL9TWcnemof-Nuvg',
	authDomain: 'indacity-cea6f.firebaseapp.com',
	databaseURL: 'https://indacity-cea6f.firebaseio.com',
	projectId: 'indacity-cea6f',
	storageBucket: 'indacity-cea6f.appspot.com',
	messagingSenderId: '348392481472',
	persistence: true,
	enableRedirectHandling: true
};

firebase.initializeApp(config);

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			userExists: false
		};
	}
	componentDidMount(){

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					userExists: true,
					loaded: true
				});
			} else {
				this.setState({
					userExists: false,
					loaded: true
				});
			}
		});

	}
	render() {
		const { userExists, loaded } = this.state;
		if(!loaded){
			return (
				<View style={styles.container}>
					<FadeInOut visible={!loaded} style={styles.loaderLayout}>
						<Image
							style={{width: 250, height: 250}}
							source={{ uri: 'https://i.pinimg.com/originals/76/47/bb/7647bb7539382dd708010625c4598021.gif'}}
						/>
					</FadeInOut>
				</View>
			);
		}
		const Layout = createRootNavigator(userExists);
		return <Layout />;
	}
}

const styles = StyleSheet.create({
	loaderLayout: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#14191F',
	},
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});
