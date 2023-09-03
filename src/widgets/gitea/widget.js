import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/api/{endpoint}?access_token={key}",
  proxyHandler: genericProxyHandler,

  mappings: {
    notifications: {
      endpoint: "v1/notifications",
    },
    user: {
      endpoint: "v1/user",
    },
    repos: {
      endpoint: "v1/user/repos",
    }
  },
};

export default widget;
