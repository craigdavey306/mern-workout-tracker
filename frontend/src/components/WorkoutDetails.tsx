import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { Workout, WorkoutActionType } from '../models';
import { BACKEND_SERVER, WORKOUTS_API_ENDPOINT } from '../constants';

type WorkoutDetailsProp = {
  workout: Workout;
};

const WorkoutDetails: React.FC<WorkoutDetailsProp> = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `${BACKEND_SERVER}${WORKOUTS_API_ENDPOINT}/${workout._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: WorkoutActionType.DeleteWorkout, payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (lbs): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
