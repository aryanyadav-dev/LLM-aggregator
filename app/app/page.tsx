"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Send,
  Settings,
  MessageSquare,
  History,
  Bot,
  Upload,
} from "lucide-react";
import axios from "axios";

export default function AppPage() {
  const [messages, setMessages] = useState<{ role: string; content: string; type?: string; url?: string }[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      // Check if input is a prompt for image generation
      if (input.toLowerCase().startsWith("generate image:")) {
        const prompt = input.replace("generate image:", "").trim();
        const response = await axios.post("http://localhost:5000/api/image/generate", { prompt });

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Here is your generated image:", type: "image", url: response.data.url },
        ]);
      } else {
        // Handle regular text query
        const response = await axios.post("http://localhost:5000/api/chat/query", {
          message: input,
          model: "gpt-4",
        });

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.response },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessages((prev) => [
        ...prev,
        { role: "user", content: "Uploaded an image.", type: "image", url: response.data.url },
      ]);
    } catch (error) {
      console.error("Error uploading the image:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Image upload failed. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-blue-950">
      {/* Sidebar */}
      <div className="w-64 border-r border-indigo-800/50 bg-gradient-to-b from-indigo-950/90 to-blue-950/90 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-cyan-400" />
          <h1 className="font-bold text-xl text-cyan-100">AI Companion</h1>
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
                  {message.type === "image" ? (
                    <img src={message.url} alt="Uploaded content" className="max-w-full rounded-lg" />
                  ) : message.role === "assistant" ? (
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
                placeholder="Type your message or 'generate image: <prompt>'..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="bg-indigo-950/30 border-indigo-800/50 text-cyan-100 placeholder:text-cyan-400/50"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={loading}
              >
                {loading ? "..." : <Send className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleFileSelect}
                className="bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700"
                disabled={loading}
              >
                <Upload className="w-4 h-4" /> Upload
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
