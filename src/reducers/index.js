const initialState = {
	showModal: false,
	loading: false,

	from: '',
	fromAddress: '',
	to: '',
	toAddress: '',

	rows: [
		{ id: 0, from: "54.1945832,37.6210281", fromAddress: 'Менделеевская ул., 2, Тула, Тульская обл., Россия, 300041 Тульский Кремль', to: "55.7495732,37.613411", toAddress: 'Москва, Россия, 103073 Московский Кремль', volume: "300" },
	],
	volume: 0,
	resultPoints: [],

	directions: [],
	customers: ["55.7558,37.6173"], // customers[0] = initialPoint
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'LOADING': {
			return {
				...state,
				loading: true
			};
		}
		case 'RESPONSE': {
			return {
				...state,
				loading: false,
				resultPoints: action.payload
			};
		}
		case 'ERROR': {
			return {
				...state,
				loading: false
			};
		}
		case 'SET_FROM': {
			if (state.from !== action.payload.coordinates) {
				return {
					...state,
					from: action.payload.coordinates,
					fromAddress: action.payload.address
				};
			}
			return state;
		}
		case 'SET_TO': {
			if (state.to !== action.payload.coordinates) {
				return {
					...state,
					to: action.payload.coordinates,
					toAddress: action.payload.address
				};
			}
			return state;
		}
		case 'SET_VOLUME': {
			if (state.volume !== action.payload) {
				return {
					...state,
					volume: action.payload
				};
			}
			return state;
		}
		case 'RESPONSE_DIRECTIONS': {
			return {
				...state,
				directions: action.payload.directions
			}
		}
		case 'ADD_ROW': {
			debugger
			const { customers, loading } = action.payload;
			const { rows } = state;
			const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
			const nextRows = rows.slice();
			nextRows.push({ id: startingAddedId, ...action.payload.row });

			return {
				...state,
				rows: nextRows,
				customers,
				loading
			}
		}
		case 'TOGGLE_MODAL': {
			const nextShow = !state.showModal;
			return {
				...state,
				showModal: nextShow
			}
		}

		default:
			return state;
	}
};
