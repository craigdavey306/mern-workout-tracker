import { useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

import { WorkoutActionType } from '../models';
import { WORKOUTS_API_ENDPOINT, BACKEND_SERVER } from '../constants';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        `${BACKEND_SERVER}${WORKOUTS_API_ENDPOINT}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: WorkoutActionType.SetWorkouts, payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
