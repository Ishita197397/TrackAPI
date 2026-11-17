
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/react";

function App() {
  const { getToken } = useAuth();

  async function testBackend() {
    try {
      const token = await getToken();

      const response = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Backend request failed:", error);
    }
  }

  async function syncUser() {
    try {
      const token = await getToken();

      const response = await fetch("http://localhost:3000/api/auth/sync", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("User sync failed:", error);
    }
  }

  async function testMyProfile() {
    try {
      const token = await getToken();

      const response = await fetch(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Profile request failed:", error);
    }
  }

  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>

        <Show when="signed-in">
          <UserButton />

          <button onClick={testBackend}>Test Backend</button>
          <button onClick={syncUser}>Sync User</button>
          <button onClick={testMyProfile}>Test My Profile</button>
        </Show>
      </header>
    </>
  );
}

export default App;
