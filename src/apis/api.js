import axios from "axios";
import { getCookieValue } from "../utils";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
const api_secure = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
api_secure.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originReqeust = error.config;

    if (error.response.status === 500 && !originReqeust._retry) {
      originReqeust._retry = true;

      try {
        const refreshToken = getCookieValue("refreshToken");
        const newToken = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/access/oauth/reissue`,
          {},
          {
            params: { refreshToken },
          }
        );
        const newAccessToken = newToken.data.result.accessToken;
        const newRefreshToken = newToken.data.result.refreshToken;

        Cookies.set("accessToken", newAccessToken, {
          path: "/",
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
        Cookies.set("refreshToken", newRefreshToken, {
          path: "/",
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
        originReqeust.headers.Authorization = `Bearer ${newAccessToken}`;
        return api_secure(originReqeust);
      } catch (refreshError) {
        return Promise.reject("refreshToken is invalid");
      }
    }

    return Promise.reject(error);
  }
);

export const hotAPI = {
  question_hot: async () => {
    try {
      const { data } = await api.get("/api/access/questions/hot-issue");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error! Status: ${error.response.status}`);
      }
      throw new Error("An unexpected error occurred");
    }
  },
  knowledge_hot: async () => {
    try {
      const { data } = await api.get("/api/access/knowledge/hot-issue");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error! Status: ${error.response.status}`);
      }
      throw new Error("An unexpected error occurred");
    }
  },
  community_hot: async () => {
    try {
      const { data } = await api.get("/api/access/free-talks/hot-issue");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error! Status: ${error.response.status}`);
      }
      throw new Error("An unexpected error occurred");
    }
  },
  survey_hot: async () => {},
};

export const datasAPI = {
  question: async ({ majorType, tags, currentPage, pageSize = 30 }) => {
    try {
      const urlParams = tags?.join(",");
      const { data } = await api.get(`/api/access/questions/search`, {
        params: {
          ...(majorType ? { majorType } : {}),
          ...(tags?.length ? { keyword: urlParams } : {}),
          currentPage,
          pageSize,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  knowledge: async ({ majorType, tags, currentPage, pageSize = 30 }) => {
    try {
      const urlParams = tags?.join(",");
      const { data } = await api.get(`/api/access/knowledge/search`, {
        params: {
          ...(majorType ? { majorType } : {}),
          ...(tags?.length ? { keyword: urlParams } : {}),
          currentPage,
          pageSize,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  community: async ({ currentPage, pageSize = 30 }) => {
    try {
      const { data } = await api.get("/api/access/free-talks/page", {
        params: {
          currentPage,
          pageSize,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  survey: async ({ currentPage, pageSize = 30 }) => {
    try {
      const { data } = await api.get("/api/access/survey/page", {
        params: {
          currentPage,
          pageSize,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },
};

export const postAPI = {
  question: async ({ title, content, majorType, tags }) => {
    const response = await api_secure.post(
      "/api/questions",
      {
        title,
        content,
        majorType,
        tags,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );

    return response.data;
  },

  question_answer: async ({ id, content }) => {
    console.log("api calls");
    const response = await api_secure.post(
      `/api/answers/questions/${id}`,
      {
        content,
      },
      { headers: { Authorization: `Bearer ${getCookieValue("accessToken")}` } }
    );
  },

  knowledge: async ({ title, content, majorType, tags }) => {
    const response = await api_secure.post(
      "/api/knowledge",
      {
        title,
        content,
        majorType,
        tags,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );

    return response.data;
  },

  community: async ({ title, content }) => {
    const response = await api_secure.post(
      "/api/free-talks",
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );

    return response.data;
  },

  comment: async ({ id, content }) => {
    console.log(id, content);
    const response = await api_secure.post(
      `/api/comments/boards/${id}`,
      {},
      {
        params: {
          content,
        },
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );

    return response.data;
  },

  reComment: async ({ id, content }) => {
    const response = await api_secure.post(
      `/api/replies/comments/${id}`,
      {},
      {
        params: { content },
        headers: { Authorization: `Bearer ${getCookieValue("accessToken")}` },
      }
    );

    return response.data;
  },

  like: async ({ id }) => {
    const response = await api_secure.post(
      `/api/likes/boards/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookieValue("accessToken")}`,
        },
      }
    );

    return response.data;
  },
};

export const singleAPI = {
  question: async ({ id }) => {
    try {
      const { data } = await api.get(`/api/access/questions/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  knowledge: async ({ id }) => {
    try {
      const { data } = await api.get(`/api/access/knowledge/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  community: async ({ id }) => {
    try {
      const { data } = await api.get(`/api/access/free-talks/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  comment: async ({ id }) => {
    try {
      const { data } = await api.get(`/api/access/comments/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  reComment: async ({ id }) => {
    try {
      const { data } = await api.get(`/api/access/replies/comments/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },

  like: async ({ id }) => {
    try {
      const { data } = await api.get(`/api/access/likes/boards/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },
};
