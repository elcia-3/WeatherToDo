import 'react-datepicker/dist/react-datepicker.css'


import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Control, Controller, Path } from 'react-hook-form'

type Props<T> = {
  name: Path<T>
  error?: string
  control: Control<T>
  timeIntervals?: number
}

export const DatePicker = <T,>({
  name,
  control,
  error,
}: Props<T>) => {
  return (
    <>
      <div>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactDatePicker
              dateFormat="yyyy-MM-dd"
              onChange={onChange}
              selected={value as Date}
            />
          )}
        />
      </div>
      <span>{error}</span>
    </>
  )
}