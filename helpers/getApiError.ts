import axios from "axios";

export function getApiError(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return {
      title: "Something went wrong",
      message: "An unexpected error occurred.",
    };
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return {
      title: "Request timed out",
      message: "The server took too long to respond. Please try again.",
    };
  }

  if (error.response?.status === 404) {
    return {
      title: "Not found",
      message: "The requested resource could not be found.",
    };
  }

  if (error.response?.status === 500) {
    return {
      title: "Server error",
      message: "Something went wrong on the server.",
    };
  }

  return {
    title: "Something went wrong",
    message: "We couldn't load the data. Please try again.",
  };
}
