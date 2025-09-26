const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#667cb0] text-slate-100 p-8">


        <h1 className="text-3xl font-bold mb-6 text-center">AI Productivity Tool</h1>

            <div className="flex justify-between gap-6">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
