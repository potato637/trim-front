const BASE_URL = "http://localhost:8080";

export const hotAPI = {
  question_hot: async () => {
    const url = `${BASE_URL}/api/questions/hot-issue`;
    const options = {
      method: "GET",
      header: {},
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
      header: {},
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
      header: {},
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
  question: async ({ currentPage, pageSize = 30 }) => {
    const url = `${BASE_URL}/api/questions/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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
    const url = `${BASE_URL}/api/free-talks/page?currentPage=${currentPage}&pageSize=${pageSize}`;
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
