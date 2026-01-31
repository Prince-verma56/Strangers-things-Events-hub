
export interface RegistrationData {
    name: string;
    email: string;
    phone: string;
    college: string;
    year_of_study: string;
    team_size: string;
    event_name?: string;
    user_id?: string; // Optional user_id from Clerk
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
    data?: unknown;
    error?: unknown;
}

export async function submitRegistration(
    data: RegistrationData, 
    customSupabaseClient?: any // Accept authenticated client
): Promise<RegistrationResponse> {
    try {
        // Use the passed authenticated client OR the default anonymous one
        let supabaseClient;
        if (customSupabaseClient) {
            supabaseClient = customSupabaseClient;
        } else {
            const { supabase } = await import('./supabase');
            supabaseClient = supabase;
        }

        const { data: inserted, error } = await supabaseClient
            .from('registrations')
            .insert({
                name: data.name,
                email: data.email,
                phone: data.phone,
                college: data.college,
                year_of_study: data.year_of_study,
                team_size: data.team_size,
                event_name: data.event_name ?? null,
                user_id: data.user_id ?? null, // Save the user_id if provided
            })
            .select()
            .single()


        if (error) {
            console.error('Supabase registration error:', error)
            return {
                success: false,
                message: error.message || 'Registration failed',
                error,
            }
        }

        return {
            success: true,
            message: 'Registration submitted successfully',
            data: inserted,
        }
    } catch (err) {
        console.error('Unexpected registration error:', err)
        return {
            success: false,
            message: 'Unexpected error during registration',
            error: err,
        }
    }
}
