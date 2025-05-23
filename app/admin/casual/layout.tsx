import AdminDock from "@/components/DocksNav/AdminDock";

const CasualLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <AdminDock className="fixed bottom-0 left-0 z-50" />
    </div>
  );
};

export default CasualLayout;
