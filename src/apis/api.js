import axios from "axios";
import { getCookieValue } from "../utils";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
const api_secure = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
// api_secure.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originReqeust = error.config;

//     if (error.response.status === 401 && !originReqeust._retry) {
//       originReqeust._retry = true;

//       try {
//         const refreshToken = getCookieValue("refreshToken");
//         const newAccessTokenResponse = await axios.post
//       }
//     }
//   }
// );

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
    const url = `${BASE_URL}/api/questions`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
      body: JSON.stringify({
        title,
        content,
        majorType,
        tags,
      }),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  knowledge: async ({ title, content, majorType, tags }) => {
    const url = `${BASE_URL}/api/knowledge`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
      body: JSON.stringify({
        title,
        content,
        majorType,
        tags,
      }),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  community: async ({ title, content }) => {
    const url = `${BASE_URL}/api/free-talks`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
      body: JSON.stringify({
        title,
        content,
      }),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  comment: async ({ id, content }) => {
    const url = `${BASE_URL}/api/comments/boards/${id}?content=${content}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  like: async ({ id }) => {
    const url = `${BASE_URL}/api/likes/boards/${id}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },
};

export const singleAPI = {
  question: async ({ id }) => {
    try {
      const { data } = api.get(`/api/access/questions/${id}`);
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
      const { data } = api.get(`/api/access/knowledge/${id}`);
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
      const { data } = api.get(`/api/access/free-talks/${id}`);
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
      const { data } = api.get(`/api/access/comments/${id}`);
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
      const { data } = api.get(`/api/access/likes/boards/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`HTTP error: Status: ${error.response.status}`);
      }
      throw new Error(`An unexpected error occurred`);
    }
  },
};
