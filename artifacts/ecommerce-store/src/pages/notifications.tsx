import { useListNotifications, useMarkNotificationRead, getListNotificationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Bell, Check } from "lucide-react";

export default function Notifications() {
  const { data: notifications, isLoading } = useListNotifications();
  const markReadMutation = useMarkNotificationRead();
  const queryClient = useQueryClient();

  const handleMarkRead = (id: number) => {
    markReadMutation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() });
        }
      }
    );
  };

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center py-24"><p className="font-serif italic text-muted-foreground">Loading notifications...</p></div>;
  }

  const notifsList = notifications || [];
  const unreadCount = notifsList.filter(n => !n.isRead).length;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-3xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif mb-2">Notifications</h1>
          <p className="text-muted-foreground font-light">You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {notifsList.length === 0 ? (
        <div className="text-center py-24 bg-muted/30 border border-border/50 flex flex-col items-center">
          <Bell className="w-8 h-8 text-muted-foreground mb-4" />
          <p className="font-serif italic text-muted-foreground text-xl">You're all caught up.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifsList.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-6 flex gap-4 transition-colors ${notif.isRead ? 'bg-background border border-border/50 opacity-70' : 'bg-muted/30 border border-primary/20'}`}
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                    {notif.type}
                  </span>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  )}
                </div>
                <h3 className="font-medium text-lg">{notif.message}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {format(new Date(notif.createdAt), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              {!notif.isRead && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleMarkRead(notif.id)}
                  className="text-xs tracking-wider uppercase h-8 mt-2"
                  disabled={markReadMutation.isPending}
                >
                  <Check className="w-3 h-3 mr-1" /> Mark Read
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
