import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import decodeToken from "../utils/decodeToken";
import useRemoteUser from "../hooks/useRemoteUser";

import HeaderBackTitle from "../components/HeaderBackTitle";
import MenuBar from "../components/MenuBar";
import UserDataMyProfile from "../components/UserDataMyProfile";
import UserMenuMyProfile from "../components/UserMenuMyProfile";
import UserData from "../components/UserData";
import UserMenu from "../components/UserMenu";

const UserPage = (props) => {
  const [user] = useRemoteUser();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeToken(token);

  let userData;
  user.data
    ? (userData = user.data[0])
    : (userData = "cargando datos de usuario");

  return (
    <>
      {decodedToken ? (
        decodedToken.id === userData.id ? (
          <>
            <HeaderBackTitle />
            <UserDataMyProfile user={userData} />
            <UserMenuMyProfile user={userData} />
            <MenuBar />
          </>
        ) : (
          <>
            <HeaderBackTitle />
            <UserData user={userData} />
            <UserMenu />
            <MenuBar />
          </>
        )
      ) : (
        <>
          <HeaderBackTitle />
          <UserData user={userData} />
          <UserMenu />
          <MenuBar />
        </>
      )}
    </>
  );
};
export default UserPage;
