import RegisterForm from "../../UI/RegisterForm/RegisterForm.tsx";
import PageMeta from "../../admin/components/common/PageMeta.tsx";
import AuthLayout from "../../admin/pages/AuthPages/AuthPageLayout.tsx";


const RegisterPage = () => {
    return (
        <>
            <PageMeta
                title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <AuthLayout>
                <RegisterForm />
            </AuthLayout>
        </>
    );
};

export default RegisterPage;