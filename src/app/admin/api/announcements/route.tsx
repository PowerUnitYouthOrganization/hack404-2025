import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db/schema";
import { announcements, pushSubscriptions } from "@/db/schema";
import webpush from "web-push";
import { desc, eq, inArray } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

// Function to send Discord announcement with embed
async function sendDiscordAnnouncement(
  title: string,
  content: string,
  author: any,
) {
  try {
    const rest = new REST({ version: "9" }).setToken(
      process.env.DISCORD_TOKEN!,
    );

    const authorName = (author?.firstName || "Unknown").trim();

    const embed = {
      title: title,
      description: content,
      color: 0x3498db, // Blue color
      author: {
        name: authorName,
        icon_url: author?.profileImageUrl || undefined,
      },
      timestamp: new Date().toISOString(),
    };

    await rest.post(
      Routes.channelMessages(process.env.ANNOUNCEMENT_CHANNEL_ID!),
      {
        body: {
          content: "@everyone",
          embeds: [embed],
        },
      },
    );

    console.log("Discord announcement sent successfully");
  } catch (error) {
    console.error("Error sending Discord announcement:", error);
  }
}

export async function POST(req: NextRequest) {
  let session = await auth();

  const authResult = await verifyAdminAccess(session);

  if (!authResult.authorized) {
    return authResult.response;
  }

  const authorId = authResult.sessions.user.id;

  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content are required" },
      { status: 400 },
    );
  }

  const newAnnouncement = await db
    .insert(announcements)
    .values({ title, content, authorId })
    .returning();

  const subscriptions = await db.select().from(pushSubscriptions);

  const author = await db
    .select()
    .from(users)
    .where(eq(users.id, authorId))
    .limit(1);

  // Send announcement to Discord with full author object
  await sendDiscordAnnouncement(title, content, author[0]);

  const notificationPayload = JSON.stringify({
    title,
    content,
    author: (author[0]?.firstName || "Unknown").trim(),
  });

  // Send notifications and collect failed subscription IDs
  const failedSubscriptionIds: number[] = [];

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          },
          notificationPayload,
        );
      } catch (error: any) {
        console.error(
          `Failed to send notification to subscription ${sub.id}:`,
          error,
        );

        // Check if it's a client error (invalid subscription)
        if (
          error.statusCode === 410 ||
          error.statusCode === 404 ||
          error.statusCode === 400
        ) {
          failedSubscriptionIds.push(sub.id);
        }
      }
    }),
  ); // Remove invalid subscriptions from database
  if (failedSubscriptionIds.length > 0) {
    try {
      await db
        .delete(pushSubscriptions)
        .where(inArray(pushSubscriptions.id, failedSubscriptionIds));

      console.log(
        `Removed ${failedSubscriptionIds.length} invalid subscription(s) from database`,
      );
    } catch (dbError) {
      console.error(
        "Error removing invalid subscriptions from database:",
        dbError,
      );
    }
  }

  return NextResponse.json(newAnnouncement[0], { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const { searchParams } = new URL(req.url);
    const announcementId = searchParams.get("id");

    if (!announcementId) {
      return NextResponse.json(
        { error: "Announcement ID is required" },
        { status: 400 },
      );
    }

    // Delete the announcement
    const deletedAnnouncement = await db
      .delete(announcements)
      .where(eq(announcements.id, parseInt(announcementId)))
      .returning();

    if (deletedAnnouncement.length === 0) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Announcement deleted successfully",
        deletedAnnouncement: deletedAnnouncement[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
