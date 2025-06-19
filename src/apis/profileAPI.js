import axios from "axios";
import { getCookieValue } from "../utils";

const profileAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getMouth = async () => {
  try {
    const { data } = await profileAPI.get(
      "/api/avatars/mouth-parts/possessed",
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const purchaseMouth = async ({ id }) => {
  try {
    const { data } = await profileAPI.post(
      `/api/avatars/mouths/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );
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
    const { data } = await profileAPI.get("/api/avatars/eyes-parts/possessed", {
      headers: {
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const purchaseEyes = async ({ id }) => {
  try {
    const { data } = await profileAPI.post(
      `/api/avatars/eyes/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );
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
    const { data } = await profileAPI.get(
      "/api/avatars/cloth-parts/possessed",
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
        params: { color },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const purchaseCloth = async ({ id }) => {
  try {
    const { data } = await profileAPI.post(
      `/api/avatars/cloths/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );
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
    const { data } = await profileAPI.get("/api/avatars/hair-parts/possessed", {
      headers: {
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
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

export const purchaseHair = async ({ id }) => {
  try {
    const { data } = await profileAPI.post(
      `/api/avatars/hairs/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );
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
    const { data } = await profileAPI.get("/api/members", {
      headers: {
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`HTTP error! Status: ${error.response.status}`);
    }
  }
};

export const updateProfile = async ({
  name,
  nickname,
  description,
  university,
  major,
}) => {
  try {
    const { data } = await profileAPI.patch(
      "/api/members",
      {
        name,
        nickname,
        description,
        university,
        major,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );
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
