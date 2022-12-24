export default function authHeader() {
    const user = localStorage.getItem("user");
    return { "x-auth-token": user };
} 