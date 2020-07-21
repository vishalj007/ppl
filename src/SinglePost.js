import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import Comments from "./Components/Comments";
import { connect } from "react-redux";
import {
	likeUpdate,
	likeRemove,
	getDetails,
	updateComment,
} from "./reduxMiddleware/singlepost_middle";

function SinglePost(props) {
	var user = props.user;

	useEffect(() => {
		props.ongetDetail(props.match.params.id, user.id);
	}, [props.alreadyLiked]);

	const updateComment = (e) => {
		e.preventDefault();
		const data = {
			avatar: user.avatar,
			id: props.match.params.id,
			commentor: user.firstName + " " + user.lastName,
			comment: props.comment,
		};
		props.onUpdateComment(data);
		/* axios
			.post("http://localhost:8080/comment/update", {
				avatar: user.avatar,
				id: props.match.params.id,
				commentor: user.firstName + " " + user.lastName,
				comment: props.comment,
			})
			.then((response) => {
				console.log(response.data);
				props.setSignlePosts("comment", "");
				props.setSignlePosts("detail", response.data);
			})
			.catch((err) => console.log(err)); */
	};

	const likeupdate = (e) => {
		e.preventDefault();
		const data = {
			email: user.Email,
			userid: user.id,
			id: props.match.params.id,
		};
		props.onLikeUpdate(data);
	};
	const likeremove = (e) => {
		e.preventDefault();
		const data = {
			email: user.Email,
			userid: user.id,
			id: props.match.params.id,
		};
		props.onLikeRemove(data);
	};
	return (
		<div>
			<title>Single Post</title>
			<Header />
			<div className="container">
				<div className="content">
					<div className="content">
						<div className="contnt_2">
							<div className="div_a">
								<div className="div_title">
									{props.detail ? props.detail.title : ""}
								</div>
								<div className="btm_rgt">
									<div className="btm_arc">
										{props.detail ? props.detail.category : ""}
									</div>
								</div>
								<div className="div_top">
									<div className="div_top_lft">
										{props.detail ? (
											<img
												style={{
													width: "40px",
													height: "40px",
													borderRadius: "50%",
												}}
												src={`http://localhost:8080${props.detail.avatar}`}
												alt="userpic"
											/>
										) : (
											""
										)}
										{props.detail ? props.detail.author : ""}
									</div>
									<div className="div_top_rgt">
										<span className="span_date">
											{props.detail ? props.detail.date : ""}
										</span>
										<span className="span_time">
											{props.detail ? props.detail.time : ""}
										</span>
									</div>
								</div>
								<div className="div_image">
									{props.detail ? (
										<img src={`http://localhost:8080/${props.detail.image}`} />
									) : (
										""
									)}
								</div>
								<div className="div_btm">
									<div className="btm_list">
										<ul>
											<li>
												<a href="#">
													<span className="btn_icon">
														<img src="/images/icon_001.png" alt="share" />
													</span>
													Share
												</a>
											</li>
											<li>
												<a href="#">
													<span className="btn_icon">
														<img src="/images/icon_002.png" alt="share" />
													</span>
													Flag
												</a>
											</li>

											{props.detail ? (
												props.alreadyLiked ? (
													<li>
														<a href="#" onClick={(e) => likeremove(e)}>
															<span className="btn_icon ">
																<img src="/images/icon_003.png" alt="share" />
															</span>
															{props.like} Liked
														</a>
													</li>
												) : (
													<li>
														<a href="#" onClick={(e) => likeupdate(e)}>
															<span className="btn_icon">
																<img src="/images/icon_003.png" alt="share" />
															</span>
															{props.like} like
														</a>
													</li>
												)
											) : (
												""
											)}

											<li>
												<a href="#">
													<span className="btn_icon">
														<img src="/images/icon_004.png" alt="share" />
													</span>
													{props.commentCount} Comments
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="contnt_3">
							<ul>
								{props.detail
									? props.detail.comment.map((i, key) => (
											<li key={key}>
												<Comments post={i} />
											</li>
									  ))
									: ""}
								<li>
									<div className="cmnt_div1">
										<form onSubmit={(e) => updateComment(e)}>
											<input
												type="text"
												value={props.comment}
												style={{ color: "#000" }}
												onChange={(e) => {
													props.setSignlePosts("comment", e.target.value);
												}}
												className="cmnt_bx1"
												required
											/>
											<input
												type="Submit"
												className="sub_bttn1"
												Value="Submit Comment"
											/>
										</form>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="clear" />
			</div>
			<Footer />
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log("state", state);
	return {
		comment: state.comment,
		detail: state.detail,
		commentCount: state.commentCount,
		alreadyLiked: state.alreadyLiked,
		like: state.like,
		user: state.user,
	};
};

const mapDipatchToProps = (dispatch) => {
	return {
		setSignlePosts: (name, value) => {
			dispatch({ type: "SinglePosts", [name]: value, name: name });
		},
		onLikeUpdate: (data) => {
			dispatch(likeUpdate(data));
		},
		onLikeRemove: (data) => {
			dispatch(likeRemove(data));
		},
		ongetDetail: (id, userid) => {
			dispatch(getDetails(id, userid));
		},
		onUpdateComment: (data) => {
			dispatch(updateComment(data));
		},
	};
};

export default connect(mapStateToProps, mapDipatchToProps)(SinglePost);
