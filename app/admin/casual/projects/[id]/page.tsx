"use client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AdminCasualProjectPage({ params }: PageProps) {
  return (
    <div>
      <h1>Admin Casual Project Page</h1>
      <p>Project ID: {params.id}</p>
    </div>
  );
}
