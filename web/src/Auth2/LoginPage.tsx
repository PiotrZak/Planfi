import { Auth, Typography, Button } from '@supabase/ui'
import { createClient } from '@supabase/supabase-js'
import { useContext } from 'react'
import { UserContext } from 'contexts/UserContext'

const supabase = createClient('https://acvnaiqvfimvsuvtjmlo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjdm5haXF2ZmltdnN1dnRqbWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYyNDkxMDksImV4cCI6MTk2MTgyNTEwOX0.r1cLRcGhFHFnqRif_TczGGk1OuvHJLjAv_hNg3E1Yts')

const Container = (props: { supabaseClient: { auth: { signOut: () => any } }; children: any }) => {
    const { user: supaUser} = Auth.useUser()
    const [user, setUser] = useContext(UserContext);

    setUser(supaUser);

    if (user)
        return (
            <>
                <Typography.Text>Signed in: {user.email}</Typography.Text>
                <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </>
        )
    return props.children
}

export default function AuthBasic() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Container supabaseClient={supabase}>
                <Auth supabaseClient={supabase} />
                {/* <Auth onlyThirdPartyProviders={true} supabaseClient={supabase} providers={['google', 'facebook', 'github']} /> */}
            </Container>
        </Auth.UserContextProvider>
    )
}
