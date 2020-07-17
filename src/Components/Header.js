import React from "react";

import { removeUserSession, getUser } from "../Utils/Common";
import { Link } from "react-router-dom";

function Header(props) {
	const logout = () => {
		removeUserSession();
	};
	const user = getUser();
	return (
		<div>
			<div className="navbar navbar-inverse navbar-fixed-top">
				<div className="navbar-inner">
					<div className="container">
						<button
							type="button"
							className="btn btn-navbar"
							data-toggle="collapse"
							data-target=".nav-collapse"
						>
							{" "}
							<span className="icon-bar" /> <span className="icon-bar" />{" "}
							<span className="icon-bar" />{" "}
						</button>
						<a className="brand" href="#">
							PPL
						</a>
						<div className="pro_info pull-right">
							<div className="pro_icn">
								<img src="/images/pic_small.png" />
							</div>
							<div className="pro_txt">
								Me
								<b className="caret" />
							</div>
							<ul
								className="dropdown-menu"
								role="menu"
								aria-labelledby="dLabel"
							>
								<li>
									<a tabIndex={-1} href="#">
										My Profile
									</a>
								</li>
								<li>
									<a tabIndex={-1} href="#">
										Message Box
									</a>
								</li>
								<li>
									<a tabIndex={-1} href="#">
										Change Language
									</a>
								</li>
								<li className="divider" />
								<li>
									<a tabIndex={-1} href="#">
										<input type="text" placeholder="search" />
									</a>
								</li>
							</ul>
						</div>
						<div className="nav-collapse collapse">
							<ul className="nav">
								<li className="active">
									{" "}
									<a href="#">Home</a>{" "}
								</li>
								<li className="true">
									{" "}
									<a href="#">E-Coupons</a>{" "}
								</li>
								<li className="true">
									{" "}
									<a href="#">E-Brands</a>{" "}
								</li>
								<li className="true">
									{" "}
									<a href="#">Resuse Market</a>{" "}
								</li>
								<li className="true">
									{" "}
									<a href="#">Lost and Found</a>{" "}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="header">
				<div className="header_lft">
					<div className="logo">
						<Link to="/Timeline">
							<img src="/images/logo.png" />
						</Link>
					</div>
					<div className="navigatn">
						<ul>
							<li>
								<a href="#" className="active">
									Home
								</a>
							</li>
							<li>
								<a href="#"> E-Coupons </a>
							</li>
							<li>
								<a href="#">E-Brands </a>
							</li>
							<li>
								<a href="#"> Resuse Market </a>
							</li>
							<li>
								<a href="#"> Lost and Found</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="header_rgt">
					<div className="flag_div">
						<img src="/images/flag.png" />
					</div>
					<input type="text" placeholder="Search" className="txt_box" />
					<div className="msg_box">
						<a href="#">
							<span className="msg_count">100</span>
						</a>
					</div>
					{user ? (
						<div className="pro_info pull-right">
							<div className="pro_icn">
								<img src="/images/pic_small.png" />
							</div>
							<div className="pro_txt">
								Me
								<b className="caret" />
							</div>
							<ul
								className="dropdown-menu"
								role="menu"
								aria-labelledby="dLabel"
							>
								<li>
									<Link to="/Login" onClick={logout}>
										Logout
									</Link>
								</li>
								<li>
									<a tabIndex={-1} href="#">
										Message Box
									</a>
								</li>
								<li className="divider" />
								<li>
									<a tabIndex={-1} href="#">
										<input type="text" placeholder="search" />
									</a>
								</li>
							</ul>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
