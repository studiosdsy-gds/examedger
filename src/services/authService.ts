import { supabase } from './supabaseClient';

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin, // Redirect back to current domain
        },
    });
    return { data, error };
};

export const signInWithDiscord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: window.location.origin,
        },
    });
    return { data, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

export const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    return { data, error };
};

export const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });
    return { data, error };
};

export const signInWithEmail = async (identifier: string, password: string) => {
    let emailToUse = identifier;

    // Check if identifier is likely an Edge ID (no '@')
    if (!identifier.includes('@')) {
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('edge_id', identifier)
            .single();

        if (error || !data) {
            return { data: null, error: { message: 'Invalid Edge ID or User not found' } };
        }
        emailToUse = data.email;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password
    });
    return { data, error };
};
