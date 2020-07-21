import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeDescription from "./Components/HomeDescription";
import { connect } from "react-redux";
import { register } from "./reduxMiddleware/register";

function Register(props) {
	const [userName, setuserName] = useState();
	const [Email, setemail] = useState();
	const [Password, setpassword] = useState();
	const [firstName, setfirstName] = useState();
	const [lastName, setlastName] = useState();
	/* 	const [EmailWarning, setemailWarning] = useState();
	const [EmailWarningBool, setemailWarningBool] = useState(false);
 */ const [
		passWarning,
		setpassWarning,
	] = useState(false);
	const [userNameWarning, setUserNameWarning] = useState(false);
	const [nameWarning, setnameWarning] = useState(false);
	const [startp, setStartp] = useState(true);
	const [starte, setStarte] = useState(true);
	const [startu, setStartu] = useState(true);
	const [startn, setStartn] = useState(true);
	useEffect(() => {
		if (props.registered) {
			setuserName(undefined);
			setpassword(undefined);
			setemail(undefined);
			setfirstName(undefined);
			setlastName(undefined);
			setStarte(true);
			setStartu(true);
			setStartp(true);
			setStartn(true);
			props.history.push("/Login");
		}
	}, [props.registered]);

	const register = () => {
		console.log("hello");
		if (userNameWarning || userName === undefined) {
			setStartu(false);
			setUserNameWarning(true);
		}
		if (passWarning || Password === undefined) {
			setStartp(false);
			setpassWarning(true);
		}
		if (props.EmailWarningBool || Email === undefined) {
			setStarte(false);
			props.onEmailError("Please enter correct Email Address", true);
		}

		if (nameWarning || firstName === undefined) {
			setStartn(false);
			setnameWarning(true);
		}
		if (
			!(userNameWarning || userName === undefined) &&
			!(nameWarning || firstName === undefined) &&
			!(passWarning || Password === undefined) &&
			!(props.EmailWarningBool || Email === undefined)
		) {
			const data = {
				userName: userName,
				Email: Email,
				Password: Password,
				firstName: firstName,
				lastName: lastName,
			};
			props.onRegister(data);
			/* axios
				.post("http://localhost:8080/auth/register", data)
				.then(function (response) {
					if (
						response.data ===
						"User Already Registered please try to login with this email"
					) {
						console.log("Wrong : ", response.data);
						setemailWarningBool(true);
						setemailWarning(response.data);
					} else {
						console.log("right : ", response.data);
						setuserName(undefined);
						setpassword(undefined);
						setemail(undefined);
						setfirstName(undefined);
						setlastName(undefined);
						setStarte(true);
						setStartu(true);
						setStartp(true);
						setStartn(true);
						props.history.push("/Login");
					}
				})
				.catch(function (error) {
					console.log(error);
				}); */
		}
	};

	const checkpass = (e) => {
		if (e.target.value.length < 8) {
			setStartp(false);
			setpassWarning(true);
			setpassword(e.target.value);
		} else {
			setStartp(false);
			setpassWarning(false);
			setpassword(e.target.value);
		}
	};

	const checkEmail = (e) => {
		var check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9,-_]+\.[a-zA-Z]{2,4}$/;
		if (check.test(e.target.value)) {
			setStarte(false);
			props.onEmailError("Email is Fine", false);
			setemail(e.target.value);
		} else {
			setStarte(false);
			props.onEmailError("Please enter correct Email Address", true);
			setemail(e.target.value);
		}
	};

	const checkusername = (e) => {
		if (/^[a-zA-Z._0-9]{3,9}$/.test(e.target.value)) {
			setStartu(false);
			setUserNameWarning(false);
			setuserName(e.target.value);
		} else {
			setStartu(false);
			setUserNameWarning(true);
			setuserName(e.target.value);
		}
	};
	const checkName = (e) => {
		if (e.target.value.length < 1) {
			setStartn(false);
			setnameWarning(true);
			setfirstName(e.target.value);
		} else {
			setStartn(false);
			setnameWarning(false);
			setfirstName(e.target.value);
		}
	};

	return (
		<div>
			<title>Create An Account</title>

			<Header />

			<div className="container">
				<div className="content">
					<div className="content_rgt">
						<div className="register_sec">
							<h1>Create An Account</h1>
							<ul>
								<li>
									<span>Username *</span>
									<input
										type="text"
										placeholder="Enter your username"
										style={{ color: "black" }}
										value={userName}
										onChange={(e) => checkusername(e)}
									/>
									{startu ? (
										""
									) : userNameWarning ? (
										<p style={{ color: "red" }}>Invalid UserName</p>
									) : (
										<p style={{ color: "green" }}>
											<i class="fa fa-check-circle" aria-hidden="true"></i>
										</p>
									)}
								</li>
								<li>
									<span>Password *</span>
									<input
										type="password"
										placeholder="Enter your password"
										style={{ color: "black" }}
										value={Password}
										onChange={(e) => checkpass(e)}
									/>
									{startp ? (
										""
									) : passWarning ? (
										<p style={{ color: "red" }}>Password is too short</p>
									) : (
										<p style={{ color: "green" }}>
											<i class="fa fa-check-circle" aria-hidden="true"></i>
										</p>
									)}
								</li>
								<li>
									<span>Email *</span>
									<input
										type="text"
										placeholder="Enter your email"
										style={{ color: "black" }}
										value={Email}
										onChange={(e) => checkEmail(e)}
									/>
									{starte ? (
										""
									) : props.EmailWarningBool ? (
										<p style={{ color: "red" }}>{props.EmailWarning}</p>
									) : (
										<p style={{ color: "green" }}>
											<i class="fa fa-check-circle" aria-hidden="true"></i>
										</p>
									)}
								</li>
								<li>
									<span>First Name *</span>
									<input
										type="text"
										placeholder="Enter your first name"
										style={{ color: "black" }}
										value={firstName}
										onChange={(e) => checkName(e)}
									/>
									{startn ? (
										""
									) : nameWarning ? (
										<p style={{ color: "red" }}>don't leave this field blank</p>
									) : (
										<p style={{ color: "green" }}>
											<i class="fa fa-check-circle" aria-hidden="true"></i>
										</p>
									)}
								</li>
								<li>
									<span>Last Name</span>
									<input
										type="text"
										placeholder="Enter your last name"
										style={{ color: "black" }}
										value={lastName}
										onChange={(e) => setlastName(e.target.value)}
									/>
								</li>
								<li>
									<input type="checkbox" />I agree to Term &amp; Conditions
								</li>
								<li>
									<input
										type="submit"
										defaultValue="Register"
										onClick={register}
									/>
								</li>
							</ul>
							<div className="addtnal_acnt">
								I already have an account.
								<Link to="/Login">Login My Account !</Link>
							</div>
						</div>
					</div>
					<HomeDescription />
				</div>
			</div>

			<Footer />
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
		EmailWarningBool: state.EmailWarningBool,
		EmailWarning: state.EmailWarning,
		registered: state.registered,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRegister: (data) => dispatch(register(data)),
		onEmailError: (data, bool) =>
			dispatch({ type: "register_fail", error: data, bool: bool }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
