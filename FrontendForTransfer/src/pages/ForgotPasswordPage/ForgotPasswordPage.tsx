
import PageMeta from "../../admin/components/common/PageMeta.tsx";
import AuthLayout from "../../admin/pages/AuthPages/AuthPageLayout.tsx";

import ForgotPasswordForm from "../../UI/ForgotPasswordForm/ForgotPasswordForm.tsx";

const ForgotPasswordPage = () => {
    return (
        <>
            <PageMeta
                title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <AuthLayout>
                <ForgotPasswordForm />
            </AuthLayout>
        </>
    );
};

export default ForgotPasswordPage;