import { getCookieValue } from "../utils";

const BASE_URL = "http://localhost:8080";

export const hotAPI = {
  question_hot: async () => {
    const url = `${BASE_URL}/api/access/questions/hot-issue`;
    const options = {
      method: "GET",
      headers: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch questions hot-issue`);
    }

    return response.json();
  },
  knowledge_hot: async () => {
    const url = `${BASE_URL}/api/access/knowledge/hot-issue`;
    const options = {
      method: "GET",
      headers: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch knowledge hot-issue`);
    }

    return response.json();
  },
  community_hot: async () => {
    const url = `${BASE_URL}/api/access/free-talks/hot-issue`;
    const options = {
      method: "GET",
      headers: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch community hot-issue`);
    }

    return response.json();
  },
  survey_hot: async () => {},
};

export const datasAPI = {
  question: async ({ majorType, tags, currentPage, pageSize = 30 }) => {
    const urlParams = tags?.join(",");
    const url = `${BASE_URL}/api/access/questions/search?${
      majorType ? `majorType=${majorType}&` : ""
    }${
      tags.length !== 0 ? `keyword=${urlParams}&` : ""
    }currentPage=${currentPage}&pageSize=${pageSize}`;
    const options = {
      method: "GET",
      headers: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  knowledge: async ({ majorType, tags, currentPage, pageSize = 30 }) => {
    const urlParams = tags?.join(",");
    const url = `${BASE_URL}/api/access/knowledge/search?${
      majorType ? `majorType=${majorType}&` : ""
    }${
      tags.length !== 0 ? `keyword=${urlParams}&` : ""
    }currentPage=${currentPage}&pageSize=${pageSize}`;
    const options = {
      method: "GET",
      headers: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  community: async ({ currentPage, pageSize = 30 }) => {
    const url = `${BASE_URL}/api/access/free-talks/page?currentPage=${currentPage}&pageSize=${pageSize}`;
    const options = {
      method: "GET",
      headers: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  survey: async ({ currentPage, pageSize = 30 }) => {
    const url = `${BASE_URL}/api/access/survey/page?currentPage=${currentPage}&pageSize=${pageSize}`;
    const options = {
      method: "GET",
      headers: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
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
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  comment: async ({ id, content }) => {
    const url = `${BASE_URL}/api/comments/boards/${id}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookieValue("accessToken")}`,
      },
      body: JSON.stringify({
        content,
      }),
      credentials: "include",
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
      credentials: "include",
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
    const url = `${BASE_URL}/api/access/questions/${id}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  knowledge: async ({ id }) => {
    const url = `${BASE_URL}/api/access/knowledge/${id}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  community: async ({ id }) => {
    const url = `${BASE_URL}/api/access/free-talks/${id}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  comment: async ({ id }) => {
    const url = `${BASE_URL}/api/access/comments/${id}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },

  like: async ({ id }) => {
    const url = `${BASE_URL}/api/access/likes/boards/${id}`;
    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  },
};
