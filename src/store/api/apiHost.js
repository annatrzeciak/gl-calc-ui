import * as Auth from "./auth";


export const authenticationHeader = () => {
  return {
    Authorization: `Bearer ${Auth.getAccessToken()}`
  };
};
