import ProfileForm from "@/components/auth/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";

export default function Page() {
    return (
        <main className="flex items-center justify-center">
            <Card className="mx-4 w-full max-w-3xl my-8">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                        Edit Your Personal Information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm/>
                </CardContent>
            </Card>
        </main>
    )
}