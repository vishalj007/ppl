import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import axios from "axios";
import { getUser, setUserSession, getToken } from "./Utils/Common";
import { Posts } from "./Components/Posts";

function Timeline(props) {
	const [user, setUsr] = useState(getUser());
	let token = getToken();

	var formData;
	const [uploadForm, setUploadForm] = useState(false);
	const [title, setTitle] = useState();
	const [category, setCategory] = useState();
	const [imagepost, setImage] = useState();
	const [editBtn, setEditBtn] = useState(false);
	const [description, setDescription] = useState(user.description);
	const [sex, setSex] = useState(user.sex);
	const [CategoriesBtn, setCategoriesBtn] = useState(false);
	const [Categories, setCategories] = useState();
	const [categoryName, setCategoryName] = useState();
	const [categoryClick, setCategoryClick] = useState();
	const [elements, setElements] = useState();
	const [change, setChange] = useState(Math.random());
	const [t1, sett1] = useState();

	/// for fetching posts data from server
	useEffect(() => {
		axios
			.post("http://localhost:8080/feed/gettimeline")
			.then((response) => {
				console.log("updates", response.data);

				setElements(response.data.reverse());
			})
			.catch((err) => console.log(err));
	}, [t1]);

	useEffect(() => {
		axios
			.post("http://localhost:8080/category/get")
			.then((response) => {
				setCategories(response.data);
			})
			.catch((err) => console.log(err));
		console.log(user.id);
	}, [change]);

	const uploadPost = (e) => {
		e.preventDefault();
		formData = new FormData();
		formData.append("file", imagepost);
		formData.append("email", user.Email);
		formData.append("id", user.id);
		formData.append("title", title);
		formData.append("category", category);
		formData.append("avatar", user.avatar);
		formData.append("author", user.firstName + " " + user.lastName);

		const response = axios
			.post("http://localhost:8080/feed/upload", formData)
			.then((response) => {
				console.log("inside upload post: ", response.data);
				setUploadForm(false);
				setTitle();
				setCategory();
				sett1(response.data);
			})
			.catch((err) => console.log(err));
	};

	const showForm = () => {
		if (uploadForm) {
			setUploadForm(false);
		} else {
			setUploadForm(true);
		}
	};

	const editDetails = async (e) => {
		e.preventDefault();
		const resp = await axios
			.post("http://localhost:8080/auth/editDetails", {
				email: user.Email,
				id: user.id,
				description: description,
				sex: sex,
			})
			.then((response) => {
				console.log(response.data);
				setUserSession(token, response.data);
				setUsr(getUser());
				//window.location.reload(false);
				setEditBtn(false);
			})
			.catch((err) => console.log(err));
	};

	const changePic = (e) => {
		e.preventDefault();
		var formdetails = new FormData();
		formdetails.append("email", user.Email);
		formdetails.append("id", user.id);
		formdetails.append("avatar", e.target.files[0]);
		console.log(e.target.files[0]);

		axios
			.post("http://localhost:8080/auth/changepic", formdetails)
			.then((response) => {
				setChange(Math.random());
				console.log(response);
			})
			.catch((err) => console.log(err));
	};

	const InsertCategory = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/category/add", {
				categoryName: categoryName,
			})
			.then((response) => {
				console.log(response.data);
				setCategoryName("");
				setChange(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	///// Add Categories UI

	const AddCategories = (
		<div className="Categories">
			<label for="categoryName">Category Name</label>
			<form onSubmit={(e) => InsertCategory(e)}>
				<input
					type="text"
					name="categoryName"
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
					required
				/>

				<input type="submit" className="btn_icon" value="Add Category" />
			</form>
		</div>
	);

	return (
		<div>
			<meta charSet="utf-8" />
			<title>Home</title>
			<Header />
			<div className="container">
				<div className="content">
					<div className="content_rgt">
						<div className="rght_btn">
							{" "}
							<span className="rght_btn_icon">
								<img src="/images/btn_iconb.png" alt="up" />
							</span>{" "}
							<span className="btn_sep">
								<img src="/images/btn_sep.png" alt="sep" />
							</span>{" "}
							<a href="#" onClick={showForm}>
								Upload Post
							</a>{" "}
						</div>
						<div className="rght_btn">
							{" "}
							<span className="rght_btn_icon">
								<img src="/images/btn_icona.png" alt="up" />
							</span>{" "}
							<span className="btn_sep">
								<img src="/images/btn_sep.png" alt="sep" />
							</span>{" "}
							<a
								href="#"
								onClick={() =>
									CategoriesBtn
										? setCategoriesBtn(false)
										: setCategoriesBtn(true)
								}
							>
								Add Categories
							</a>{" "}
							{CategoriesBtn ? AddCategories : ""}
						</div>
						<div className="rght_cate">
							<div className="rght_cate_hd" id="rght_cat_bg">
								Categories
							</div>
							<div className="rght_list">
								<ul>
									{Categories
										? Categories.map((i, key) => (
												<li key={key}>
													<a
														href="#"
														onClick={() => setCategoryClick(i.category)}
													>
														<span className="list_icon"></span> {i.category}
													</a>
												</li>
										  ))
										: ""}
									<li>
										{" "}
										<a href="#" onClick={() => setCategoryClick()}>
											<span className="list_icon"></span> Show All
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="rght_cate">
							<div className="rght_cate_hd" id="opn_cat_bg">
								Featured
							</div>
							<div className="sub_dwn">
								<div className="feat_sec">
									<div className="feat_sec_img">
										<img src="/images/feat_img1.png" alt="image" />
									</div>
									<div className="feat_txt">Lorem Ipusum Text</div>
								</div>
								<div className="feat_sec">
									<div className="feat_sec_img">
										<img src="/images/feat_img2.png" alt="image" />
									</div>
									<div className="feat_txt">Lorem Ipusum Text</div>
									<div className="btm_rgt">
										<div className="btm_arc">Dogs</div>
									</div>
								</div>
								<div className="feat_sec">
									<div className="feat_sec_img">
										<img src="/images/feat_img3.png" alt="image" />
									</div>
									<div className="feat_txt">Lorem Ipusum Text</div>
									<div className="btm_rgt">
										<div className="btm_arc">Rabbits</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="content_lft">
						<div className="contnt_1">
							<div className="list_1">
								<ul>
									<li>
										<input type="checkbox" className="chk_bx" />
										Friends
									</li>
									<li>
										<input type="checkbox" className="chk_bx" />
										Flaged
									</li>
								</ul>
							</div>
							<div className="timeline_div">
								<div className="timeline_div1">
									<div className="profile_pic">
										<img
											src={`http://localhost:8080${user.avatar}?${Date.now()}`}
										/>

										<div className="profile_text">
											<label for="inputUpload" className="custom-file-upload">
												Change Profile Pic
											</label>
											<input
												id="inputUpload"
												type="file"
												hidden={true}
												onChange={(e) => changePic(e)}
											/>
										</div>
									</div>
									<div className="profile_info">
										<div className="edit_div">
											<a
												href="#"
												onClick={() => {
													editBtn ? setEditBtn(false) : setEditBtn(true);
												}}
											>
												Edit <img src="/images/timeline_img.png" />
											</a>
										</div>

										<div className="profile_form">
											<form onSubmit={(e) => editDetails(e)}>
												<ul>
													<li>
														<div className="div_name1">Name :</div>
														<div className="div_name2">
															{user.firstName + " " + user.lastName}
														</div>
													</li>
													<li>
														<div className="div_name1">Sex :</div>
														{editBtn ? (
															<select
																value={sex}
																onChange={(e) => setSex(e.target.value)}
															>
																<option value="">Select</option>
																<option value="Male">Male</option>
																<option value="Female">Female</option>
															</select>
														) : (
															<div className="div_name2">{user.sex}</div>
														)}
													</li>
													<li>
														<div className="div_name1">Description :</div>
														{editBtn ? (
															<input
																type="text"
																value={description}
																onChange={(e) => {
																	setDescription(e.target.value);
																}}
															/>
														) : (
															<div className="div_name3">
																{user.description}
															</div>
														)}
													</li>
													<li>
														{editBtn ? (
															<span className="btn_icon">
																<input
																	type="submit"
																	className="btn btn-primary"
																	value="Update Details"
																/>
															</span>
														) : (
															""
														)}
													</li>
												</ul>
											</form>{" "}
										</div>
									</div>
								</div>
								<div className="timeline_div2">
									<ul>
										<li>
											<a href="#" className="active">
												Timeline{" "}
											</a>
										</li>
										<li>
											<a href="#">About </a>
										</li>
										<li>
											<a href="#">Album</a>
										</li>
										<li>
											<a href="#"> Pets</a>
										</li>
										<li>
											<a href="#">My Uploads </a>
										</li>
									</ul>
								</div>

								{uploadForm ? (
									<div className="upload_form">
										<center>
											<h3>UPLOAD FORM</h3>
										</center>
										<form onSubmit={(e) => uploadPost(e)}>
											<span>Post Title</span>
											<input
												type="text"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
											<span>Category</span>
											<select
												value={category}
												onChange={(e) => setCategory(e.target.value)}
											>
												<option value="">Select</option>
												{Categories.map((i) => (
													<option value={i.category}>{i.category}</option>
												))}
											</select>
											<br />
											<span>Upload Image</span>
											<input
												type="file"
												onChange={(e) => {
													setImage(e.target.files[0]);
													console.log(e.target.files[0]);
												}}
											/>
											<br />
											<span className="btn_icon">
												<input type="submit" value="Upload Post" />
											</span>
										</form>
									</div>
								) : (
									""
								)}
							</div>
						</div>
						<br />

						{elements
							? categoryClick
								? elements.map((i) =>
										i.category === categoryClick ? (
											<li key={i.id}>
												<Posts post={i} />
											</li>
										) : (
											""
										)
								  )
								: elements.map((i, key) => (
										<li key={i.id}>
											<Posts post={i} />
										</li>
								  ))
							: ""}
					</div>
				</div>
				<div className="clear" />
			</div>

			<Footer />
		</div>
	);
}
export default Timeline;
