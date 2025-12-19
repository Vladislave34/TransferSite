import PageMeta from "../../admin/components/common/PageMeta.tsx";
import AuthLayout from "../../admin/pages/AuthPages/AuthPageLayout.tsx";

import ResetPasswordForm from "../../UI/ResetPasswordForm/ResetPasswordForm.tsx";


const ResetPasswordPage = () => {
    return (
        <>
            <PageMeta
                title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <AuthLayout>
                <ResetPasswordForm />
            </AuthLayout>
        </>
    );
};

export default ResetPasswordPage;