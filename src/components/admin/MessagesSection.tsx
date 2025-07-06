import React from 'react';
import { format } from 'date-fns';
import { useMessages } from '@/contexts/MessageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, MailOpen, RefreshCw, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function MessagesSection() {
  const { 
    messages, 
    loading, 
    markAsRead, 
    deleteMessage, 
    unreadCount, 
    refreshMessages 
  } = useMessages();
  
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshMessages();
      toast({
        title: 'Refreshed',
        description: 'Messages have been refreshed',
      });
    } catch (error) {
      console.error('Error refreshing messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to refresh messages',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      toast({
        title: 'Success',
        description: 'Message marked as read',
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark message as read',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        toast({
          title: 'Success',
          description: 'Message deleted successfully',
        });
      } catch (error) {
        console.error('Error deleting message:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete message',
          variant: 'destructive',
        });
      }
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Loading messages...</p>
      </div>
    );
  }
  
  if (!loading && messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 text-gray-500">
        <MailOpen className="h-12 w-12" />
        <p className="text-lg">No messages yet</p>
        <p className="text-sm">Messages sent through the contact form will appear here</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <Mail className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No messages yet</h3>
        <p className="mt-1 text-sm text-gray-500">Messages from the contact form will appear here.</p>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">Messages</h2>
              <Badge variant="outline">
                {unreadCount} unread
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
          {unreadCount > 0 && (
            <Badge variant="default">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={!message.read ? 'border-l-4 border-l-indigo-500' : ''}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    <p className="text-sm text-gray-600">{message.email}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {message.createdAt instanceof Date
                      ? format(message.createdAt, 'MMM d, yyyy h:mm a')
                      : format(message.createdAt.toDate(), 'MMM d, yyyy h:mm a')}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{message.message}</p>
                <div className="mt-4 flex space-x-2">
                  {!message.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => message.id && handleMarkAsRead(message.id)}
                    >
                      <MailOpen className="h-4 w-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => message.id && handleDelete(message.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
