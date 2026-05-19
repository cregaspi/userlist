import { Hero } from "@/components/Hero";
import { UsersList } from "@/components/UsersList";
import { User } from "@/types/user";

async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("https://apimocker.com/users", {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const response = await res.json();
    // API returns { data: [...], pagination: {...} }
    return Array.isArray(response) ? response : response.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const users = await getUsers();

  return (
    <>
      <Hero />
      <UsersList initialUsers={users} />
    </>
  );
}
