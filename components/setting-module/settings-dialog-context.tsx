"use client"

import * as React from "react"

type Section =
  | "MY_PROFILE"
  | "PRIVACY"
  | "NOTIFICATIONS"
  | "ADVANCE"

type SettingsDialogContextType = {
  open: boolean
  section: Section
  openDialog: (section: Section) => void
  closeDialog: () => void
}

const SettingsDialogContext =
  React.createContext<SettingsDialogContextType | null>(null)

export function SettingsDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [section, setSection] = React.useState<Section>("MY_PROFILE")

  const openDialog = (section: Section) => {
    setSection(section)
    setOpen(true)
  }

  const closeDialog = () => setOpen(false)

  return (
    <SettingsDialogContext.Provider
      value={{ open, section, openDialog, closeDialog }}
    >
      {children}
    </SettingsDialogContext.Provider>
  )
}

export function useSettingsDialog() {
  const context = React.useContext(SettingsDialogContext)
  if (!context) {
    throw new Error(
      "useSettingsDialog must be used within a SettingsDialogProvider"
    )
  }
  return context
}