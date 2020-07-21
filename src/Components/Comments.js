import React, { useState, useEffect } from "react";

import axios from "axios";
import { connect } from "react-redux";

function Comments(props) {
	const key = props.post;
	const [replyBtn, setReplyBtn] = useState(false);
	const user = props.user;
	useEffect(() => {
		console.log("reply", props.reply);
	}, [props.reply]);

	const submitReply = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/comment/reply", {
				avatar: user.avatar,
				commenton: key.id,
				id: user.id,
				commentor: user.firstName + " " + user.lastName,
				comment: props.commentreply,
			})
			.then((response) => {
				console.log(response.data);
				props.setComments("commentreply", "");
				props.setComments("reply", response.data.reply);
				setReplyBtn(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (key.commentor === undefined) {
		return "";
	} else {
		return (
			<li>
				<div className="list_image">
					<div className="image_sec">
						<img
							style={{ width: "40px", height: "40px", borderRadius: "50%" }}
							src={`http://localhost:8080${key.avatar}`}
							alt="userpic"
						/>
					</div>
					<div className="image_name">{key.commentor}</div>
				</div>
				<div className="list_info">{key.comment}</div>
				{props.reply
					? props.reply.map((i) =>
							i.commenton === key.id ? (
								<li>
									<div className="list_image">
										<div className="image_sec">
											<img
												style={{
													width: "40px",
													height: "40px",
													borderRadius: "50%",
												}}
												src={`http://localhost:8080${i.avatar}`}
												alt="userpic"
											/>
										</div>
										<div className="image_name">{i.commentor}</div>
									</div>
									<div className="list_info">{i.comment}</div>
								</li>
							) : (
								""
							)
					  )
					: ""}

				<input
					type="button"
					defaultValue="Reply"
					className={replyBtn ? "black_btn" : "orng_btn"}
					onClick={() => (replyBtn ? setReplyBtn(false) : setReplyBtn(true))}
				/>

				{replyBtn ? (
					<div className="cmnt_div">
						<form onSubmit={(e) => submitReply(e)}>
							<input
								type="text"
								name="commentreply"
								value={props.commentreply}
								style={{ color: "#000000" }}
								onChange={(e) =>
									props.setComments("commentreply", e.target.value)
								}
								className="cmnt_bx"
								required
							/>
							<input
								type="submit"
								className="sub_bttn"
								defaultValue="Submit Comment"
							/>
						</form>
					</div>
				) : (
					""
				)}
			</li>
		);
	}
}

const mapStateToProps = (state) => {
	console.log("state", state);
	return {
		reply: state.reply,
		commentreply: state.commentreply,
		user: state.user,
	};
};

const mapDipatchToProps = (dispatch) => {
	return {
		setComments: (name, value) => {
			dispatch({ type: "comments", [name]: value, name: name });
		},
	};
};

export default connect(mapStateToProps, mapDipatchToProps)(Comments);
