const initialState = {
	showModal: false,
	loading: false,

	from: '',
	to: '',
	rows: [
		{ id: 0, from: "55.7558,37.6173", to: "54.2048,37.6185", volume: "300" },
		{ id: 1, from: "57.6261,39.8845", to: "55.8304,49.0661", volume: "100" },
	],
	volume: 0,
	resultPoints: [],

	customers: ["55.7558,37.6173"], // customers[0] = initialPoint
}

const directions = [

];


// locations = [
//     ['Bondi Beach', -33.890542, 151.274856, 4],
//     ['Coogee Beach', -33.923036, 151.259052, 5],
//     ['Cronulla Beach', -34.028249, 151.157507, 3],
//     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//     ['Maroubra Beach', -33.950198, 151.259302, 1]
//   ];

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
			if (state.from !== action.payload) {
				return {
					...state,
					from: action.payload
				};
			}
			return state;
		}
		case 'SET_TO': {
			if (state.to !== action.payload) {
				return {
					...state,
					to: action.payload
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
		case 'ADD_ROW': {
			const { rows, customers } = state;
			const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
			const nextRows = rows.slice();
			nextRows.push({ id: startingAddedId, ...action.payload });

			customers.push(action.payload.from);
			customers.push(action.payload.to);
			return {
				...state,
				rows: nextRows,
				customers
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
