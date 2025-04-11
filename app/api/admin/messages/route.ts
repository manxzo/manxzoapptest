import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { verifyAdmin } from "../../authmiddleware/middleware";

export async function GET(request: NextRequest) {
  const verified = await verifyAdmin(request);
  if (!verified) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sender: true,
    },
  });
  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  const verified = await verifyAdmin(request);
  if (!verified) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  const { data } = await request.json();
  // Check if sender information is provided
  let newMessage;

  if (data.sender) {
    // Create message with connected sender
    newMessage = await prisma.message.create({
      data: {
        subject: data.subject || "",
        content: data.content || "",
        read: data.read || false,
        featured: data.featured || false,
        isCasual: data.isCasual ?? true,
        sender: {
          create: {
            name: data.sender.name || "",
            email: data.sender.email || null,
          },
        },
      },
      include: {
        sender: true,
      },
    });
  } else {
    // Create message without sender
    newMessage = await prisma.message.create({
      data: {
        subject: data.subject || "",
        content: data.content || "",
        read: data.read || false,
        featured: data.featured || false,
        isCasual: data.isCasual ?? true,
      },
    });
  }

  return NextResponse.json({
    message: "Message created successfully",
    status: 201,
    newMessage,
  });
}

export async function PATCH(request: NextRequest) {
  const verified = await verifyAdmin(request);
  if (!verified) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }
  const { id, data } = await request.json();

  // Handle sender data if provided
  let updateData: any = { ...data };
  if (data.sender) {
    if (data.senderId) {
      // Update existing sender
      updateData.sender = {
        update: data.sender,
      };
      delete updateData.sender.id; // Remove sender id from update data
    } else {
      // Create new sender if it doesn't exist
      updateData.sender = {
        create: data.sender,
      };
    }
    delete updateData.senderId; // Remove senderId from the main update data
  }

  const updatedMessage = await prisma.message.update({
    where: { id },
    data: updateData,
    include: {
      sender: true,
    },
  });

  return NextResponse.json({
    message: "Message updated successfully",
    status: 200,
    updatedMessage,
  });
}

export async function DELETE(request: NextRequest) {
  const verified = await verifyAdmin(request);
  if (!verified) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }
  const { id } = await request.json();

  // First find the message to check if it has a sender
  const message = await prisma.message.findUnique({
    where: { id },
    include: { sender: true },
  });

  if (!message) {
    return NextResponse.json(
      {
        message: "Message not found",
        status: 404,
      },
      { status: 404 }
    );
  }

  // If message has a sender, delete the sender first
  if (message.sender) {
    await prisma.sender.delete({
      where: { id: message.senderId! },
    });
  }

  // Delete the message
  await prisma.message.delete({
    where: { id },
  });

  return NextResponse.json({
    message: "Message deleted successfully",
    status: 200,
  });
}
