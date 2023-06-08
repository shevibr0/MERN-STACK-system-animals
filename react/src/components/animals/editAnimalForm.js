import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../../services/apiService";


const EditAnimalsForm = () => {
  const [item, setItem] = useState({});
  const nav = useNavigate();
  const params = useParams();
  const {register,handleSubmit,formState: { errors }} = useForm();

  useEffect(() => {
    doApiInit();
  },[]);
  const doApiInit = async () => {
    try {
      const url = API_URL + "/animals/single/" + params["id"];
      const resp = await axios.get(url);
      console.log(resp.data);
      setItem(resp.data);
    } catch (err) {
        console.log(err)
    }
  };
  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPut(_bodyData);
  };

  const doApiPut = async (_bodyData) => {
    try {
      const url = API_URL + "/animals/" + params["id"];
      const resp = await axios({
        url: url,
        method: "PUT",
        data:_bodyData,
      });
      if (resp.data.modifiedCount) {
        alert("Animal updeted");
        nav("/animals");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">Edit animal</h1>
    {item.name?
      <form
        className="col-md-6 mx-auto border p-2"
        onSubmit={handleSubmit(onSubForm)}
        id="id_form"
      >
        <label>name</label>
        <input defaultValue={item.name}
          {...register("name", { required: true, minLength: 2 })}
          className="form-control"
          type="text"/>
        {errors.name && <div className="text-danger">* Enter valid name</div>}
        <label>info</label>
        <textarea defaultValue={item.info}
          {...register("info", { required: true, minLength: 2 })}
          className="form-control"
          type="textarea"></textarea>
        {errors.info && <div className="text-danger">* Enter valid info</div>}
        <label>image</label>
        <input defaultValue={item.img_url}
          {...register("img_url", { required: true, minLength: 2 })}
          className="form-control"
          type="text"/>
        {errors.img_url && (
          <div className="text-danger">* Enter valid img_url</div>
        )}
        <div className="text-center">
          <button className="btn btn-dark">Update</button>
        </div>
      </form>:<h2>Loading...</h2>}
    </div>
  );
};

export default EditAnimalsForm;
