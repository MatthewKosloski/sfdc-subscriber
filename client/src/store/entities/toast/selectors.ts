import { AppState } from '../../';
import { Toast } from '../toast/types';

export const selectToasts = (state: AppState): Toast[] => {
	return Object.values(state.entities.toasts);
};