"use client"

import { useState } from "react"
import { Header } from "@/components/ui/Header"
import { ToastContainer } from "@/components/ui/Toast"
import { ChatAnalyzer } from "@/components/chat/ChatAnalyzer"
import { BotBuilder } from "@/components/chat/BotBuilderNew"

export default function App() {
  const [activeTab, setActiveTab] = useState<"analysis" | "builder">("analysis")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        currentTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab)
          setSidebarOpen(false)
        }}
      />

      {activeTab === "analysis" ? (
        <ChatAnalyzer
          sidebarOpen={sidebarOpen}
          onSidebarClose={() => setSidebarOpen(false)}
        />
      ) : (
        <BotBuilder
          sidebarOpen={sidebarOpen}
          onSidebarClose={() => setSidebarOpen(false)}
        />
      )}

      <ToastContainer />
    </>
  )
}
