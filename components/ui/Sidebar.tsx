"use client"

import { useState } from "react"

interface ChatSession {
  id: string
  title: string
  timestamp: number
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  sessions: ChatSession[]
  currentSessionId: string
  onSelectSession: (id: string) => void
  onNewChat: () => void
}

export function Sidebar({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
}: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 z-40 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <button
            onClick={onNewChat}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>+</span>
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3">
          {sessions.length === 0 ? (
            <p className="text-sm text-gray-500 p-2">No chats yet</p>
          ) : (
            <div className="space-y-2">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => {
                    onSelectSession(session.id)
                    onClose()
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                    currentSessionId === session.id
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                  title={session.title}
                >
                  {session.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Close button for mobile */}
        <div className="p-4 border-t border-gray-700 lg:hidden">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </aside>
    </>
  )
}
