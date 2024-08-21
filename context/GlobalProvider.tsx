import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/interface/IUser";
import { getUser, signin, signup } from "@/service/auth";
import signIn from "@/app/(auth)/sign-in";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GlobalContextType {
  handleSignIn: (formData: any) => void;
  handleSignUp: (formData: any) => void;
  user: IUser;
  isLoading: boolean;
}

export const GlobalContext = createContext<GlobalContextType>({
  handleSignIn: () => {},
  handleSignUp: () => {},
  user: {
    device_register: "",
    email: "",
    id_user: 0,
    ip_register: "",
    link_avatar: "",
    token: "",
    user_name: "",
  },
  isLoading: false,
});
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | any>();
  const handleSignIn = async (data: {
    email_or_username: "";
    password: "";
  }) => {
    setIsLoading(true);
    if (data.email_or_username !== "" && data.password !== "") {
      try {
        const formData = new FormData();
        formData.append("email_or_username", data.email_or_username);
        formData.append("password", data.password);
        // console.log(formData);

        await signin(formData)
          .then((res) => {
            console.log(res.data);
            setUser(res.data);
            AsyncStorage.setItem("user", JSON.stringify(res.data));
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    } else {
      alert("missing email or password!");
      setIsLoading(false);
    }
  };

  const handleSignUp = async (data: {
    user_name: "";
    email: "";
    password: "";
    confirm_password:"",
    ip_register: "";
    device_register: "";
    link_avatar: "";
  }) => {
    if (data.email === "" || data.password === "" || data.user_name === ""|| data.confirm_password !== data.password) {
      alert("Please confirm all field or confirm password is incorrect!");
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("user_name", data.user_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("ip_register", data.ip_register);
      formData.append("device_register", data.device_register);
      formData.append(
        "link_avatar",
        `https://a0.anyrgb.com/pngimg/1236/14/no-facial-features-no-avatar-no-eyes-expressionless-avatar-icon-delayering-avatar-user-avatar-men-head-portrait-thumbnail.png?fbclid=IwAR3IUCAOlBSThvKijmWXmNuZk-6oEe1q6k-oGQXGr_zd1zWixMIUfAaAyfw`
      );
      await signup(formData)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          AsyncStorage.setItem("user", JSON.stringify(res.data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        user,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
