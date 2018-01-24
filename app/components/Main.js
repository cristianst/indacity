// import React, { Component } from 'react';
// import * as firebase from 'firebase';
// import {
// 	StyleSheet,
// 	Text,
// 	Image,
// 	Alert,
// 	View,
// 	Button,
// } from 'react-native';
//
// import Stories from './Stories';
// import FadeInOut from './FadeInOut';
// import Login from './Login';
//
// const config = {
// 	apiKey: 'AIzaSyAkeHSd0c0u1jMuxNFdL9TWcnemof-Nuvg',
// 	authDomain: 'indacity-cea6f.firebaseapp.com',
// 	databaseURL: 'https://indacity-cea6f.firebaseio.com',
// 	projectId: 'indacity-cea6f',
// 	storageBucket: 'indacity-cea6f.appspot.com',
// 	messagingSenderId: '348392481472',
// 	persistence: true,
// 	enableRedirectHandling: true
// };
//
// firebase.initializeApp(config);
//
// export default class Main extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			loading: true,
// 			userExists: false
// 		};
// 	}
// 	componentDidMount(){
// 		const hideLoader = () => {
// 			return new Promise((resolve, reject ) => {
// 				setTimeout(() => {
// 					this.setState({
// 						loading: false
// 					});
//
// 					resolve('Stuff worked');
// 				}, 2500);
// 			});
// 		};
//
// 		hideLoader().then(() => {
// 			const { userExists } = this.state;
// 			const { navigate } = this.props.navigation;
//
// 			if (userExists){
// 				navigate('Stories');
// 			} else {
// 				navigate('Login');
// 			}
// 		});
//
// 		firebase.auth().onAuthStateChanged((user) => {
// 			if (user) {
// 				this.setState({
// 					userLoaded: true
// 				});
// 			}
// 		});
// 	}
// 	render(){
// 		const { userIsLoaded , loading } = this.state;
//
// 		if (!userIsLoaded) {
// 			return null;
// 		}
//
// 		const Layout = createRootNavigator(userIsLoaded);
// 		return <Layout />;
// 		// <View style={styles.container}>
// 		// 	<FadeInOut visible={loading} style={styles.loaderLayout}>
// 		// 		<Image
// 		// 			style={{width: 250, height: 250}}
// 		// 			source={{ uri: 'https://i.pinimg.com/originals/76/47/bb/7647bb7539382dd708010625c4598021.gif'}}
// 		// 		/>
// 		// 	</FadeInOut>
// 		// </View>
//
//
// 	}
// }
//
// const styles = StyleSheet.create({
// 	loaderLayout: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#14191F',
// 	},
// 	container: {
// 		flex: 1,
// 		backgroundColor: 'white'
// 	}
// });
