import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AuthCredentials {
  username: string;
  password: string;
}

type AuthRole = "user" | "admin";

interface AuthUser {
  username: string;
  role: AuthRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "auth:user";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const loadStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.username || !parsed?.role) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadStoredUser());

  const persistUser = useCallback((nextUser: AuthUser | null) => {
    if (typeof window === "undefined") {
      return;
    }

    if (!nextUser) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const login = useCallback(
    async ({ username, password }: AuthCredentials) => {
      const trimmedUsername = username.trim();

      const normalizedUsername = trimmedUsername.toLowerCase();

      const credentialMatch: AuthUser | null =
        normalizedUsername === "user" && password === "user123"
          ? { username: trimmedUsername, role: "user" }
          : normalizedUsername === "admin" && password === "admin123"
            ? { username: trimmedUsername, role: "admin" }
            : null;

      if (credentialMatch) {
        const nextUser: AuthUser = credentialMatch;
        setUser(nextUser);
        persistUser(nextUser);
        return;
      }

      throw new Error("Username atau password salah");
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, [persistUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [login, logout, user]
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export default function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
