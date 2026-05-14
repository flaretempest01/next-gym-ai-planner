/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { TrainingPlan, User, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  plan: TrainingPlan | null;
  isLoading: boolean;
  saveProfile: (
    profile: Omit<UserProfile, "userId" | "updatedAt">,
  ) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRefreshingRef = useRef(false);

  // refreshData memoize
  const refreshData = useCallback(async () => {
    if (isRefreshingRef.current) return;

    isRefreshingRef.current = true;

    try {
      const result = await authClient.getSession();
      const currentUser = result?.data?.user ?? null;

      setNeonUser(currentUser);

      if (currentUser) {
        const planData = await api
          .getCurrentPlan(currentUser.id)
          .catch(() => null);
        if (planData) {
          setPlan({
            id: planData.id,
            userId: planData.userId,
            overview: planData.planJson.overview,
            weeklySchedule: planData.planJson.weeklySchedule,
            progression: planData.planJson.progression,
            version: planData.version,
            createdAt: planData.createdAt,
          });
        } else {
          setPlan(null);
        }
      } else {
        setPlan(null);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      isRefreshingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ) {
    if (!neonUser) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(neonUser.id, profileData);
    await refreshData();
  }

  async function generatePlan() {
    if (!neonUser) throw new Error("User must be authenticated");

    setIsLoading(true);
    try {
      await api.generatePlan(neonUser.id);
      await refreshData();
    } catch (err) {
      console.error("AI Generation failed", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        plan,
        isLoading,
        saveProfile,
        generatePlan,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
