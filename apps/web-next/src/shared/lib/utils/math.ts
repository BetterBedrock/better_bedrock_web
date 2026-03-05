export const calculateItemDisplayWeight = (itemWeight: number) => {
    return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
};

export const getCurrentPaginationPage = (page?: string[] | undefined) => {
    let currentPage = 1;

    if (page && page.length > 1 && page[0] === "page") {
        currentPage = parseInt(page[1], 10) || 1;
    }

    return currentPage;
};