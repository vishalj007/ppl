import { getUser } from "../Utils/Common";
let user = getUser();

const initialState = {
	user: user ? user : "",
	description: user ? user.description : "",
	sex: user ? user.sex : "",
	registered: false,
	detail: "",
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "timeline":
			return {
				...state,
				[action.name]: action[action.name],
			};
		case "comments":
			return {
				...state,
				[action.name]: action[action.name],
			};
		case "SinglePosts":
			return {
				...state,
				[action.name]: action[action.name],
			};
		/* 	case "all":
			return {
				...state,
				[action.name]: action[action.name],
			}; */
		case "logout":
			return (state = initialState);
		case "auth_success":
			return {
				...state,
				token: action.successData.token,
				user: action.successData.user,
			};
		case "auth_fail":
			return {
				...state,
				Warning: action.errorData,
			};

		case "register_success":
			return {
				...state,
				registered: true,
			};
		case "register_fail":
			return {
				...state,
				EmailWarningBool: action.bool,
				EmailWarning: action.error,
			};

		case "like_update":
			return {
				...state,
				detail: action.detail,
				like: action.like,
				alreadyLiked: action.alreadyLiked,
			};
		case "like_remove":
			return {
				...state,
				like: state.detail.likes.length - 1,
				alreadyLiked: false,
			};
		case "get_detail":
			return {
				...state,
				detail: action.detail,
				reply: action.reply,
				commentCount: action.commentCount,
				like: action.like,
				alreadyLiked: action.alreadyLiked,
			};
		case "update_comment":
			return {
				...state,
				comment: "",
				detail: action.detail,
			};
		default:
			return state;
	}
};

export default reducer;
