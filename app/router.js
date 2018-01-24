import { StackNavigator, TabNavigator } from 'react-navigation';
import React from 'react';
import {
	View
} from 'react-native';
// LoginStack
import Login from './components/Login';

// MainStack
import Stories from './components/Stories';
import HotStories from './components/HotStories';
import NearbyStories from './components/NearbyStories';
import LatestStories from './components/LatestStories';
import CreateStory from './components/CreateStory';

// Icons
import { FontAwesome } from '@expo/vector-icons';

const MainStack = TabNavigator({
	HotStories: {
		screen: HotStories,
		navigationOptions: {
			tabBarLabel: 'POPULAR',
			tabBarIcon: ({ tintColor }) => <FontAwesome name="fire" size={28} color={tintColor} />
		}
	},
	CreateStory: {
		screen: CreateStory,
		navigationOptions: {
			tabBarLabel: 'NEW',
			tabBarIcon: ({ tintColor }) =>
				<View style={{marginTop: -40 }}>
					<FontAwesome name="plus-circle" size={50} color='#e91e63' />
				</View>

		}
	},
	LatestStories: {
		screen: LatestStories,
		navigationOptions: {
			tabBarLabel: 'LATEST',
			tabBarIcon: ({ tintColor }) => <FontAwesome name="clock-o" size={28} color={tintColor} />
		}
	}

}, {
	tabBarOptions: {
		activeTintColor: '#e91e63',
	}
});

const LoginStack = StackNavigator({
	Login: {
		screen: Login,
	}
}, {
	headerMode: 'none'
});

const createRootNavigator = (signedIn = false) => {
	return StackNavigator(
		{
			MainStack: {
				screen: MainStack
			},
			LoginStack: {
				screen: LoginStack,
			}
		},
		{
			headerMode: 'none',
			initialRouteName: signedIn ? 'MainStack' : 'LoginStack'
		}
	);
};

export {
	MainStack,
	LoginStack,
	createRootNavigator
};
