import { useAuth } from "../hooks/useAuth";
import { Button } from "./ds/Button";

export default function LoginButton() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) return null;

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "var(--text-on-dark-2)",
          textTransform: "uppercase",
        }}>
          {user.user_metadata?.name ?? user.email}
        </span>
        <Button variant="outline" size="sm" onDark onClick={signOut}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="sm" onDark onClick={signInWithGoogle}>
      Sign In
    </Button>
  );
}
