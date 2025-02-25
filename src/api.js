const BASE_URL = "http://localhost:8080";

export const hotAPI = {
  question_hot: async () => {},
  knowledge_hot: async () => {},
  community_hot: async () => {},
  survey_hot: async () => {},
};

export const datasAPI = {
  question: async ({ currentPage, pageSize = 30 }) => {
    const url = `${BASE_URL}/questions/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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

  knowledge: async ({ currentPage, pageSize = 30 }) => {
    const url = `${BASE_URL}/api/knowledge/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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

  community: async ({ currentPage, pageSize = 30 }) => {
    const url = `${BASE_URL}/api/community/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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

  survey: async ({ currentPage, pageSize = 30 }) => {
    const url = `${BASE_URL}/api/survey/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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
};
