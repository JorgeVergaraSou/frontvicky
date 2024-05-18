// Define an interface for the context
export interface UserContextType {
  user: User | null
  handleLogin: (loggedInUser: User) => void
  handleLogout: () => void
}