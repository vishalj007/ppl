/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeDescription from "./Components/HomeDescription";
import { setUserSession } from "./Utils/Common";

function Login(props) {
	const [Email, setemail] = useState();
	const [Password, setpassword] = useState();
	const [Warning, setWarning] = useState();
	const [EmailWarning, setemailWarning] = useState();
	const [passWarning, setpassWarning] = useState(false);
	const [EmailWarningBool, setemailWarningBool] = useState(false);
	const [startp, setStartp] = useState(true);
	const [starte, setStarte] = useState(true);

	const login = () => {
		if (
			(passWarning && EmailWarningBool) ||
			(Email === undefined && Password === undefined)
		) {
			setStarte(false);
			setStartp(false);
			setemailWarningBool(true);
			setemailWarning("Please Enter correct email address");

			setpassWarning(true);
			alert("Please recheck your details again...!!!");
		} else {
			axios
				.post("http://localhost:8080/auth/login", {
					Email: Email,
					Password: Password,
				})
				.then(function (response) {
					if (
						response.data === ("Wrong password....!!" || "User not registered")
					) {
						setWarning(response.data);
					} else {
						setUserSession(response.data.token, response.data.user);

						setpassword(undefined);
						setemail(undefined);
						/* alert(response.data); */

						props.history.push("/Timeline");
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		console.log(Email, Password);
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

	return (
		<div>
			<meta charSet="utf-8" />
			<title>Login Account</title>

			<Header />

			<div className="container">
				<div className="content">
					<div className="content_rgt">
						<div className="login_sec">
							<h1>Log In</h1>
							<ul>
								<p style={{ color: "red" }}>{Warning}</p>
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
									<input type="checkbox" />
									Remember Me
								</li>
								<li>
									<input type="submit" defaultValue="Log In" onClick={login} />
									<a href>Forgot Password</a>
								</li>
							</ul>
							<div className="addtnal_acnt">
								I do not have any account yet.
								<Link to="/Register">Create My Account Now !</Link>
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

export default Login;
