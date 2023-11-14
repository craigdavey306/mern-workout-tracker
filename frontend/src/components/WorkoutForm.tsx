import { useState } from 'react';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { WorkoutActionType } from '../models';

import { BACKEND_SERVER, WORKOUTS_API_ENDPOINT } from '../constants';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in.');
      return;
    }

    const workout = {
      title,
      load: +load,
      reps: +reps,
    };

    const response = await fetch(`${BACKEND_SERVER}${WORKOUTS_API_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      setError(null);
      setTitle('');
      setLoad('');
      setReps('');
      setEmptyFields([]);
      console.log('new workout added', json);
      dispatch({ type: WorkoutActionType.CreateWorkout, payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label htmlFor="title">Exercise Title:</label>
      <input
        type="text"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label htmlFor="load">Load (lbs):</label>
      <input
        type="number"
        min={0}
        id="load"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        min={0}
        id="reps"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
