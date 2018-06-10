const initialState = {
	showModal: false,
	loading: false,

	from: '',
	fromAddress: '',
	to: '',
	toAddress: '',

	rows: [{
		id: 0,
		from: "54.1945832,37.6210281",
		fromAddress: 'Менделеевская ул., 2, Тула, Тульская обл., Россия, 300041 Тульский Кремль',
		to: "55.7495732,37.613411",
		toAddress: 'Гараж',
		volume: "0",
		weight: "0",
	}],
	volume: 0,
	weight: 0,
	resultPoints: [],

	directions: [],
	customers: ["54.194716, 37.619821"], // customers[0] = initialPoint
	volumes: [0],
	weights: [0],
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
		case 'SET_WEIGHT': {
			if (state.weight !== action.payload) {
				return {
					...state,
					weight: action.payload
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
			const { customers, loading, volumes, weights } = action.payload;
			const { rows } = state;
			const startingAddedId = (rows.length - 1) >= 0 ? rows[rows.length - 1].id + 1 : 0;
			const nextRows = rows.slice();
			nextRows.push({ id: startingAddedId, ...action.payload.row });

			console.log(volumes);
			console.log(weights);
			return {
				...state,
				rows: nextRows,
				customers,
				weights,
				volumes,
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
		case 'GET_MINIMAL_CHAIN': {
			return {
				...state,
				minimalChain: action.payload.minimalChain,
				resultPoints: action.payload.pointPairs,
			}
		}

		default:
			return state;
	}
};
