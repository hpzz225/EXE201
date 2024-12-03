export const getAllOrders = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}api/Order/getAllOrders`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};
