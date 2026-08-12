"use client";

import { useState, useEffect } from "react";
import { Search, MailOpen, MailX, Trash2, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";

export default function AdminContactPage({ initialMessage = null }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterRead, setFilterRead] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!initialMessage) {
      fetchMessages();
    }
  }, [initialMessage]);

  const fetchMessages = async () => {
    try {
      const url = new URL("/api/admin/contact", window.location.origin);
      if (searchQuery) url.searchParams.set("search", searchQuery);
      if (filterDate) url.searchParams.set("date", filterDate);
      if (filterRead) url.searchParams.set("read", filterRead);

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchMessages();
    }, 300);
    return () => clearTimeout(delay);
  }, [searchQuery, filterDate, filterRead]);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isRead: !currentStatus } : m))
        );
        setUnreadCount((prev) => (!currentStatus ? prev - 1 : prev + 1));
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (msg) => {
    if (!confirm(`Are you sure you want to delete message from ${msg.fullName}?`)) return;

    try {
      const res = await fetch(`/api/admin/contact/${msg._id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== msg._id));
        if (!msg.isRead) {
          setUnreadCount((prev) => prev - 1);
        }
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Delete failed");
    }
  };

  const getSubjectColor = (subject) => {
    switch (subject) {
      case "General Inquiry": return "bg-gray-100 text-gray-800";
      case "Product Inquiry": return "bg-blue-50 text-blue-700";
      case "Quotation / Pricing": return "bg-green-50 text-green-700";
      case "Order & Shipping": return "bg-orange-50 text-orange-700";
      case "Technical Support": return "bg-purple-50 text-purple-700";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (initialMessage) {
    return (
      <div>
        <div className="mb-6">
          <Link href="/admin/contact" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
            <MailOpen className="w-4 h-4" /> Back to Messages
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{initialMessage.subject}</h2>
              <p className="text-sm text-gray-500">From: {initialMessage.fullName} &lt;{initialMessage.email}&gt;</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              initialMessage.isRead ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
            }`}>
              {initialMessage.isRead ? <MailOpen className="w-3 h-3" /> : <MailX className="w-3 h-3" />}
              {initialMessage.isRead ? "Read" : "Unread"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</span>
              <p className="text-sm text-gray-900 mt-1">{initialMessage.fullName}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</span>
              <p className="text-sm text-gray-900 mt-1">{initialMessage.email}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</span>
              <p className="text-sm text-gray-900 mt-1">{initialMessage.phone}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</span>
              <p className="text-sm text-gray-900 mt-1">{initialMessage.subject}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</span>
              <p className="text-sm text-gray-900 mt-1">{new Date(initialMessage.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="mb-6">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Message</span>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap">
              {initialMessage.message}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleToggleRead(initialMessage._id, initialMessage.isRead)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {initialMessage.isRead ? <MailX className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
              {initialMessage.isRead ? "Mark as Unread" : "Mark as Read"}
            </button>
            <button
              onClick={() => handleDelete(initialMessage)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage contact form submissions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, subject, or message..."
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
          />
        </div>

        <div className="relative">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
          />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
          >
            <option value="">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No messages found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Sender</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Subject</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Message</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-gray-50/50 transition-colors ${!msg.isRead ? "bg-blue-50/30" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{msg.fullName}</div>
                      <div className="text-xs text-gray-500">{msg.email}</div>
                      <div className="text-xs text-gray-400">{msg.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectColor(msg.subject)}`}>
                        {msg.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px]">
                      <div className="line-clamp-2">{msg.message}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        msg.isRead ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {msg.isRead ? <MailOpen className="w-3 h-3" /> : <MailX className="w-3 h-3" />}
                        {msg.isRead ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/contact/${msg._id}`}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View"
                        >
                          <MailOpen className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleToggleRead(msg._id, msg.isRead)}
                          className="p-2 rounded-lg text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
                          title={msg.isRead ? "Mark as Unread" : "Mark as Read"}
                        >
                          {msg.isRead ? <MailX className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(msg)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
