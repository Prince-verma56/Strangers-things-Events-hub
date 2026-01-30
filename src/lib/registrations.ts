
export interface RegistrationData {
    name: string;
    email: string;
    phone: string;
    college: string;
    year_of_study: string;
    team_size: string;
    event_name?: string;
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
    data?: unknown;
    error?: unknown;
}

export async function submitRegistration(data: RegistrationData): Promise<RegistrationResponse> {
    // Simulate API call
    console.log('Registration submitted (Mock):', data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        message: 'Registration submitted successfully! (Mock Mode)',
        data: { id: 'mock-id', ...data },
    };
}
