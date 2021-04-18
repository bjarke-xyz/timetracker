/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css, jsx } from "@emotion/react";
import React from "react";
import { useStoreActions, useStoreState } from "../store/hooks";

export const Input: React.FC = () => {
  const tasks = useStoreState((state) => state.tasks);
  const actions = useStoreActions((actions) => actions);

  const onLabelChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const task = tasks[index];
    task.label = event.target.value;
    actions.update(task);
    actions.newIfNeeded();
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
    actions.newIfNeeded();
  };

  return (
    <div
      css={css`
        margin-top: 0.2rem;
        display: flex;
        flex-direction: column;
      `}
    >
      <h3>Timetracker</h3>
      {tasks.map((task, i) => (
        <div
          key={task.id}
          css={css`
            padding: 0.6rem !important;
            flex-direction: row !important;
          `}
          className="row"
        >
          <button
            css={css`
              padding: 0 0.5rem !important;
            `}
            className="column column-5 button button-clear"
            title="Slet"
            onClick={() => actions.remove(task)}
          >
            🗑️
          </button>
          <input
            css={css`
              margin: 0 0.25rem !important;
            `}
            className="column column-15"
            placeholder="Opgave"
            value={task.label}
            onChange={(e) => onLabelChange(i, e)}
          ></input>
          <input
            className="column column-80"
            placeholder="8:00 9:00, 9:00 9:15"
            value={task.durations.join(",")}
            onChange={(e) => onDurationChange(i, e)}
          ></input>
        </div>
      ))}
      {tasks.length === 0 ? (
        <button
          css={css`
            margin-right: -0.85rem;
          `}
          className="button button-outline"
          onClick={() => actions.newTask()}
        >
          Tilføj
        </button>
      ) : null}
      {tasks.length > 0 ? (
        <button
          css={css`
            margin-right: -0.85rem;
          `}
          className="button button-outline"
          onClick={() => {
            if (confirm("Er du sikker?")) {
              actions.set([]);
            }
          }}
        >
          Slet alle
        </button>
      ) : null}
    </div>
  );
};
