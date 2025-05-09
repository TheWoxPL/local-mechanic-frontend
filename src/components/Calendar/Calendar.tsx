import { ScheduleMeeting } from 'react-schedule-meeting';
import { AvailableSlot } from 'src/types/AvailableSlot';

interface CalendarProps {
  handleSelectData: (date: Date) => void;
  availableTimeslots?: AvailableSlot[];
  estimatedTimeInMinutes?: number;
}

const Calendar: React.FC<CalendarProps> = ({
  handleSelectData,
  availableTimeslots,
  estimatedTimeInMinutes,
}) => {
  const handleTimeslotClicked = (startTimeEventEmit) => {
    handleSelectData(startTimeEventEmit.startTime);
  };

  const slots =
    availableTimeslots?.map((slot, id) => ({
      id,
      startTime:
        slot.startTime instanceof Date
          ? slot.startTime
          : new Date(slot.startTime),
      endTime:
        slot.endTime instanceof Date ? slot.endTime : new Date(slot.endTime),
    })) || [];

  return (
    <ScheduleMeeting
      borderRadius={10}
      primaryColor="#dd3737"
      eventDurationInMinutes={estimatedTimeInMinutes}
      availableTimeslots={slots}
      onStartTimeSelect={handleTimeslotClicked}
      eventStartTimeSpreadInMinutes={0}
    />
  );
};

export default Calendar;
