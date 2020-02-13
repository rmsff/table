import { dataApi } from 'utils/api';
import { openNotification } from 'utils/helpers';

const Actions = {
	setItems: items => ({
		type: 'TABLE:SET_ITEMS',
		payload: items,
	}),
	addItems: item => dispatch => dispatch({
		type: 'TABLE:ADD_ITEM',
		payload: item,
	}),
	setIsLoading: stateIsLoaing => ({
		type: 'TABLE:SET_IS_LOADING',
		payload: stateIsLoaing,
	}),
	fetchData: (count = 100) => dispatch => {
		dispatch(Actions.setIsLoading(true));
		dataApi
			.getData(count)
			.then(({ data }) => {
				data.length > 0
				? dispatch(Actions.setItems(data))
				: openNotification({
					message: 'Server do not provide information to display in the table.',
					duration: 8,
				});
				dispatch(Actions.setIsLoading(false));
			})
			.catch(() => {
				openNotification({
					type: 'error',
					message: 'Error receiving data',
				});
				dispatch(Actions.setIsLoading(false));
			});
	},
};

export default Actions;
