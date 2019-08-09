import { Subscription } from '../store/subscriptions/types';
import randomColor from './randomColor';

export default (eventApiName: string): Subscription => ({
	color: randomColor(),
	eventApiName: eventApiName.replace('/event/', ''),
	minuteDuration: 0
});