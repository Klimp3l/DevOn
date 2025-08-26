import { object, string } from "zod";

export const signInSchema = object({
    login: string({ message: "User name is required" }).min(
        1,
        "User name is required"
    ),
    password: string({ message: "Password is required" })
        .min(1, "Password is required")
});

export const registerSchema = object({
    name: string({ message: "Name is required" }).min(
        1,
        "Name is required"
    ),
    email: string({ message: "Email is required" }).email(
        "Invalid email format"
    ),
    login: string({ message: "User name is required" }).min(
        1,
        "User name is required"
    ),
    password: string({ message: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be less than 32 characters"),
    confirmPassword: string({ message: "Password confirmation is required" })
        .min(1, "Password confirmation is required"),
});
