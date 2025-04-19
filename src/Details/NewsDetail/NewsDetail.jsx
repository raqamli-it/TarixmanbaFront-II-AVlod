import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import style from "./newsDetail.module.scss";

function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const getData = async () => {
    const respons = await axios.get(`news/${id}`);
    setData(respons.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={style.container}>
      <button onClick={() => navigate(-1)}>
        <FaPersonWalkingArrowLoopLeft style={{ fontSize: "28px" }} />
        Chiqish
      </button>
      <div className={style.wrapper}>
        <img src={data.file} alt="rasim bor" />
        <h3>{data.content}</h3>
        <h2>{data.title}</h2>
      </div>
    </div>
  );
}

export default NewsDetail;
