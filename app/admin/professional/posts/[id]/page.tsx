"use client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AdminProfessionalPostPage({ params }: PageProps) {
  return (
    <div>
      <h1>Admin Professional Post Page</h1>
      <p>Post ID: {params.id}</p>
    </div>
  );
}
