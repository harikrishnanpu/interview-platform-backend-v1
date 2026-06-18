


export class AuthProvider {

    private constructor(
        public readonly provider: 'google' | 'local',
        protected readonly passwordHash?: string
    ) { }


    create(provider: 'google' | 'local', passwordHash?: string): AuthProvider {

        if (provider === 'local' && !passwordHash) {
            throw new Error('Password hash is required for local authentication');
        }
        
        return new AuthProvider(provider, passwordHash);
    }


}