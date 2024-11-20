"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Send,
  Settings,
  MessageSquare,
  History,
  Bot,
} from "lucide-react";

export default function AppPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm a demo response. In the full version, I would be powered by multiple LLMs!"
      }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-blue-950">
      {/* Sidebar */}
      <div className="w-64 border-r border-indigo-800/50 bg-gradient-to-b from-indigo-950/90 to-blue-950/90 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-cyan-400" />
          <h1 className="font-bold text-xl text-cyan-100">LLM Hub</h1>
        </div>
        
        <Button className="w-full mb-4" variant="outline">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Chat
        </Button>
        
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-cyan-200 hover:text-cyan-100 hover:bg-indigo-900/50">
            <History className="w-4 h-4 mr-2" />
            Chat History
          </Button>
          <Button variant="ghost" className="w-full justify-start text-cyan-200 hover:text-cyan-100 hover:bg-indigo-900/50">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-900/50 via-indigo-950/50 to-blue-900/50 backdrop-blur-sm">
        <div className="border-b border-indigo-800/50 p-4">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="bg-indigo-950/30">
              <TabsTrigger value="chat" className="data-[state=active]:bg-blue-800">Chat</TabsTrigger>
              <TabsTrigger value="models" className="data-[state=active]:bg-blue-800">Models</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-blue-800">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message, index) => (
              <Card key={index} className={`p-4 ${
                message.role === "assistant" 
                  ? "bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border-indigo-800/50" 
                  : "bg-gradient-to-r from-indigo-900/40 to-blue-900/40 border-blue-800/50"
              }`}>
                <div className="flex gap-3">
                  {message.role === "assistant" ? (
                    <Bot className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-cyan-100 flex items-center justify-center">
                      U
                    </div>
                  )}
                  <div className="flex-1 text-cyan-100">
                    <p>{message.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t border-indigo-800/50 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-4">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="bg-indigo-950/30 border-indigo-800/50 text-cyan-100 placeholder:text-cyan-400/50"
              />
              <Button onClick={handleSend} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}