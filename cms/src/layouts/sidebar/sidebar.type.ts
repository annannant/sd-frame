type TypePermission = ''

export type ITFMenuItem = {
  label: React.ReactNode
  key: React.Key
  icon?: React.ReactNode
  url?: string
  children?: ITFMenuItem[]
  type?: 'group'
}

export interface ITFSidebarItem {
  group: string
  url?: string
  key: React.Key
  permission?: TypePermission[]
  items?: ITFMenuItem[]
}
