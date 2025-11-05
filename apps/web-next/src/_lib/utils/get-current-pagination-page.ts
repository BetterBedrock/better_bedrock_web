export const getCurrentPaginationPage = (page?: string[] | undefined) => {
  let currentPage = 1;

  if (page && page.length > 1 && page[0] === "page") {
    currentPage = parseInt(page[1], 10) || 1;
  }
  
  return currentPage;
};
