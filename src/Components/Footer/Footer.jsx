import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInternetExplorer } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import style from "./footer.module.scss";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className={style["footer-container"]}>
      <div className={style.footer}>
        <div>
          <div className={style.phone}>
            <FaPhoneAlt />
            <a href="tel:+998712335470">(+998 71) 233-54-70</a>
          </div>

          <div className={style.sayt}>
            <FaInternetExplorer />
            <a href="https://fati.uz">Fati.uz</a>
          </div>
        </div>

        <div className={style.footerPage}>
          <Link to="/library">Kutubxona</Link>
          <Link to="/news">Yangiliklar</Link>
          <Link to="/about">Biz haqimizda</Link>
        </div>

        <div className={style.contacts}>
          <p>
            <a href="#">
              <FaInstagram style={{ fontSize: "23px" }} />
            </a>
          </p>
          <p>
            <a href="#">
              <FaFacebookF style={{ fontSize: "20px" }} />
            </a>
          </p>
          <p>
            <a href="#">
              <PiTelegramLogo style={{ fontSize: "23px" }} />
            </a>
          </p>
          <p>
            <a href="3">
              <FaXTwitter style={{ fontSize: "20px" }} />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
