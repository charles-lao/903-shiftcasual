'use server';

import { redirect } from 'next/navigation';
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByUserName } from "@/lib/user";
import { createAuthSession, destroySession } from '@/lib/auth';



export async function signup(prevState: any, formData: FormData) {
    const userName = formData.get('username');
    const password = formData.get('password');
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');

    let errors = {};

    // type guard
    if (typeof userName !== 'string') {
        // Handle the case where userName is null or not a string
        return {
          errors: {
            userName: 'Please provide a valid username.',
          },
        };
    }

    // type guard
    if (typeof firstname !== 'string') {
        // Handle the case where userName is null or not a string
        return {
          errors: {
            userName: 'Please provide a valid username.',
          },
        };
    }

    // type guard
    if (typeof lastname !== 'string') {
        // Handle the case where userName is null or not a string
        return {
          errors: {
            userName: 'Please provide a valid username.',
          },
        };
    }



    // type guard
    if (typeof password !== 'string') {
        // Handle the case where userName is null or not a string
        return {
          errors: {
            password: 'Please provide a valid password.',
          },
        };
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
        };
    }

    const hashedPassword = hashUserPassword(password);

    try {
        const user = await createUser(userName, hashedPassword, firstname, lastname);

        await createAuthSession(user.id);
        redirect('/dashboard');
    } catch (error:any) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'It seems like an account for the chosen email already exists.'
                }
            };
        }
        throw error;
    }

    return prevState;
}


export async function login(prevState: any, formData: FormData) {
    const userName = formData.get('username');
    const password = formData.get('password');

    if (typeof userName !== 'string') {
        // Handle the case where userName is null or not a string
        return {
          errors: {
            username: 'Please provide a valid username.',
          },
        };
    }

     const existingUser = getUserByUserName(userName);

     if (!existingUser) {
        return {
            errors: {
                email: 'Could not authenticate user, please check your credentials.'
            },
        };
     }


     const isValidPassword = verifyPassword(existingUser.password, password);

     if (!isValidPassword) {
        return {
            errors: {
                password: 'Could not authenticate user, please check your credentials.'
            },
        };
     }


    await createAuthSession(existingUser.id);
    redirect('/dashboard');

    return prevState;
}


export async function logout() {
    await destroySession();
    redirect('/');
}