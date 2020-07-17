import React, { useState, useEffect } from "react";
import { getUser } from "../Utils/Common";
import axios from "axios";

export default function Posts(props) {
	const key = props.post;
	const [reply, setReply] = useState(props.reply);
	const [replyBtn, setReplyBtn] = useState(false);

	const [comment, setComment] = useState();

	const user = getUser();

	const submitReply = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/comment/reply", {
				avatar: user.avatar,
				commenton: key.id,
				id: user.id,
				commentor: user.firstName + " " + user.lastName,
				comment: comment,
			})
			.then((response) => {
				console.log(response.data);
				setComment("");
				setReply(response.data.reply);
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
				{reply
					? reply.map((i) =>
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
								value={comment}
								style={{ color: "#000000" }}
								onChange={(e) => setComment(e.target.value)}
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
