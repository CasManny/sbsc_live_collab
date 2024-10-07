"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
    InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from "@liveblocks/react-ui";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import { Bell } from "lucide-react";
import Image from "next/image";

const Notifications = () => {
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();
  const unreadNotifications = inboxNotifications.filter(
    (notification) => !notification.readAt
  );
  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Bell />
        {count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">
        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: React.ReactNode) => (
              <>{user} mention you.</>
            ),
          }}
        >
          <InboxNotificationList>
            {unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-dark-500">
                No new Notifications
              </p>
                      )}
                      {unreadNotifications.length > 0 && unreadNotifications.map((notification) => (
                          <InboxNotification
                              key={notification.id}
                              inboxNotification={notification}
                              className="bg-white text-black"
                              href={`/document/${notification.roomId}`}
                              showActions={false}
                              kinds={{
                                  thread: (props) => (
                                      <InboxNotification.Thread {...props} showActions={false} showRoomName={false} />
                                  ),
                                  textMention: (props) => (
                                      <InboxNotification.TextMention {...props} showRoomName={false} />
                                  ),
                                  $documentAccess: (props) => (
                                      <InboxNotification.Custom {...props} title={props.inboxNotification.activities[0].data.title} aside={<InboxNotification.Icon className="bg-transparent">
                                          <Image src={props.inboxNotification.activities[0].data.avatar as string || ''} alt='avatar' width={36} height={36} className="rounded-full" />
                                      </InboxNotification.Icon>}>
                                          {props.children}
                                      </InboxNotification.Custom>
                                  )
                              }}
                          />
                      ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
