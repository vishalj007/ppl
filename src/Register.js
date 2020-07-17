import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeDescription from "./Components/HomeDescription";

function Register(props) {
	const [userName, setuserName] = useState();
	const [Email, setemail] = useState();
	const [Password, setpassword] = useState();
	const [firstName, setfirstName] = useState();
	const [lastName, setlastName] = useState();
	const [EmailWarning, setemailWarning] = useState();
	const [EmailWarningBool, setemailWarningBool] = useState(false);
	const [passWarning, setpassWarning] = useState(false);
	const [userNameWarning, setUserNameWarning] = useState(false);
	const [nameWarning, setnameWarning] = useState(false);
	const [startp, setStartp] = useState(true);
	const [starte, setStarte] = useState(true);
	const [startu, setStartu] = useState(true);
	const [startn, setStartn] = useState(true);

	const register = () => {
		console.log("hello");
		if (
			(userNameWarning &&
				passWarning &&
				EmailWarningBool &&
				userNameWarning &&
				nameWarning) ||
			(userName === undefined &&
				Email === undefined &&
				Password === undefined &&
				firstName === undefined &&
				lastName === undefined)
		) {
			setStarte(false);
			setStartu(false);
			setStartp(false);
			setStartn(false);
			setUserNameWarning(true);
			setemailWarningBool(true);
			setemailWarning("wrong Email");
			setnameWarning(true);
			setpassWarning(true);
			alert("Please recheck your details again...!!!");
		} else {
			axios
				.post("http://localhost:8080/auth/register", {
					userName: userName,
					Email: Email,
					Password: Password,
					firstName: firstName,
					lastName: lastName,
				})
				.then(function (response) {
					if (
						response.data ===
						"User Already Registered please try to login with this email"
					) {
						setemailWarningBool(true);
						setemailWarning(response.data);
					} else {
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
				});
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
			setemailWarningBool(false);
			setemail(e.target.value);
			setemailWarning("Email is Fine");
		} else {
			setStarte(false);
			setemailWarningBool(true);
			setemail(e.target.value);
			setemailWarning("Please enter correct Email Address");
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
									) : EmailWarningBool ? (
										<p style={{ color: "red" }}>{EmailWarning}</p>
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

export default Register;
