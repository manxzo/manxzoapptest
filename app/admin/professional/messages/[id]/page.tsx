"use client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AdminProfessionalMessagePage({ params }: PageProps) {
  return (
    <div>
      <h1>Admin Professional Message Page</h1>
      <p>Message ID: {params.id}</p>
    </div>
  );
}
