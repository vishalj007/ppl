import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import { getUser } from "./Utils/Common";
import Comments from "./Components/Comments";

function SinglePost(props) {
	var user = getUser();
	const [detail, setDetail] = useState();
	const [likes, setLikes] = useState();
	const [comments, setComments] = useState();
	const [commentCount, setCommentCount] = useState();
	const [alreadyLiked, setAlreadyLiked] = useState(false);

	useEffect(() => {
		axios
			.post("http://localhost:8080/feed/getdetails", {
				id: props.match.params.id,
			})
			.then((response) => {
				setDetail(response.data[0]);
				console.log(response.data);
				setCommentCount(
					response.data[0].comment.length + response.data[0].reply.length
				);

				for (var key in response.data[0].likes) {
					if (response.data[0].likes[key].id === user.id) {
						setAlreadyLiked(true);
						console.log("matched", response.data[0].likes[key].id, user.id);
					} else {
						setAlreadyLiked(false);
						console.log(
							"not matched",
							response.data[0].likes[key].email,
							user.Email
						);
					}
				}
			})
			.catch((err) => console.log(err));
	}, [likes]);

	const updateComment = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/comment/update", {
				avatar: user.avatar,
				id: props.match.params.id,
				commentor: user.firstName + " " + user.lastName,
				comment: comments,
			})
			.then((response) => {
				console.log(response.data);
				setComments("");
				setDetail(response.data);
			})
			.catch((err) => console.log(err));
	};

	const likeupdate = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/likes/update", {
				email: user.Email,
				userid: user.id,
				id: props.match.params.id,
			})
			.then((response) => {
				setDetail(response.data);
				setAlreadyLiked(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const likeremove = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/likes/remove", {
				email: user.Email,
				userid: user.id,
				id: props.match.params.id,
			})
			.then((response) => {
				setLikes(response.data);
				setAlreadyLiked(false);
			})
			.catch((err) => {
				console.log(err);
			});
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
								<div className="div_title">{detail ? detail.title : ""}</div>
								<div className="btm_rgt">
									<div className="btm_arc">{detail ? detail.category : ""}</div>
								</div>
								<div className="div_top">
									<div className="div_top_lft">
										{detail ? (
											<img
												style={{
													width: "40px",
													height: "40px",
													borderRadius: "50%",
												}}
												src={`http://localhost:8080${detail.avatar}`}
												alt="userpic"
											/>
										) : (
											""
										)}
										{detail ? detail.author : ""}
									</div>
									<div className="div_top_rgt">
										<span className="span_date">
											{detail ? detail.date : ""}
										</span>
										<span className="span_time">
											{detail ? detail.time : ""}
										</span>
									</div>
								</div>
								<div className="div_image">
									{detail ? (
										<img src={`http://localhost:8080/${detail.image}`} />
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

											{detail ? (
												alreadyLiked ? (
													<li>
														<a href="#" onClick={(e) => likeremove(e)}>
															<span className="btn_icon ">
																<img src="/images/icon_003.png" alt="share" />
															</span>
															{detail.likes.length} Liked
														</a>
													</li>
												) : (
													<li>
														<a href="#" onClick={(e) => likeupdate(e)}>
															<span className="btn_icon">
																<img src="/images/icon_003.png" alt="share" />
															</span>
															{detail.likes.length} like
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
													{commentCount} Comments
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="contnt_3">
							<ul>
								{detail
									? detail.comment.map((key) => (
											<Comments post={key} reply={detail.reply} />
									  ))
									: ""}
								<li>
									<div className="cmnt_div1">
										<form onSubmit={(e) => updateComment(e)}>
											<input
												type="text"
												value={comments}
												style={{ color: "#000" }}
												onChange={(e) => {
													setComments(e.target.value);
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
export default SinglePost;
