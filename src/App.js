
import React, { useEffect, useState,Fragment } from "react";

import DefaultPageWeb from "./component/views/DefaultPageWeb.view";
import { Route, Navigate , Routes} from "react-router-dom";
import { isJsonString } from "./utils";
import * as UserServices from "./services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { updateUser } from "./redux/slide/userSlide";
import { routes } from "./routes";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // const fetchApi = async () => {
  //   const res = await ProductServices.getAllProduct()
  //   return res.data;
  // };

  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });

  useEffect(() => {
    setLoading(true);
    // Xữ lý token hết hạn
    const { storageData, decode } = handleDecoded();
    console.log("decodeAPPP", decode);
    if (decode?.user_id) {
      handleGetDetailsUser(decode?.user_id, storageData);
    }
    setLoading(false);
  }, []);
// giải mã đoạn code token trong localStorage
  const handleDecoded = () => {
    // Xữ lý token hết hạn
    let storageData = localStorage.getItem("access_token");
    console.log("storageData", storageData);
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }
    return { storageData, decode };
  };

  UserServices.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentime = new Date();
      const { storageData, decode } = handleDecoded();

      console.log("decodeAPPP", decode);

      if (decode?.exp < currentime.getTime() / 1000) {
        const data = await UserServices.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetaisUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };


  return (
    <div>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.page;
          const Layout = route?.isShowHeader ? DefaultPageWeb : Fragment;
          return (
            <Route
              key={route?.path}
              path={route?.path}
              element={
                <Layout>
                  {" "}
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
