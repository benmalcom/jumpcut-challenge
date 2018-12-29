import sequencers from '../../utils/sequencers';
import {
	ACTIVATE_SEQUENCER,
	CLEAR_EMITTED_SEQUENCE,
	UPDATE_EMITTED_SEQUENCE
} from '../actions/sequencer';

const initialState = {
	currentId: null,
	current: null,
	emittedValues: [],
};

const sequencerReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIVATE_SEQUENCER:
			const {sequencerId} = action.payload;
			const sequencer = sequencers.find((item) => item.id === sequencerId);
			return Object.assign({}, state, {
				currentId: sequencerId,
				current: sequencer,
			});
		case UPDATE_EMITTED_SEQUENCE:
			const {value} = action.payload;
			if (typeof value !== 'undefined') {
				return Object.assign({}, state, {
					emittedValues: [...state.emittedValues, value],
				});
			}
			return state;
		case CLEAR_EMITTED_SEQUENCE:
			return Object.assign({}, state, {
				emittedValues: [],
			});
		default:
			return state;
	}
};
export default sequencerReducer;
