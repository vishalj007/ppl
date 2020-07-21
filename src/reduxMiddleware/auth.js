import axios from "axios";

export const authStart = () => {
	return { type: "auth_start" };
};

export const authSuccess = (successData) => {
	return {
		type: "auth_success",
		successData: successData,
	};
};

export const authFail = (errorData) => {
	return {
		type: "auth_fail",
		errorData: errorData,
	};
};

export const auth = (Email, Password) => {
	return (dispatch) => {
		dispatch(authStart());
		axios
			.post("http://localhost:8080/auth/login", {
				Email: Email,
				Password: Password,
			})
			.then(function (response) {
				if (
					response.data === "User not registered" ||
					response.data === "Wrong password....!!"
				) {
					console.log("wrong : ", response);
					//setWarning(response.data);
					dispatch(authFail(response.data));
				} else {
					console.log("right : ", response.data);
					//setUserSession(response.data.token, response.data.user);
					dispatch(authSuccess(response.data));
					/* 	setpassword(undefined);
					setemail(undefined); */
					/* alert(response.data); */
				}
			})
			.catch(function (error) {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};
