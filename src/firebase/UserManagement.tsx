import { useEffect } from 'react';
import { auth } from '../config/firebase';
import React, { createContext, useState } from 'react'
import { User } from './user';
import dayjs from 'dayjs';

export const UserContext = createContext<User | null>(null);

type UserManagementProps = {
    children: React.ReactNode;
}

export default function UserManagement({ children }: UserManagementProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            let user : User | undefined = await User.fetchProfile(auth.currentUser?.uid ?? "");
            if (user === undefined) {
              user = new User("Anonymous", dayjs("2000-01-01"));
              await user.saveProfile();
            }
            if (user !== undefined) {
              setUser(user);
            } else {
                console.error("Error fetching user profile.");
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
