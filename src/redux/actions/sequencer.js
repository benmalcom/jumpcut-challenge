export const ACTIVATE_SEQUENCER = '[@@Sequencer] ACTIVATE';
export const UPDATE_EMITTED_SEQUENCE = '[@@Sequencer] UPDATE EMITTED VALUES';
export const CLEAR_EMITTED_SEQUENCE = '[@@Sequencer] CLEAR EMITTED VALUES';

export const activateSequencer = (sequencerId) => ({
	type: ACTIVATE_SEQUENCER,
	payload: { sequencerId },
});

export const updateEmittedValues = (value) => ({
	type: UPDATE_EMITTED_SEQUENCE,
	payload: { value },
});

export const clearEmittedValues = () => ({
	type: CLEAR_EMITTED_SEQUENCE,
});
