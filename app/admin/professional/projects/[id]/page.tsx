"use client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AdminProfessionalProjectPage({ params }: PageProps) {
  return (
    <div>
      <h1>Admin Professional Project Page</h1>
      <p>Project ID: {params.id}</p>
    </div>
  );
}
