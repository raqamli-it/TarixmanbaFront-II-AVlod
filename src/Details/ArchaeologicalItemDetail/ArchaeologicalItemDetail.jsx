import React, { useEffect, useState } from "react";
import style from "./archaeologicalItemDetail.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SiHomeadvisor } from "react-icons/si";
import { GrFormNext } from "react-icons/gr";
import axios from "axios";

function ArchaeologicalItemDetail() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const itemData = location.state;
  const itemTitle = itemData?.resources?.results?.find(
    (value) => Number(value.id) === Number(id)
  );

  const getData = async () => {
    try {
      const respons = await axios.get(`resource_api-detail/${id}`);
      setData(respons.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  // console.log(itemData, "itemmmm");
  // console.log(itemTitle, "ffffffff");
  // console.log(data, "data");

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.prevButtons}>
          <button onClick={() => navigate("/")}>
            <SiHomeadvisor />
            <GrFormNext />
            <span>{itemData?.title}</span>
          </button>

          <button>
            <GrFormNext />
            <span>{itemTitle?.title}</span>
          </button>
        </div>
      </div>

      <div className={style.content}>
        <h2>{itemTitle?.title}</h2>
        <img src={itemTitle?.image} alt={itemData?.title} />

        <div style={{ marginTop: "25px" }}>
          {data?.contents?.map((e) => (
            <p
              key={e?.id}
              dangerouslySetInnerHTML={{ __html: e?.description }}
            ></p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArchaeologicalItemDetail;
