import { useEffect } from "react";
import axios from "axios";
import { useActions, TOAST, MODAL } from "@sainui/context";

function ResponseInterceptors() {
  const action = useActions();

  useEffect(() => {
    axios.interceptors.response.handlers.map((handle, index) => axios.interceptors.response.eject(index));
    axios.interceptors.response.use(
      (response) => response,
      function (error) {
        action({
          type: TOAST,
          payload: {
            title: "درخواست انجام نشد",
            displayType: "danger",
            // autoClose: 10000,
            value: (error.response && error.response.data && error.response.data.title) || error.toString(),
          },
        });
        action({
          type: MODAL,
          payload: {
            visible: false,
          },
        });
        return Promise.reject(error);
      }
    );
  }, []);

  return "";
}

export default ResponseInterceptors;
