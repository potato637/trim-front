const BASE_URL = "http://localhost:8080";

export const hotAPI = {
  question_hot: async () => {
    const url = `${BASE_URL}/api/questions/hot-issue`;
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
    const url = `${BASE_URL}/api/knowledge/hot-issue`;
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
    const url = `${BASE_URL}/api/free-talks/hot-issue`;
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
    const url = `${BASE_URL}/api/questions/search?${
      majorType ? `majorType=${majorType}&` : ""
    }${
      tags.length != 0 ? `keyword=${urlParams}&` : ""
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
    const url = `${BASE_URL}/api/knowledge/search?${
      majorType ? `majorType=${majorType}&` : ""
    }${
      tags.length != 0 ? `keyword=${urlParams}&` : ""
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
    const url = `${BASE_URL}/api/free-talks/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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
    const url = `${BASE_URL}/api/survey/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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
  question: async ({ title, content, majorType, tags, memberID = 1 }) => {
    const url = `${BASE_URL}/api/questions/members/${memberID}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
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

  knowledge: async ({ title, content, majorType, tags, memberID = 1 }) => {
    const url = `${BASE_URL}/api/knowledge/members/${memberID}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
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

  community: async ({ title, content, memberID = 1 }) => {
    const url = `${BASE_URL}/api/free-talks/members/${memberID}`;
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
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
};

export const singleAPI = {
  question: async ({ id }) => {
    const url = `${BASE_URL}/api/questions/${id}`;
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
    const url = `${BASE_URL}/api/knowledge/${id}`;
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
    const url = `${BASE_URL}/api/free-talks/${id}`;
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
