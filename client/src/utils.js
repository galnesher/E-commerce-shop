export const baseUrl = 'http://localhost:5000'

export const formatCurrency = (price) => {
    return `$${price}`
};
export const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}



