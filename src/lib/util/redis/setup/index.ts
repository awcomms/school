import { note } from './note';
import { user } from './user';

export const setup = async () => {
	await note();
	await user();
};
