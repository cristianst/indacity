import { StackNavigator } from 'react-navigation';
import Main from './app/components/Main';
import Stories from './app/components/Stories';
import Login from './app/components/Login';

const MainStack = StackNavigator({
	Home: {
		screen: Stories
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
				screen: Stories
			},
			LoginStack: {
				screen: Login,
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
