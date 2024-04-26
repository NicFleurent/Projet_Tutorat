import * as SecureStore from "../api/SecureStore";

const FIRST_OPEN_KEY = "first_open";
const USER_INFO_KEY = "user_info";

const getUserInfo = async () => {
  const userInfo = await SecureStore.getValue(USER_INFO_KEY);
  if (userInfo == undefined) {
    return null;
  } else {
    return JSON.parse(userInfo);
  }
};

export function navigateToNextScreen(navigation) {
  setTimeout(() => {
    navigation.replace("Onboarding01");
  }, 3000);
}

export const appRedirect = async (navigation) => {
  try {
    let firstOpenValue = await SecureStore.getValue(FIRST_OPEN_KEY);

    if (!firstOpenValue) {
      const firstOpenJson = {
        first_open: false,
      };
      SecureStore.save(FIRST_OPEN_KEY, JSON.stringify(firstOpenJson));
      navigateToNextScreen(navigation);
    } else {
      let firstOpen = JSON.parse(firstOpenValue);

      if (firstOpen === null) {
        const firstOpenJson = {
          first_open: false,
        };
        SecureStore.save(FIRST_OPEN_KEY, JSON.stringify(firstOpenJson));
        navigateToNextScreen(navigation);
      } else {
        const userInfo = await getUserInfo();
        if (userInfo === null) {
          navigation.reset({ index: 0, routes: [{ name: "AuthChoice" }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: "TabsNavigation" }] });
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export default appRedirect;
