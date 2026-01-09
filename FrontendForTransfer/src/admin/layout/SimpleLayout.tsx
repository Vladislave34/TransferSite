import type { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const SimpleLayout: FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
        <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
            Transportations
            </h1>
            </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
        </main>
        </div>
);
};

export default SimpleLayout;