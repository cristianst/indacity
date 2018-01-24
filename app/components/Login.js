import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	Alert,
	View,
	Button,
} from 'react-native';

import { SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
//import Expo from 'expo';

export default class Login extends Component {
	constructor(props){
		super(props);
		this.loginWithFacebook = this.loginWithFacebook.bind(this);

	}
	componentDidMount(){

	}
	async loginWithFacebook(){
		const { navigate } = this.props.navigation;
		const { type, token } =  await Expo.Facebook.logInWithReadPermissionsAsync('197604940788122', {
			permissions: ['public_profile']

	    });


		if (type === 'success') {
			console.log(type);
			// Build Firebase credential with the Facebook access token.
			const credential = firebase.auth.FacebookAuthProvider.credential(token);

			firebase.auth().signInWithCredential(credential)
				.then(() => {
					navigate('Home');
					//navigate('MainStack');
				})
				.catch((error) => {
					console.log(error);
				});

		}
	}
	render(){
		return (
			<View style={styles.container}>
				<Image
					style={styles.appLogo}
					source={{uri : 'https://cdn.pbrd.co/images/H0lxQYF.png'}}
				/>
				<SocialIcon
					onPress={this.loginWithFacebook}
					style={styles.facebookButton}
					title='Login with Facebook'
					button
					underlayColor='#8b9dc3'
					type='facebook'
				/>
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
	},
	appLogo: {
		marginBottom: 15,
		width: 200,
		height: 80
	},
	facebookButton: {
		paddingLeft: 12,
		paddingRight: 12
	},
});
