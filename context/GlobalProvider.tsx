import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/interface/IUser";
import { getUser, signin, signup, deleteAccount, getCoinInApp, postCoinInApp } from "@/service/auth";
import signIn from "@/app/(auth)/signIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { Alert } from "react-native";
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-5372862349743986/5907113661';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});


interface GlobalContextType {
  handleSignIn: (formData: any) => void;
  handleSignUp: (formData: any, checkTerms: boolean) => void;
  handleSignOut: () => void;
  handleDeleteAccount: (formData: any) => void;
  handleShowAds: () => void;
  handleSetCount: (num: number) => void;
  // handleSetUser: (user: IUser) => void;
  handleUpdateCoin: (user: IUser, number: number) => void;
  user: IUser;
  count: number;
  isLoading: boolean;
}

export const GlobalContext = createContext<GlobalContextType>({
  handleSignIn: () => { },
  handleSignUp: () => { },
  handleSignOut: () => { },
  handleDeleteAccount: () => { },
  handleShowAds: () => { },
  handleSetCount: () => { },
  // handleSetUser: () => { },
  handleUpdateCoin: () => { },
  user: {
    device_register: "",
    email: "",
    id_user: 0,
    ip_register: "",
    link_avatar: "",
    token: "",
    user_name: "",
    time_coin: 0,
  },
  count: 0,
  isLoading: false,
});
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | any>();
  const [loadAds, setLoadAds] = useState(false);
  const [count, setCount] = useState(0);

  const handleSignIn = async (data: {
    email_or_username: "";
    password: "";
  }) => {
    // console.log('click');
    setIsLoading(true);
    if (data.email_or_username !== "" && data.password !== "") {
      try {
        const formData = new FormData();
        formData.append("email_or_username", data.email_or_username);
        formData.append("password", data.password);
        // console.log(formData);

        const result = await signin(formData);
        // console.log(result.data.messages);
        if (result.data.message === "Success Login Account") {
          // console.log(result.data);
          setUser(result.data);
          // setIsLoading(false);
          await AsyncStorage.setItem("user", JSON.stringify(result.data));
          router.navigate('/(home)');
          Alert.alert("Message", result.data.message);
          setIsLoading(false);
          return;
        }
        console.log(result.data.message);
        Alert.alert("Error", result.data.message);
        setIsLoading(false);

      } catch (err) {
        // console.log(err);
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
    confirm_password: "",
    ip_register: "";
    device_register: "";
    link_avatar: "";
  }, checkTerms: boolean) => {
    if (checkTerms === false) {
      alert("Please agree with terms and conditions!");
      setIsLoading(false);
      return;
    }
    if (data.email === "" || data.password === "" || data.user_name === "" || data.confirm_password !== data.password) {
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
      const result = await signup(formData);
      if (result.data.message) {
        alert(result.data.message);
        setIsLoading(false);
        return;
      }
      setUser(result.data);
      setIsLoading(false);
      await AsyncStorage.setItem("user", JSON.stringify(result.data));
      router.navigate('/(home)');

    }
  };

  const handleSignOut = () => {
    setUser(null);
    AsyncStorage.removeItem("user");
    router.navigate('/(home)');
  }

  const handleDeleteAccount = async (password: string) => {
    if (password === "") {
      alert("Please enter your password");
      return;
    }

    const formData = new FormData();
    formData.append("password", password);
    const result = await deleteAccount(formData, user);
    console.log(result);
    if (result.data.message) {
      alert(result.data.message);
      return;
    }
    alert("Delete account success");
    setUser(null);
    AsyncStorage.removeItem("user");
    router.navigate('/(home)');

  }

  const handleShowAds = () => {
    if (loadAds) {
      interstitial.show();
    }
  }

  useEffect(() => {

    AsyncStorage.getItem("user").then((data) => {
      if (data) {
        setUser(JSON.parse(data));
      }
    });

    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoadAds(true);
    });

    const unsubscribe2 = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoadAds(false);
      interstitial.load();

    })

    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  const handleSetCount = (num: number) => {
    setCount(num);
  }

  // const handleSetUser = (user: IUser) => {
  //   setUser(user);
  // }

  const handleUpdateCoin = async (user: IUser, number: number) => {
    try{
        const formData = new FormData();
        formData.append("coin_number", number?.toString());
        formData.append("user_id", user.id_user.toString());
        const {data} = await postCoinInApp(formData, user);
    } catch(err) {
        console.log(err);
    }
}



  return (
    <GlobalContext.Provider
      value={{
        handleSignIn,
        handleSignUp,
        handleSignOut,
        handleDeleteAccount,
        handleShowAds,
        handleSetCount,
        // handleSetUser,
        handleUpdateCoin,
        count,
        isLoading,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
