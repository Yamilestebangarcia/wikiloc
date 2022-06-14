function UseFetchLoading(url, data, setLoading, setErr) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      setLoading(false);

      if (res.err) {
        setErr(res.err);
      } else {
        return res;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function useFetchRegister(url, data, setLoading, setErr) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.status);
      if (!res.ok) {
        return res.json();
      } else {
        return undefined;
      }
    })
    .then((res) => {
      setLoading(false);
      //true envia y err err:email ya usado
      if (res !== undefined) {
        setErr(res.err);

        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}
function useFetchResetPass(url, data, setErr) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.status);
      if (!res.ok) {
        return res.json();
      } else {
        return undefined;
      }
    })
    .then((res) => {
      if (res !== undefined) {
        setErr(res.err);

        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function useFetchDeleteUSer(url, data, setLoading, setErr) {
  return fetch(url, {
    method: "DElETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.status);
      if (!res.ok) {
        return res.json();
      } else {
        return undefined;
      }
    })
    .then((res) => {
      setLoading(false);
      //true envia y err err:email ya usado
      if (res !== undefined) {
        setErr(res.err);

        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}
function useFetchDeleteVerificate(url, method, token, setSuccess, setErr) {
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("error");
      if (res.status === 200) {
        return setSuccess(msgSuccess);
      }
    })
    .catch((err) => {
      console.log(err);
      setErr(msgErr);
    });
}

function useFetchIndexApp(url, data, setLoading) {
  setLoading(true);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.status);
      if (res.status === 401) {
        return false;
      }
      return res.json();
    })
    .then((res) => {
      setLoading(false);
      if (res === false) {
        return false;
      }
      return res;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
function useFetchFollow(url, data, setLoading, setErr) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status !== 200) {
        if (res.status === 401) {
          return false;
        }
        setErr(res.err);
      }
      return res.text();
    })
    .then((res) => {
      if (res === false) {
        return false;
      }

      return new window.DOMParser().parseFromString(res, "text/xml");
    })
    .then((res) => {
      if (res === false) {
        return false;
      }
      setLoading(false);
      return res;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function useFechtSeeMap(url, data, setErr, setRuteData) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status !== 200) {
        return false;
      }
      return res.json();
    })
    .then((res) => {
      if (res === false) {
        return false;
      }
      if (res.err) {
        setErr(res.err);
        return false;
      } else {
        return res;
      }
    })
    .catch((err) => {
      setRuteData(null);
    });
}

export {
  UseFetchLoading,
  useFetchRegister,
  useFetchResetPass,
  useFetchDeleteUSer,
  useFetchDeleteVerificate,
  useFetchIndexApp,
  useFetchFollow,
  useFechtSeeMap,
};
