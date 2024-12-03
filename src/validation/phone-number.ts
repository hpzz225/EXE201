export const phoneValidate = (phone: string) => {
    const regex =
        /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

    return regex.test(phone);
};
