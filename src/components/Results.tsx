import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useStoreState } from "../store/hooks";

function convertToString(ms: number | null, delim = ":") {
  if (ms === null) {
    return "ERROR";
  }
  const showWith0 = (value: number) => (value < 10 ? `0${value}` : value);
  const hours = showWith0(Math.floor((ms / (1000 * 60 * 60)) % 60));
  const minutes = showWith0(Math.floor((ms / (1000 * 60)) % 60));
  const seconds = showWith0(Math.floor((ms / 1000) % 60));
  return `${hours}${delim}${minutes}${delim}${seconds}`;
}

function convertToHours(ms: number | null): string {
  if (ms === null) {
    return "ERROR";
  }

  const hours = ms / 3600000;
  return hours.toFixed(2);
}

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TaskLabel = styled.div`
  margin: 0.5rem;
`;

export const Results: React.FC = () => {
  const tasks = useStoreState((x) => x.tasks);

  const [processedTasks, setProcessedTasks] = useState<
    { label: string; durationHHMMSS: string; durationHours: string }[]
  >([]);

  useEffect(() => {
    const tmpProcessedTasks: {
      label: string;
      durationHHMMSS: string;
      durationHours: string;
    }[] = tasks.map((task) => {
      const dates: {
        from: Date | null;
        to: Date | null;
      }[] = task.durations.map((duration) => {
        try {
          const [from, to] = duration
            .trim()
            .split(" ")
            .map((x) => x.trim());

          const [fromHour, fromMinute] = from
            .split(":")
            .map((x) => x.trim())
            .map(Number);
          const fromDate = new Date();
          fromDate.setHours(fromHour);
          fromDate.setMinutes(fromMinute);
          fromDate.setSeconds(0);
          fromDate.setMilliseconds(0);

          const [toHour, toMinute] = to
            .split(":")
            .map((x) => x.trim())
            .map(Number);
          const toDate = new Date();
          toDate.setHours(toHour);
          toDate.setMinutes(toMinute);
          toDate.setSeconds(0);
          toDate.setMilliseconds(0);

          return { from: fromDate, to: toDate };
        } catch (err) {
          return { from: null, to: null };
        }
      });

      const msDurations = dates.map(({ from, to }) => {
        if (
          !(
            from !== null &&
            from instanceof Date &&
            to !== null &&
            to instanceof Date
          )
        ) {
          return null;
        }

        const diff = to.getTime() - from.getTime();
        return diff;
      });

      const msDuration = msDurations.reduce(
        (prev, curr) => (prev ?? 0) + (curr ?? 0),
        0
      );

      const hhmmss = convertToString(msDuration);
      const hours = convertToHours(msDuration);
      return {
        label: task.label,
        durationHHMMSS: hhmmss,
        durationHours: hours,
      };
    });
    setProcessedTasks(tmpProcessedTasks);
  }, [tasks]);

  return (
    <>
      <div>
        {/* {tasks.map((task) => (
          <div key={task.id}>{task.label}</div>
        ))} */}
        {processedTasks.map((task, i) => (
          <TaskWrapper key={i}>
            <TaskLabel>{task.label}</TaskLabel>
            <div>
              {task.durationHours} ({task.durationHHMMSS})
            </div>
          </TaskWrapper>
        ))}
      </div>
    </>
  );
};
