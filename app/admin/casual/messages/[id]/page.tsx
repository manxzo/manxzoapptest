"use client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function AdminCasualMessagePage({ params }: PageProps) {
  return (
    <div>
      <h1>Admin Casual Message Page</h1>
      <p>Message ID: {params.id}</p>
    </div>
  );
}
