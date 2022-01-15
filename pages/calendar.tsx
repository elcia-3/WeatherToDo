import { DatePicker } from "../components/DatePicker"
import { useForm} from 'react-hook-form'


type FormValues = {
  datetime: string;
} 

const Calendar = () => {
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>()

  return (
    <DatePicker
      name="datetime"
      control={control}
    />
  )
}

export default Calendar;