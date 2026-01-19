'use client';
import { Button, Textarea } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  text: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setChatStarted(true);

    const userMessage: Message = { id: Date.now(), type: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        text: trimmedInput,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full mx-auto border-0 rounded-0 bg-white dark:bg-gray-800 relative">
      <div
        className={`overflow-y-auto p-4 space-y-3 relative z-10 transition-all duration-300 ${chatStarted ? 'bg-white dark:bg-gray-800' : 'bg-transparent'}`}
        style={{ height: 'calc(100vh - 118px)' }}
      >
        {messages.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-gray-500 text-center dark:text-gray-400 text-lg">
              👋 Start chatting! Type a message below to begin.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'}`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2 border-0 bg-gray-100 dark:bg-gray-700 flex gap-2 items-end sticky bottom-0 w-full z-20">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          rows={1}
          color="black"
          className="flex-1 resize-none rounded-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button
          onClick={sendMessage}
          disabled={input.trim().length === 0}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-100 text-black dark:text-white font-bold rounded-full uppercase"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
