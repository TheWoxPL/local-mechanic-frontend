import { ScheduleMeeting } from 'react-schedule-meeting';

interface CalendarProps {
  handleSelectData: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ handleSelectData }) => {
  const generateSequence = (num: number) =>
    Array.from({ length: num }, (_, i) => i);

  const availableTimeslots = generateSequence(9).map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          30,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    };
  });

  return (
    <ScheduleMeeting
      borderRadius={10}
      primaryColor="#dd3737"
      eventDurationInMinutes={30}
      availableTimeslots={availableTimeslots}
      onStartTimeSelect={() => handleSelectData(new Date())}
    />
  );
};

export default Calendar;
