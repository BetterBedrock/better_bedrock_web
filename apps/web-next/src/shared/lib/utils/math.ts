export const calculateItemDisplayWeight = (itemWeight: number) => {
    return itemWeight <= 0.1 ? "<0.0" : itemWeight.toFixed(1);
};