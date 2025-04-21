import React, { useContext, useEffect, useState } from "react";
import style from "./homeImageDetail.module.scss";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { BsMic, BsFillChatTextFill } from "react-icons/bs";
import { BiImages } from "react-icons/bi";
import { LiaGlobeAmericasSolid } from "react-icons/lia";
import { LuRotate3D } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import Loading from "../../Loading/Loading";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ValueContext } from "../../App";
import ReactPaginate from "react-paginate";

function HomeImageDetail() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [openBox, setOpenBox] = useState(null);
  const [openBoxChog, setOpenBoxChog] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchValue } = useContext(ValueContext);

  const currentPage = Number(searchParams.get("page")) || 1;

  const handleSelect = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getData = async (
    Page = 1,
    filters = checkedItems,
    search = searchText
  ) => {
    try {
      const query = filters.map((id) => `filters=${id}`).join("&");
      const respons = await axios.get(
        `category-resource/${id}/?${query}&search=${search}&page=${Page}`
      );

      setPageCount(Math.ceil(respons?.data?.resources?.count / 20));
      if (respons.status) {
        setData(respons);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setSearchParams({ page: selectedPage });
    getData(selectedPage);
  };

  const onSearchClick = () => {
    getData(currentPage, checkedItems, searchText);
  };

  const ToggleBtn = (id) => {
    setOpenBox((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    getData(currentPage);
  }, [id, currentPage, checkedItems, searchText]);

  const result = data.data?.filter_categories.map((category) => ({
    ...category,
    filters: data.data?.filters.filter(
      (filter) => Number(filter.filter_category) === Number(category.id)
    ),
  }));

  console.log(data.data, "data.data?.period_filters");

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : data?.data?.resources?.results.length > 0 ? (
        <div className={style.innerContainer}>
          <div className={style.description}>
            <h1>{data?.data?.category}</h1>
            <div className={style.search}>
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearchClick()}
              />
              <FcSearch onClick={onSearchClick} />
            </div>

            <div className={style.acardion}>
              <div className={style.accordionItem}>
                <button>
                  <span>Chog'lar</span>
                  <span
                    onClick={() => setOpenBoxChog(!openBoxChog)}
                    style={{
                      transform: openBoxChog ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                      display: "inline-block",
                    }}
                  >
                    ▼
                  </span>
                </button>

                {data.data?.period_filters?.map((val, idx) => (
                  <div key={idx}>
                    <div
                      className={`${style.accordionContent} ${
                        openBoxChog ? style.openBox : style.closeBox
                      }`}
                    >
                      <div className={style.accordionHeader}>
                        <span>{val?.title}</span>

                        <label className={style.checkboxWrapper}>
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(val.id)}
                            onChange={() => handleSelect(val.id)}
                          />
                          <span className={style.customCheckbox}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={style.accordionItem}>
                {result?.map((filterCategory, idx) => (
                  <div key={idx}>
                    <button onClick={() => ToggleBtn(filterCategory.id)}>
                      <span>{filterCategory.title}</span>
                      <span
                        style={{
                          transform:
                            openBox === filterCategory.id
                              ? "rotate(180deg)"
                              : "rotate(0)",
                          transition: "transform 0.3s ease",
                          display: "inline-block",
                        }}
                      >
                        ▼
                      </span>
                    </button>

                    <div
                      className={`${style.accordionContent} ${
                        openBox === filterCategory.id
                          ? style.openBox
                          : style.closeBox
                      }`}
                    >
                      {filterCategory.filters.map((filterItem, subIdx) => (
                        <div key={subIdx} className={style.accordionHeader}>
                          <span>{filterItem.title}</span>
                          <label className={style.checkboxWrapper}>
                            <input
                              type="checkbox"
                              checked={checkedItems.includes(filterItem.id)}
                              onChange={() => handleSelect(filterItem.id)}
                            />
                            <span className={style.customCheckbox}></span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={style.wrapper}>
            {data?.data?.resources?.results?.map((value, idx) => (
              <div key={idx} className={style.card}>
                <div>
                  <img
                    onClick={() => navigate(`${value.id}?page=${currentPage}`)}
                    src={value.image}
                    alt={value.title}
                  />
                </div>

                <div className={style.mediaInfoSection}>
                  <h1>{value.title}</h1>
                  <div className={style.title}>
                    <span>{value?.attributes?.[0]?.title} :</span>
                    <span>{value?.attributes?.[0]?.description}</span>
                  </div>

                  <div className={style.icons}>
                    <span>Eshtuv</span>
                    <span style={{ cursor: value?.audios && "not-allowed" }}>
                      <BsMic style={{ marginTop: "3px" }} />
                    </span>

                    <span>Surat</span>
                    <span style={{ cursor: value?.galleries && "not-allowed" }}>
                      <BiImages style={{ marginTop: "3px" }} />
                    </span>

                    <span>Matn</span>
                    <span style={{ cursor: value?.audios && "not-allowed" }}>
                      <BsFillChatTextFill style={{ marginTop: "3px" }} />
                    </span>

                    <span>Xarita</span>
                    <span style={{ cursor: value?.locations && "not-allowed" }}>
                      <LiaGlobeAmericasSolid style={{ marginTop: "3px" }} />
                    </span>

                    <span>3D</span>
                    <span style={{ cursor: value?.audios && "not-allowed" }}>
                      <LuRotate3D style={{ marginTop: "3px" }} />
                    </span>

                    <span>Ko'ruv</span>
                    <span style={{ cursor: value?.videos && "not-allowed" }}>
                      <AiOutlineEye
                        style={{ fontSize: "22px", marginTop: "3px" }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 style={{ color: "white", textAlign: "center", marginTop: "15%" }}>
          <button onClick={() => navigate(-1)}>
            <FaArrowLeftLong />
          </button>
          {data?.data?.category} bo'limida bunday ma'lumotlar yo'q ekan 😔😔
        </h1>
      )}

      {data?.data?.resources?.results.length > 0 && (
        <ReactPaginate
          previousLabel={<TbPlayerTrackPrevFilled />}
          nextLabel={<TbPlayerTrackNextFilled />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={style.pagination}
          activeClassName={style.active}
        />
      )}
    </div>
  );
}

export default HomeImageDetail;

// Salom Kamoliddin
