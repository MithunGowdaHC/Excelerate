"use client"

import React, { ReactNode, useState, useEffect, createContext, useContext } from "react"

// ------------------------
// Types
// ------------------------
interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  imageUrl?: string
}

interface AuthContextType {
  user: User | null
  isSignedIn: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

// ------------------------
// Create context at the top!
export const AuthContext = createContext<AuthContextType | null>(null)

// ------------------------
// useAuth hook (simulated logic)
export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("excelerate_user")
    if (savedUser) setUser(JSON.parse(savedUser))
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    const mockUser: User = {
      id: "user_123",
      email,
      firstName: email.split("@")[0],
      imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    setUser(mockUser)
    localStorage.setItem("excelerate_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const signUp = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    const mockUser: User = {
      id: "user_" + Date.now(),
      email,
      firstName: email.split("@")[0],
      imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    setUser(mockUser)
    localStorage.setItem("excelerate_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const signOut = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    setUser(null)
    localStorage.removeItem("excelerate_user")
    setIsLoading(false)
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    const mockUser: User = {
      id: "google_user_123",
      email: "user@gmail.com",
      firstName: "John",
      lastName: "Doe",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
    }
    setUser(mockUser)
    localStorage.setItem("excelerate_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  return {
    user,
    isSignedIn: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  }
}

// ------------------------
// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

// ------------------------
// Custom hook to use context
export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuthContext must be used within AuthProvider")
  return context
}
