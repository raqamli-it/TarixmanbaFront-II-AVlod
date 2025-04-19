import NavbarLogoSlider from "../NavbarLogoSlider/NavbarLogoSlider";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

import axios from "axios";

import style from "./navbar.module.scss";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [data, setData] = useState([]);
  const [openLink, setOpenLink] = useState(false);
  const [openIcon, setOpenIcon] = useState(false);
  const getData = async () => {
    try {
      const respons = await axios.get("category-resource/");
      if (respons.status) {
        setData(respons.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getData();
    const handleScroll = () => {
      if (window.scrollY >= 69) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Header openIcon={openIcon} setOpenIcon={setOpenIcon} />
      <div
        className={style.navbar}
        style={{
          position: isScrolled && "fixed",
          top: "0",
        }}
      >
        <nav>
          <ul className={`${openIcon && style["openPanel"]}`}>
            <li>
              <div className={style.boxcontainer}>
                <button onClick={() => setOpenLink(!openLink)}>
                  Manbalar
                  <FaAngleDown
                    style={{
                      marginTop: "6px",
                    }}
                    className={openLink ? style.openicon : style.closeicon}
                  />
                </button>

                <div
                  // style={{ display: isScrolled ? "none" : "block" }}
                  className={openLink ? style.openBox : style.closeBox}
                >
                  <div className={style.links}>
                    {data
                      .sort((a, b) => a.order - b.order)
                      .map((links) => (
                        <Link
                          key={links.id}
                          to={`homeImageDetail/${links.id}`}
                          onClick={() => setOpenLink(false)}
                        >
                          <div className={style.link}>
                            <img src={links.icon} alt={links.title} />
                            <span style={{ marginLeft: "10px" }}>
                              {links.title}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Link to="/library">Kutubxona</Link>
            </li>
            <li>
              <Link to="/news">Yangiliklar</Link>
            </li>
            <li>
              <Link to="/about">Biz haqimizda</Link>
            </li>

            {/* <li>
              <div className={style.boxcontainer}>
                <button onClick={() => setOpenLink(!openLink)}>
                  Manbalar
                  <FaAngleDown
                    style={{
                      marginTop: "6px",
                    }}
                    className={openLink ? style.openicon : style.closeicon}
                  />
                </button>

                <div
                  // style={{ display: isScrolled ? "none" : "block" }}
                  className={openLink ? style.openBox : style.closeBox}
                >
                  <div className={style.links}>
                    {data
                      .sort((a, b) => a.order - b.order)
                      .map((links) => (
                        <Link
                          key={links.id}
                          to={`homeImageDetail/${links.id}`}
                          onClick={() => setOpenLink(false)}
                        >
                          <div className={style.link}>
                            <img src={links.icon} alt={links.title} />
                            <span style={{ marginLeft: "10px" }}>
                              {links.title}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </li> */}
          </ul>
        </nav>

        <Marquee>
          <NavbarLogoSlider />
        </Marquee>
      </div>
    </div>
  );
}

export default Navbar;
