// Primeiro, defina um enum para o UserRole, se necessário.
enum UserRole {
    ADMIN,
    USER 
}
 
export interface User {
    id: number;  
    username: string;
    password: string;
    email: string;
    role: UserRole;
}
