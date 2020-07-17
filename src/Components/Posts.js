import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../Utils/Common";
import Axios from "axios";

export function Posts(props) {
	const user = getUser();
	const [i, setI] = useState(props.post);
	const [like, setLikes] = useState(0);
	const [alreadyLiked, setAlreadyLiked] = useState(false);

	useEffect(() => {
		checkLike();
	}, []);
	const checkLike = () => {
		console.log("Console Check Like", props.post);
		for (var key in props.post.likes) {
			setLikes(like + 1);
			if (props.post.likes[key].id === user.id) {
				setAlreadyLiked(true);
			} else {
				setAlreadyLiked(false);
			}
		}
	};

	const likeupdate = (e) => {
		e.preventDefault();
		Axios.post("http://localhost:8080/likes/update", {
			email: user.Email,
			userid: user.id,
			id: i.id,
		})
			.then((response) => {
				setI(response.data);
				setLikes(response.data.likes.length);
				setAlreadyLiked(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const likeremove = (e) => {
		e.preventDefault();
		Axios.post("http://localhost:8080/likes/remove", {
			email: user.Email,
			userid: user.id,
			id: i.id,
		})
			.then((response) => {
				setLikes(i.likes.length - 1);
				setAlreadyLiked(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (i.title === undefined) {
		return "";
	} else {
		return (
			<div className="contnt_2">
				<div className="div_a">
					<div className="div_title">{i.title}</div>
					<div className="btm_rgt">
						<div className="btm_arc">{i.category}</div>
					</div>
					<div className="div_top">
						<div className="div_top_lft">
							<img
								style={{ width: "40px", height: "40px", borderRadius: "50%" }}
								src={`http://localhost:8080${i.avatar}?${Date.now()}`}
							/>
							{i.author}
						</div>
						<div className="div_top_rgt">
							<span className="span_date">{i.date}</span>
							<span className="span_time">{i.time}</span>
						</div>
					</div>
					<div className="div_image">
						<Link to={`/Singlepost/${i.id}`}>
							<img src={`http://localhost:8080/${i.image}`} alt="pet" />
						</Link>
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
								<li>
									{alreadyLiked ? (
										<a href="#" onClick={(e) => likeremove(e)}>
											<span className="btn_icon black_btn">
												<img src="/images/icon_003.png" alt="share" />
											</span>
											{like} Liked
										</a>
									) : (
										<a href="#" onClick={(e) => likeupdate(e)}>
											<span className="btn_icon">
												<img src="/images/icon_003.png" alt="share" />
											</span>
											{like} like
										</a>
									)}
								</li>
								<li>
									<Link to={`/Singlepost/${i.id}`}>
										<span className="btn_icon">
											<img src="/images/icon_004.png" alt="share" />
										</span>
										{i.comment.length + i.reply.length} Comments
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
