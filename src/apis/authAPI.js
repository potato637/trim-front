const BASE_URL = "http://localhost:8080";

export const getInfo = async ({ code, provider }) => {
  console.log(code);
  const url = `${BASE_URL}/api/access/oauth/${provider}/user-info?code=${code}`;
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
};

export const signIn = async ({ email, provider }) => {
  const url = `${BASE_URL}/api/access/oauth/login?email=${email}&socialType=${provider}`;
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
};

export const signUp = async ({ email, provider }) => {
  const url = `${BASE_URL}/api/access/oauth/sign-up`;
  const options = {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      oauthProvider: provider,
    }),
  };
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
