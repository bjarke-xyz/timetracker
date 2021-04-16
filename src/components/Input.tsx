import styled from "@emotion/styled";
import React from "react";
import { v4 as uuid } from "uuid";
import { useStoreActions, useStoreState } from "../store/hooks";

const LabelDurationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const InputWrapper = styled.input`
  width: 100%;
`;

export const Input: React.FC = () => {
  const tasks = useStoreState((state) => state.tasks);
  const actions = useStoreActions((actions) => actions);

  const addTask = () => {
    actions.add({ id: uuid(), label: "", durations: [] });
  };

  const onLabelChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const task = tasks[index];
    task.label = event.target.value;
    actions.update(task);
  };

  const onDurationChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const task = tasks[index];
    const durationsStr = event.target.value;
    const durations = durationsStr.split(",");
    task.durations = durations;
    actions.update(task);
    console.log(task);
  };

  return (
    <>
      <button onClick={addTask}>Tilføj</button>
      <button onClick={() => actions.set([])}>Ryd</button>
      <div>
        {tasks.map((task, i) => (
          <div key={task.id}>
            <LabelDurationWrapper>
              <InputWrapper
                placeholder="Label"
                value={task.label}
                onChange={(e) => onLabelChange(i, e)}
              ></InputWrapper>
              <InputWrapper
                placeholder="8:00 9:00, 9:00 9:15"
                value={task.durations.join(",")}
                onChange={(e) => onDurationChange(i, e)}
              ></InputWrapper>
            </LabelDurationWrapper>
          </div>
        ))}
      </div>
    </>
  );
};
