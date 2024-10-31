import { db } from '@/db/db'; // Adjust the path if necessary
import { usersTable } from '@/db/schema'; // Adjust the path if necessary

const users = [
  { name: 'John Doe' },
  { name: 'Jane Doe' },
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'David' },
  { name: 'Eve' },
];

const addUsers = async () => {
  try {
    for (const user of users) {
      await db.insert(usersTable).values(user);
      
      console.log(`User ${user.name} added.`);
    }
    console.log('All users have been added successfully.');
  } catch (error) {
    console.error('Error adding users:', error);
  }
};

addUsers();
