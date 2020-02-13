const initialState = {
	items: [],
	isLoading: false,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'TABLE:SET_ITEMS':
			return {
				items: payload,
			};
		case 'TABLE:SET_IS_LOADING':
			return {
				...state,
				isLoading: payload,
			};
		case 'TABLE:ADD_ITEM':
			return {
				items: [payload, ...state.items],
				isLoading: false,
			};
		default:
			return state;
	}
};
