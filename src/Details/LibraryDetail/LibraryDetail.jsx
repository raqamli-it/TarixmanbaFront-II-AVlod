import React, { useEffect, useState } from "react";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import style from "./libraryDetail.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

function LibraryDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const getData = async () => {
    const respons = await axios.get(`library-categories/${id}`);
    setData(respons.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>libraryDetail {id}</h1>
    </div>
  );
}

export default LibraryDetail;
