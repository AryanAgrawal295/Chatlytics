"use client"

interface HeaderProps {
  onMenuClick: () => void
  currentTab: "analysis" | "builder"
  onTabChange: (tab: "analysis" | "builder") => void
}

export function Header({ onMenuClick, currentTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-primary hidden sm:block">
            Chatlytics
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTabChange("analysis")}
            className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors ${
              currentTab === "analysis"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            aria-pressed={currentTab === "analysis"}
          >
            Chat Analysis
          </button>

          <button
            onClick={() => onTabChange("builder")}
            className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors ${
              currentTab === "builder"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            aria-pressed={currentTab === "builder"}
          >
            Bot Builder
          </button>
        </div>
      </div>
    </header>
  )
}
