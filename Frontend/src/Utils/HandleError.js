export const errorHandler = (error) => {
  let errorMessage = "An unknown error occurred";
  if (error.response) {
    const errorData = error.response.data;

    if (typeof errorData === "string") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(errorData, "text/html");
      const errorPre = doc.querySelector("pre");
      errorMessage = errorPre
        ? errorPre.textContent.replace("Error:", "").trim()
        : "An unknown error occurred";
    } else if (errorData.error && errorData.error.message) {
      errorMessage = errorData.error.message;
    }
  } else if (error.request) {
    errorMessage = "No response from server";
  } else {
    errorMessage = error.message;
  }
  alert(`Axios error: ${errorMessage.split("at")[0]}`);
};
