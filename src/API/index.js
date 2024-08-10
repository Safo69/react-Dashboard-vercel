export const getOrders = async () => {
    try {
        const res = await fetch('https://dummyjson.com/carts/1');
        const data = await res.json();
        console.log(data); // Inspect the structure of the response
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const getRevenue = async () => {
    try {
        const res = await fetch('https://dummyjson.com/carts');
        const data = await res.json();
        console.log("Revenue API response:", data); // Log the full response for debugging
        return data;
    } catch (error) {
        console.error("Error fetching revenue:", error);
        throw error;
    }
};

export const getInventory = async () => {
    try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        console.log(data); // Log the inventory data
        return data;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return null;
    }
};

export const getOrders1 = async () => {
    try {
        const res = await fetch('https://dummyjson.com/carts/1');
        const data = await res.json();
        console.log("Fetched Data:", data); // Log the data to ensure correctness
        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { products: [] }; // Ensure a default value is returned
    } 
};

export const getCustomers = async () => {
    try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        console.log("Customers Data:", data); // Log the customer data
        return data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        return null; // Return null in case of error to avoid undefined values
    }
};

export const getComment = async () => {
    try {
        const res = await fetch('https://dummyjson.com/comments');
        const data = await res.json();
        console.log("Comment Data:", data); 
        return data;
    } catch (error) {
        console.error("Error fetching Comment:", error);
        return null; 
    }
};