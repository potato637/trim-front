import axios from "axios";

const auth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getInfo = async ({ code, provider }) => {
  try {
    const { data } = await auth.get(`/api/access/oauth/${provider}/user-info`, {
      params: {
        code,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error(`An unexpected error occurred`);
  }
};

export const signIn = async ({ email, provider }) => {
  try {
    const { data } = await auth.get(`/api/access/oauth/login`, {
      params: {
        email,
        socialType: provider,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error(`An unexpected error occurred`);
  }
};

export const signUp = async ({ email, provider }) => {
  try {
    const { data } = await auth.post("/api/access/oauth/sign-up", {
      email,
      oauthProvider: provider,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error(`An unexpected error occurred`);
  }
};
