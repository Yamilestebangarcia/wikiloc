import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchIndexApp } from "../../service/useFetch";

import Footer from "../../components/footer";
import Header from "../../components/header";
import PError from "../../components/pError";
import Spinner from "../../components/spinner";
import Select from "../../components/selectPagination";
import CardsIndex from "../../components/cardsIndex";
import Pagination from "../../components/pagination";

import styles from "./indexApp.module.css";

//control first useEffect
let isFirstRun = true;

function IndexApp() {
  //navegate and token
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //state
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();
  const [data, setData] = useState();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(1);

  //pagination Limit and Skip
  const changeLimit = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const nextPage = (e) => {
    if (e.target.id === "previous") {
      setSkip(data.skip - limit);
    } else {
      setSkip(data.skip + limit);
    }
  };

  //fecht inicial and limit
  useEffect(() => {
    useFetchIndexApp(
      "http://localhost:3001/app/index",
      { token: token, limit: limit },
      setLoading
    ).then((res) => {
      if (res) {
        if (res.err) {
          setErr("No se pudo conectar a la base de datos");
        }
        setData(res);
      } else {
        window.sessionStorage.removeItem("token");
        navigate("/");
        return () => {
          unmounted = true;
        };
      }
    });
    /*     setLoading(true);
    fetch("http://localhost:3001/app/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, limit: limit }),
    })
      .then((res) => {
        if (res.status === 401) {
          window.sessionStorage.removeItem("token");
          navigate("/");
          return () => {
            unmounted = true;
          };
        }
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        if (res.err) {
          console.log(res.err);
          setErr("No se pudo conectar a la base de datos");
        }

        setData(res);
      })
      .catch((err) => {
        console.log(err.message);
      }); */
  }, [limit]);

  //fecth new page
  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    useFetchIndexApp(
      "http://localhost:3001/app/index",
      { token: token, skip: skip, limit: limit },
      setLoading
    ).then((res) => {
      if (res) {
        if (res.err) {
          setErr("No se pudo conectar a la base de datos");
        }
        setData({ ...res, elements: data.elements });
      } else {
        window.sessionStorage.removeItem("token");
        navigate("/");
        return () => {
          unmounted = true;
        };
      }
    });
  }, [skip]);

  return (
    <>
      <Header close={close}></Header>
      <Select changeLimit={changeLimit} classNameC={styles.select} />
      <CardsIndex data={data} classNameC={styles.cards} />
      <PError err={err}></PError>
      <Spinner controlClass={loading}></Spinner>
      <Pagination
        classNameC={styles.controlerPage}
        data={data}
        nextPage={nextPage}
        limit={limit}
      />
      <Footer></Footer>
    </>
  );
}

export default IndexApp;
