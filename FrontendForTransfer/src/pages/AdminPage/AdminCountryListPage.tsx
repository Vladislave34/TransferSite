
import PageMeta from "../../admin/components/common/PageMeta.tsx";
import PageBreadcrumb from "../../admin/components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../admin/components/common/ComponentCard.tsx";
import AdminCountryList from "../../components/AdminCountryList/adminCountryList.tsx";



const AdminCountryListPage = () => {
    return (
        <>
            <PageMeta
                title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Basic Tables" />
            <div className="space-y-6">
                <ComponentCard title="Basic Table 1">

                    <AdminCountryList />

                </ComponentCard>
            </div>
        </>
    );
};

export default AdminCountryListPage;