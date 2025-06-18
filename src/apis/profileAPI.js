import axios from "axios";

const profileAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getMouth = async () => {
  try {
    const { data } = await profileAPI.get("/api/access/avatar/mouth-parts");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getEyes = async () => {
  try {
    const { data } = await profileAPI.get("/api/access/avatar/eyes-parts");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getCloth = async ({ color }) => {
  try {
    const { data } = await profileAPI.get("/api/access/avatar/cloth-parts", {
      params: { color },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getHair = async ({ color }) => {
  try {
    const { data } = await profileAPI.get("/api/access/avatar/hair-parts", {
      params: { color },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getProfile = async () => {
  try {
    const { data } = await profileAPI.get("/api/access/profile");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
  }
};

export const getBadge = async () => {
  try {
    const { data } = await profileAPI.get("/api/access/badge");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
  }
};
