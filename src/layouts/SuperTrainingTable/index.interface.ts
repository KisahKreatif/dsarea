export interface iTrainingTableProps {
  checked: string[]
  setChecked: Function
  searchFilter?: string
}

export interface iTableRowProps {
  data: any
  checked: boolean
  setChecked: Function
  onEdit: Function
}