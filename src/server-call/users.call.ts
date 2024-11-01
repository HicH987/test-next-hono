import { getApiUrl } from '@/lib/utils';
import { User, CreateUserDTO } from '@/types/user.type';

// Fetch a list of all users
export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch(getApiUrl('/api/users'));
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

// Add a new user
export async function createNewUser(newUser: CreateUserDTO): Promise<User> {
  const response = await fetch(getApiUrl('/api/users'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN_SECRET}`,
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

// Delete a user by ID
export async function deleteUserById(id: number): Promise<User> {
  const response = await fetch(getApiUrl(`/api/users/${id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN_SECRET}`,
    },
  });

  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

// Fetch a specific user by ID
export async function fetchUserById(userId: number): Promise<User> {
  const response = await fetch(getApiUrl(`/api/users/${userId}`));
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

interface UserPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
// Fetch a specific post by ID
export async function fetchPostById(postId: number): Promise<UserPost> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}
