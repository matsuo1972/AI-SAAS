'use client'

import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default  function AuthButton() {
    const { userId } = useAuth();
    if (userId) {
        return (
            <UserButton 
                appearance={
                    { elements: 
                        { avatarBox: 'h-20 w-20'},
                    }
                }
                showName
            />
        )
    }

    return (
        <div className="flex items-center gap-4">
            <SignInButton mode="modal" 
                fallbackRedirectUrl={'/dashboard'} 
                forceRedirectUrl={'/dashboard'}
            >
                <Button variant={'outline'}>ログイン</Button>
            </SignInButton>
            <SignUpButton mode="modal"
                fallbackRedirectUrl={'/dashboard'} 
                forceRedirectUrl={'/dashboard'}>
                <Button>新規登録</Button>
            </SignUpButton>
        </div>
    )
}
