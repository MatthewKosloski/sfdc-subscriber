import { Subscription } from '../store/entities/subscriptions/types';
import randomColor from './randomColor';

export default (eventApiName: string): Subscription => ({
	color: randomColor(),
	eventApiName: eventApiName.replace('/event/', ''),
	minuteDuration: 0
});