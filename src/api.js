const BASE_URL = "http://localhost:8080";

export const datasAPI = {
  hot: async ({ currentTab }) => {},

  all: async ({ currentPage }) => {
    const url = `${BASE_URL}/api/boards?currentPage=${currentPage}&pageSize=30`;
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

  question: async ({ currentPage }) => {
    const url = `${BASE_URL}/questions/page?currentPage=${currentPage}&pageSize=30`;
    const options = {
      method: "GET",
      header: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  },

  knowledge: async ({ currentPage }) => {
    const url = `${BASE_URL}/api/knowledge/page?currentPage=${currentPage}&pageSize=30`;
    const options = {
      method: "GET",
      header: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }
  },

  community: async ({ currentPage }) => {
    const url = `${BASE_URL}/api/community/page?currentPage=${currentPage}&pageSize=30`;
    const options = {
      method: "GET",
      header: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }
  },

  survey: async ({ currentPage }) => {
    const url = `${BASE_URL}/api/survey/page?currentPage=${currentPage}&pageSize=30`;
    const options = {
      method: "GET",
      header: {},
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch boards: ${response.status} ${response.statusText}`
      );
    }
  },
};
