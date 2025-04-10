"use client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AdminCasualPostPage({ params }: PageProps) {
  return (
    <div>
      <h1>Admin Casual Post Page</h1>
      <p>Post ID: {params.id}</p>
    </div>
  );
}
