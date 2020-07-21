import axios from "axios";

export const registerStart = () => {
	return { type: "register_start" };
};

export const registerSuccess = (successData) => {
	return {
		type: "register_success",
		successData: successData,
	};
};

export const registerFail = (error) => {
	return {
		type: "register_fail",
		error: error,
		bool: true,
	};
};

export const register = (data) => {
	return (dispatch) => {
		dispatch(registerStart());
		const newData = {
			userName: data.userName,
			Email: data.Email,
			Password: data.Password,
			firstName: data.firstName,
			lastName: data.lastName,
		};
		axios
			.post("http://localhost:8080/auth/register", newData)
			.then(function (response) {
				if (
					response.data ===
					"User Already Registered please try to login with this email"
				) {
					dispatch(registerFail(response.data));
				} else {
					dispatch(registerSuccess());
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};
};
