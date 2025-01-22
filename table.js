import { useState } from 'react'
import { Button } from "/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"

export default function DropdownTable() {
  const [rows, setRows] = useState([
    { singleSelect: '', multiSelect: [] as string[] },
  ])
  const [singleSelectOptions, setSingleSelectOptions] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
  ])
  const [multiSelectOptions, setMultiSelectOptions] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ])
  const [newMultiSelectItem, setNewMultiSelectItem] = useState('')

  const handleSingleSelectChange = (index: number, value: string) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, singleSelect: value } : row
    )
    setRows(updatedRows)
  }

  const handleMultiSelectChange = (index: number, value: string[]) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, multiSelect: value } : row
    )
    setRows(updatedRows)
  }

  const addNewRow = () => {
    setRows([...rows, { singleSelect: '', multiSelect: [] }])
  }

  const addNewMultiSelectItem = () => {
    if (newMultiSelectItem.trim() && !multiSelectOptions.includes(newMultiSelectItem)) {
      setMultiSelectOptions([...multiSelectOptions, newMultiSelectItem])
      setNewMultiSelectItem('')
    }
  }

  const availableSingleSelectOptions = (index: number) => {
    const selectedOptions = rows.map(row => row.singleSelect).filter(Boolean)
    return singleSelectOptions.filter(option => !selectedOptions.includes(option) || rows[index].singleSelect === option)
  }

  return (
    <div className="p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left">Label 1</th>
            <th className="p-4 text-left">Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="p-4">
                <Select
                  value={row.singleSelect}
                  onValueChange={(value) => handleSingleSelectChange(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSingleSelectOptions(index).map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="p-4">
                <Select
                  multiple
                  value={row.multiSelect}
                  onValueChange={(value) => handleMultiSelectChange(index, value as string[])}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select items" />
                  </SelectTrigger>
                  <SelectContent>
                    {multiSelectOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                    <div className="flex items-center justify-between p-2">
                      <Input
                        value={newMultiSelectItem}
                        onChange={(e) => setNewMultiSelectItem(e.target.value)}
                        placeholder="Add new item"
                        className="w-full mr-2"
                      />
                      <Button onClick={addNewMultiSelectItem} variant="outline">
                        Add
                      </Button>
                    </div>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <Button onClick={addNewRow}>Add new Row</Button>
      </div>
    </div>
  )
}
