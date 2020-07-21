import axios from "axios";

const likeUpdate1 = (response) => {
	return {
		type: "like_update",
		detail: response.data,
		like: response.data.likes.length,
		alreadyLiked: true,
	};
};
const likeRemove1 = (response) => {
	return {
		type: "like_remove",
		alreadyLiked: false,
	};
};

export const likeUpdate = (data) => {
	const newData = {
		email: data.email,
		userid: data.userid,
		id: data.id,
	};
	return (dispatch) => {
		axios
			.post("http://localhost:8080/likes/update", newData)
			.then((response) => {
				dispatch(likeUpdate1(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

export const likeRemove = (data) => {
	const newData = {
		email: data.email,
		userid: data.userid,
		id: data.id,
	};
	return (dispatch) => {
		axios
			.post("http://localhost:8080/likes/remove", newData)
			.then((response) => {
				dispatch(likeRemove1(response));
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

const detailData = (response, userid) => {
	var already;
	for (var key in response.data[0].likes) {
		if (response.data[0].likes[key].id === userid) {
			already = true;
		} else {
			already = false;
		}
	}
	return {
		type: "get_detail",
		detail: response.data[0],
		reply: response.data[0].reply,
		commentCount:
			response.data[0].comment.length + response.data[0].reply.length,
		like: response.data[0].likes.length,
		alreadyLiked: already,
	};
};

export const getDetails = (id, userid) => {
	return (dispatch) =>
		axios
			.post("http://localhost:8080/feed/getdetails", {
				id: id,
			})
			.then((response) => {
				dispatch(detailData(response, userid));
			})
			.catch((err) => console.log(err));
};

const onUpdateComment = (data) => {
	return {
		type: "update_comment",
		detail: data,
	};
};

export const updateComment = (data) => {
	return (dispatch) => {
		const newData = {
			avatar: data.avatar,
			id: data.id,
			commentor: data.commentor,
			comment: data.comment,
		};
		axios
			.post("http://localhost:8080/comment/update", newData)
			.then((response) => {
				console.log("comment data ---- ", response.data);
				dispatch(onUpdateComment(response.data));
			})
			.catch((err) => console.log("comment update error:", err));
	};
};
